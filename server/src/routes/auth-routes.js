const router = require('express').Router()
const providers = require('../config/providers')
const passport = require('passport')
const { User } = require('../models')
const AuthenticationController = require('../controllers/AuthenticationController')
const BooksController = require('../controllers/BooksController')
const AuthorsController = require('../controllers/AuthorsController')

// GET handlers
router.get('/csrf', AuthenticationController.csrf)

router.get('/session', AuthenticationController.getSession)

router.get('/linked', AuthenticationController.linkedAccounts)

router.get('/providers', AuthenticationController.providers)

router.get('/email/signin/:token', AuthenticationController.verifyEmailToken)

// POST handlers
router.post('/email/signin', AuthenticationController.registerUser)

router.post('/login', AuthenticationController.login)

router.post('/signout', AuthenticationController.signout)

// Provider OAuth handlers
providers.forEach(({
  providerName,
  providerOptions
}) => {
  const provider = providerName.toLowerCase()
  // Route to start sign in
  router.get(`/oauth/${provider}`, passport.authenticate(provider, providerOptions))

  router.get(`/oauth/${provider}/callback`,
    passport.authenticate(provider, {
      successRedirect: `http://localhost:3000/auth/callback?action=signin&service=${provider}`,
      failureRedirect: `http://localhost:3000/auth/error?action=signin&type=oauth&service=${provider}`
    })
  )

  router.post(`/oauth/${provider}/unlink`, async (req, res, next) => {
    if (!req.user) {
      return next(new Error('Not signed in'))
    }

    const id = await AuthenticationController.serialize(req.user)
    if (!id) throw new Error('Unable to serialize user')

    const user = await AuthenticationController.find({ id: id })
    if (!user) return next(new Error('Unable to look up account for current user'))

    if (user[provider]) {
      delete user[provider]
    }

    try {
      const newUser = await AuthenticationController.update(user, null, { delete: provider })
      return res.redirect(`/callback?action=unlink&service=${provider}`)
    } catch (err) {
      return next(err, false)
    }
  })
})

router.get('/oauth/:provider', (req, res) => {
  res.redirect('http://localhost:3000/auth/oauth/error?action=signin&type=unsupported')
})

module.exports = router