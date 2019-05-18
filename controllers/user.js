const User = require('../models/user')
const Chat = require('../models/chat')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

exports.signUp = function (req, res) {
  let user = Object.assign(req.body)
  let password = bcrypt.hashSync(user.password, saltRounds)
  const newuser = { ...user, password }
  return User.create(newuser)
    .then(data =>
      res.status(201).json({
        success: true,
        message: 'Successful',
        data: data
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err.message
      })
    )
}
