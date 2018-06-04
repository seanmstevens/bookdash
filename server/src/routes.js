const AuthenticationController = require('./controllers/AuthenticationController')
const BooksController = require('./controllers/BooksController')
const AuthorsController = require('./controllers/AuthorsController')

module.exports = app => {
  app.post('/register',
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/books',
    BooksController.index)

  app.get('/authors',
    AuthorsController.index)
}