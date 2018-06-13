const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const serverConfig = require('../config/server.config')
const db = {}

const sequelize = new Sequelize(
  serverConfig.db.database,
  serverConfig.db.user,
  serverConfig.db.password,
  serverConfig.db.options
)

fs.readdirSync(__dirname)
  .filter(file => (
    file !== 'index.js'
  ))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db