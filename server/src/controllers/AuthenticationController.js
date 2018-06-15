const { User } = require('../models')
const serverConfig = require('../config/server.config')
const providers = require('../config/providers')
const uuid = require('uuid/v4')
const authConfig = require('../config/auth.config')
const nodemailer = require('nodemailer')

let transportOptions

if (serverConfig.email.server && serverConfig.email.username && serverConfig.email.password) {
  transportOptions = {
    service: 'gmail',
    auth: {
      user: serverConfig.email.username,
      pass: serverConfig.email.password
    }
  }
}

async function sendSignInEmail ({email, url, req}) {
  nodemailer
    .createTransport(transportOptions)
    .sendMail({
      to: email,
      from: serverConfig.email.from,
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
}

module.exports = {
  async csrf (req, res) {
    return res.json({
      csrfToken: res.locals._csrf
    })
  },
  async getSession (req, res) {
    console.log(res)
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
    if (!req.user) return res.status(400).send({
      success: false,
      error: 'NO USER FOUND IN REQUEST'
    })

    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.json({ success: false, error: 'UNABLE TO FIND USER' })
  
      let linkedAccounts = {}
      providers.forEach(provider => {
        linkedAccounts[provider.providerName] = user[provider.providerName.toLowerCase()].id ? true : false
      })
  
      return res.json({
        success: true,
        linkedAccounts
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success: false,
        error: 'An error occurred while trying to fetch linked accounts'
      })
    }
  },
  async verifyEmailToken (req, res) {
    if (!req.params.token) {
      return res.redirect('http://localhost:3000/auth/error?action=signin&type=token-missing')
    }

    try {
      let user = await User.findOne({
        where: {
          emailToken: req.params.token
        }
      })

      
      let newUser
      if (user) {
        // Delete current token so it cannot be used again
        // Mark email as verified now we know they have access to it
        user.emailVerified = true
        newUser = await User.update({
          emailToken: null,
          emailVerified: true
        }, {
          where: {
            emailToken: req.params.token
          },
          returning: true
        })

        newUser = newUser[1][0]
      } else {
        throw new Error('Token not valid')
      }

      // If the user object is valid, sign the user in
      req.logIn(newUser, (err) => {
        if (err) return res.redirect('http://localhost:3000/auth/error?action=signin&type=token-invalid')
        if (req.xhr) {
          // If AJAX request (from client with JS), return JSON response
          return res.json({ success: true })
        } else {
          // If normal form POST (from client without JS) return redirect
          return res.redirect('http://localhost:3000/auth/callback?action=signin&service=email')
        }
      })
    } catch (err) {
      console.log(err)
      return res.redirect('http://localhost:3000/auth/error?action=signin&type=token-invalid')
    }
  },
  async registerUser (req, res) {
    const { email }  = req.body || null
    
    if (!email || email.trim() === '') {
      res.redirect('/auth')
    }

    const token = uuid()
    const url = ('http://localhost:5000' || `${req.protocol}://${req.headers.host}`) + `/auth/email/signin/${token}`

    // Create verification token save it to database
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      let newUser
      
      if (user !== null) {
        console.log('USER FOUND. UPDATING...')

        try {
          newUser = await User.update({
            emailToken: token
          }, {
            where: {
              email
            },
            returning: true
          })

          newUser = newUser[1][0] // Postgres returns an array of affected row count, then array of objects
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('USER NOT FOUND. CREATING...')
        try {
          newUser = await User.create({
            name: 'Generic User',
            password: 'Password1',
            email: email,
            emailToken: token
          })
        } catch (error) {
          console.log(error)
        }
      }

      try {
        sendSignInEmail({
          email: newUser.getDataValue('email'),
          url,
          req
        })
      } catch (error) {
        console.log(error)
      }

      if (req.xhr) {
        return res.json({ success: true })
      } else {
        return res.redirect(`/auth/check-email?email=${email}`)
      }
    } catch (err) {
      return res.redirect(`/auth/error?action=signin&type=email&email=${email}`)
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

      // If signIn() returns a user, sign in as them
      req.logIn(user, (err) => {
        if (err) return res.redirect('http://localhost:3000/auth/error?action=signin&type=credentials')
        if (req.xhr) {
          // If AJAX request (from client with JS), return JSON response
          return res.json({ success: true })
        } else {
          // If normal form POST (from client without JS) return redirect
          return res.redirect('http://localhost:3000/auth/callback?action=signin&service=credentials')
        }
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