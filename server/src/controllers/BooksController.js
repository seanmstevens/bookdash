const { Book } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let books = null
      const search = req.query.search

      if (search) {
        books = await Book.findAll({
          where: {
            $or: [
              'title', 'author', 'genre'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        books = await Book.findAll({
          order: [
            ['id', 'DESC']
          ],
          limit: 10
        })
      }
      res.send(books)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred while trying to fetch books.'
      })
    }
  }
}