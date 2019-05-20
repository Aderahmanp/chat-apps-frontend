const jwt = require('jsonwebtoken')

exports.isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      // if there is error
      if (err) {
        res.status(403).json({
          success: false,
          message: err
        })
        // there is no error
      } else {
        res.locals.decoded = decoded
        next()
      }
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'No token provided'
    })
  }
}
