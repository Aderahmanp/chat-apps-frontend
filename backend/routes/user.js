const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const auth = require('../middleware/jwtAuth')

router.post('/sign-up/', userController.signUp)

router.post('/sign-in', userController.signIn)

module.exports = router
