const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
const Todo = db.Todo
const User = db.User
//route
app.get('/', (req, res) => {
  res.render('index')
})
//login page
app.get('/user/login', (req, res) => {
  res.render('login')
})
//login post
app.post('/user/login', (req, res) => {
  res.send('login post')
})
//register page
app.get('/user/register', (req, res) => {
  res.render('register')
})
//register post
app.post('/user/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect('/'))
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})