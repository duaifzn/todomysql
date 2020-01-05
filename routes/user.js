const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User


//login page
router.get('/login', (req, res) => {
  res.render('login')
})
//login post
router.post('/login', (req, res) => {
  res.send('login post')
})
//register page
router.get('/register', (req, res) => {
  res.render('register')
})
//register post
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {
        name: name,
        email: email,
        password: password,
        password2: password2
      })
    }
    else {
      let newUser = new User({
        name,
        email,
        password
      })
      newUser
        .save()
        .then(user => {
          res.redirect('/')
        }).catch(err => {
          console.log(err)
        })

    }
  })


})

module.exports = router