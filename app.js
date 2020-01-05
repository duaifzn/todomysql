const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))
// 使用 Passport - 要在「使用路由器」前面
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})
const db = require('./models')
const Todo = db.Todo
const User = db.User
//route
app.use('/user', require('./routes/user'))
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})