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

exports.signIn = (req, res) => {
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }]
  })
    .exec()
    .then(function (userInfo) {
      if (!userInfo) {
        return res.status(400).json({
          success: false,
          message: 'username or password in incorrect'
        })
      }
      const valid = bcrypt.compareSync(req.body.password, userInfo.password)
      if (valid) {
        const payload = {
          id: userInfo.id,
          email: userInfo.email,
          username: userInfo.username
        }
        var token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: 86400
        })
        return res.status(200).json({
          success: true,
          message: 'Signed-in successfully',
          data: {
            token: token,
            name: userInfo.name
          }
        })
      } else {
        res.status(403).json({
          success: false,
          message: 'username or passsword in incorrect'
        })
      }
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    })
}
