const User = require('../models/user')
const Chat = require('../models/chat')

exports.sendMessage = (req, res) => {
  User.findById(req.params.id).then(data => {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'user not found'
      })
    } else {
      let massage = Object.assign(req.body)
      console.log(req.body)
      return Chat.create({
        message: req.body.message,
        from: res.locals.decoded.id,
        to: req.params.id
      })
        .then(message => {
          User.findByIdAndUpdate(res.locals.decoded.id, {
            $push: { to: message._id }
          })
            .exec()
            .then(() => {
              User.findByIdAndUpdate(req.params.id, {
                $push: { from: message._id }
              })
                .exec()
                .then(data =>
                  res.status(206).json({
                    success: true,
                    message: 'succes',
                    data: message
                  })
                )
            })
        })
        .catch(err =>
          res.status(400).json({
            success: false,
            message: err.message
          })
        )
    }
  })
}

exports.getMesessage = (req, res) => {
  Chat.find({
    from: { $in: [res.locals.decoded.id, req.params.id] },
    to: { $in: [req.params.id, res.locals.decoded.id] }
  })
    .exec()
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'succes',
        data: data
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      })
    })
}

exports.member = (req, res) => {
  User.find({})
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'succes',
        data: data
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      })
    })
}
