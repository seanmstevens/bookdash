const router = require('express').Router()

const AuthenticationController = require('../controllers/AuthenticationController')
const BooksController = require('../controllers/BooksController')
const AuthorsController = require('../controllers/AuthorsController')

router.post(
  '/register',
  AuthenticationController.register
)

router.post(
  '/login',
  AuthenticationController.login
)

router.get('/csrf', AuthenticationController.csrf)

router.get('/session', AuthenticationController.getSession)

router.get('/linked', AuthenticationController.linkedAccounts)

router.get('/providers', AuthenticationController.providers)

router.post('/email/signin', AuthenticationController.emailSignin)

router.get('/email/signin/:token', AuthenticationController.verifyEmailToken)

router.post('/signout', AuthenticationController.signout)

module.exports = router