const express = require('express')
const router = express.Router()
const { authenticated } = require('./auth')

router.get('/', authenticated, (req, res) => {
  res.render('index')
})

module.exports = router