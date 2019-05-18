const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/Sign-up/', userController.signUp)

module.exports = router
