const express = require('express')
const router = express.Router()
//model
const db = require('../models')
const User = db.User
const Todo = db.Todo
//auth middleware
const { authenticated } = require('./auth')

// 設定 /todos 路由
// 新增一筆 Todo 頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          id: req.params.id
        }
      })
    })
    .then(todo => { return res.render('detail', { todo: todo }) })
    .catch(error => { return res.status(422).json(error) })
})

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {
  Todo.create({
    name: req.body.newName,
    done: false,
    UserId: req.user.id
  })
    .then(todo => { return res.redirect('/') })
    .catch(error => { return res.status(422).json(error) })
})

// 修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          id: req.params.id
        }
      })
    })
    .then(todo => { return res.render('edit', { todo: todo }) })
    .catch(error => { return res.status(422).json(error) })
})

// 修改 Todo
router.put('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          id: req.params.id
        }
      })
    })
    .then(todo => {
      console.log(`forward ${todo.name}`)
      todo.name = req.body.editName
      todo.done = req.body.done
      console.log(`after ${todo.name}`)
      return todo.save()
    })
    .then(todo => { return res.redirect(`/todo/${req.params.id}`) })
    .catch(error => { return res.status(422).json(error) })
})

// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.destroy({
        where: {
          UserId: req.user.id,
          id: req.params.id
        }
      })
    })
    .then(todo => { return res.redirect(`/`) })
    .catch(error => { return res.status(422).json(error) })
})

module.exports = router