const express = require('express')
const router = express.Router()
const { authenticated } = require('./auth')
//models
const db = require('../models')
const User = db.User
const Todo = db.Todo
//router
router.get('/', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (user) {
        return Todo.findAll({
          where: { UserId: req.user.id }
        })
      }
      else {
        throw new Error('user not found')
      }
    }).then(todos => {
      return res.render('index', { todos: todos })
    }).catch(error => {
      return res.status(422).json(error)
    })

})

module.exports = router