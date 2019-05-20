const express = require('express')
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')
const mongoose = require('mongoose')

try {
  dotEnv = require('dotenv').config()
} catch (err) {
  console.log(err.message)
}

// Initial PORT
const PORT = process.env.PORT || 1234
const mongoUrl = process.env.MONGGO_DB_URL

// Connecting Mongoose
mongoose.set('useCreateIndex', true)
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log(`Mongoose connected at ${mongoUrl}`)
  })
  .catch(err => {
    throw new Error(err)
  })

// Running Express Appication
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// initualization of plug'in Middleware, Routes
app.use('/', userRoutes)
app.use('/', chatRoutes)

// Listen server
app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`)
})

module.exports = app
