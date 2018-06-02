const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const hashPassword = (user, options) => {
  const SALT_FACTOR = 10

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}