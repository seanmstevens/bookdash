const { User } = require('../models')
const serverConfig = require('../config/server.config')
const providers = require('../config/providers')
const uuid = require('uuid/v4')
const authConfig = require('../config/auth.config')
const nodemailer = require('nodemailer')
const nodemailerSmtpTransport = require('nodemailer-smtp-transport')
const nodemailerDirectTransport = require('nodemailer-direct-transport')

let nodemailerTransport = nodemailerDirectTransport()

if (serverConfig.email.EMAIL_SERVER && serverConfig.email.EMAIL_USER && serverConfig.email.EMAIL_PASS) {
  nodemailerTransport = nodemailerSmtpTransport({
    host: serverConfig.email.EMAIL_SERVER,
    port: serverConfig.email.EMAIL_PORT || 25,
    secure: serverConfig.email.EMAIL_SECURE || true,
    auth: {
      user: serverConfig.email.EMAIL_USER,
      pass: serverConfig.email.EMAIL_PASS
    }
  })
}

module.exports = {
  async csrf (req, res) {
    return res.json({
      csrfToken: res.locals._csrf
    })
  },
  async getSession (req, res) {
    let session = {
      maxAge: authConfig.sessionMaxAge,
      revalidateAge: authConfig.sessionRevalidateAge,
      csrfToken: res.locals._csrf
    }

    // Add user object to session if logged in
    if (req.user) {
      // If logged in, export the API access token details to the client
      // Note: This token is valid for the duration of this session only.
      session.user = req.user
      if (req.session && req.session.api) {
        session.api = req.session.api
      }
    }

    return res.json(session)
  },
  async providers (req, res) {
    let configuredProviders = {}
    const serverUrl = `${serverConfig.host}:${serverConfig.port}`

    providers.forEach(provider => {
      configuredProviders[provider.providerName] = {
        signin: (serverUrl || '') + `/auth/oauth/${provider.providerName.toLowerCase()}`,
        callback: (serverUrl || '') + `/auth/oauth/${provider.providerName.toLowerCase()}/callback`
      }
    })

    return res.json(configuredProviders)
  },
  async linkedAccounts (req, res) {
    if (!req.user) return res.json({})

    serialize(req.user)
      .then(id => {
        return find({ id: id })
      })
      .then(user => {
        if (!user) return res.json({})
          
        let linkedAccounts = {}
        providers.forEach(provider => {
          linkedAccounts[provider.providerName] = (user[provider.providerName.toLowerCase()]) ? true : false
        })
        
        return res.json(linkedAccounts)
      })
      .catch(err => {
        return res.status(500).end()
      })
  },
  async insert (user, oAuthProfile) {
    try {
      const user = await User.create(user)
      return user
    } catch (err) {
      throw new Error('Unable to insert user:', err)
    }
  },
  async update (user, profile) {
    try {
      await User.update(user, {
        where: {
          id: user.id
        }
      })
      return user
    } catch (err) {
      throw new Error('Unable to update user:', err)
    }
  },
  async deserialize (id) {
    try {
      const user = await User.findOne({
        where: {
          id: id
        }
      })
  
      if (user) {
        return resolve({
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          admin: user.admin || false
        })
      }

      return null
    } catch (err) {
      throw new Error('Unable to deserialize user:', err)
    }
  },
  async find ({id, email, emailToken, provider} = {}) {
    try {
      let query = {}
  
      // Find needs to support looking up a user by ID, Email, Email Token,
      // and Provider Name + Users ID for that Provider
      if (id) {
        query = { id: id }
      } else if (email) {
        query = { email: email }
      } else if (emailToken) {
        query = { emailToken: emailToken }
      } else if (provider) {
        query = { [`${provider.name}.id`]: provider.id }
      }
  
      await User.findOne({ where: query })
      
      if (user) {
        return user.toJSON()
      }
    } catch (err) {
      throw new Error(err)
    }
  },
  async sendSignInEmail ({email, url, req}) {
    nodemailer
      .createTransport(nodemailerTransport)
      .sendMail({
        to: email,
        from: serverConfig.email.EMAIL_FROM,
        subject: 'Verify your email',
        text: `Use the link below to sign in:\n\n${url}\n\n`,
        html: `<p>Use the link below to sign in:</p><p>${url}</p>`
      }, (err) => {
        if (err) {
          console.error('Error sending email to ' + email, err)
        }
      })

      if (process.env.NODE_ENV === 'development')  {
        console.log('Generated sign in link ' + url + ' for ' + email)
      }
  },
  async verifyEmailToken (req, res) {
    if (!req.params.token) {
      return res.redirect('/auth/error?action=signin&type=token-missing')
    }

    try {
      const user = await find({ emailToken: req.params.token })
      let newUser
      if (user) {
        // Delete current token so it cannot be used again
        delete user.emailToken
        // Mark email as verified now we know they have access to it
        user.emailVerified = true
        newUser = await update(user, null, { delete: 'emailToken' })
      } else {
        throw new Error('Token not valid')
      }

      // If the user object is valid, sign the user in
      req.logIn(newUser, (err) => {
        if (err) return res.redirect('/auth/error?action=signin&type=token-invalid')
        if (req.xhr) {
          // If AJAX request (from client with JS), return JSON response
          return res.json({ success: true })
        } else {
          // If normal form POST (from client without JS) return redirect
          return res.redirect('/auth/callback?action=signin&service=email')
        }
      })     
    } catch (err) {
      return res.redirect('/auth/error?action=signin&type=token-invalid')
    }
  },
  async emailSignin (req, res) {
    const email = req.body.email || null
    
    if (!email || email.trim() === '') {
      res.redirect('/auth')
    }

    const token = uuid()
    const url = ('http://localhost:5000' || `${req.protocol}://${req.headers.host}`) + `/auth/email/signin/${token}`

    // Create verification token save it to database
    try {
      const user = await find({ email: email })
      let newUser
      if (user) {
        user.emailToken = token
        newUser = await update(user)
      } else {
        newUser = await insert({
          email,
          emailToken
        })
      }

      sendSignInEmail({
        email: newUser.email,
        url,
        req
      })

      if (req.xhr) {
        return res.json({ success: true })
      } else {
        return res.redirect(`/auth/check-email?email=${email}`)
      }
    } catch (err) {
      return res.redirect(`/auth/error?action=signin&type=email&email=${email}`)
    }
  },
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)

      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to login.'
      })
    }
  },
  async signout (req, res) {
    // Log user out with Passport and remove their Express session
    req.logout()
    req.session.destroy(() => {
      return res.redirect('/auth/callback?action=signout')
    })
  }
}