const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const expressSession = require('express-session')
const lusca = require('lusca')
const uuid = require('uuid/v4')

const { sequelize } = require('./models')
const serverConfig = require('./config/server.config')
const authConfig = require('./config/auth.config')
const authRoutes = require('./routes/auth-routes')

// Initialize app
const app = express()

// Initialize middlewares
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(compression())
app.use(expressSession({
  secret: authConfig.sessionSecret,
  store: authConfig.sessionStore,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: 'auto',
    maxAge: authConfig.sessionMaxAge
  }
}))
app.use(lusca.csrf())

// Add router and passport
require('./config/passport')
app.use('/auth', authRoutes)

// Sync database to server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(serverConfig.port)
    console.log(`Server started on port ${serverConfig.port}`)
  })
  .catch((err) => {
    console.log('An unexpected error occurred. Unable to spin up server.')
    console.log(err)
  })