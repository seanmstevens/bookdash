const AuthenticationController = require('./controllers/AuthenticationController')
const BooksController = require('./controllers/BooksController')

module.exports = app => {
  app.post('/register',
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/books',
    BooksController.index)
}