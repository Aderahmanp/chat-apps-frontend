const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat')
const auth = require('../middleware/jwtAuth')

router.post('/message/:id', auth.isAuthenticated, chatController.sendMessage)

module.exports = router
