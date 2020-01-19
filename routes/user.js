const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User


//login page
router.get('/login', (req, res) => {
  res.render('login')
})
//login post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))
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

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          console.log(hash)
          newUser.password = hash
          newUser.save()
            .then(user => {
              res.redirect('/')
            }).catch(err => {
              console.log(err)
            })

        })
      })


    }
  })


})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})
module.exports = router