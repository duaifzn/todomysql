const express = require('express')
const app = express()
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const port = 3000
const bodyParser = require('body-parser')
const passport = require('passport')
const methodOverride = require('method-override')
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
  res.locals.isAuthenticated = req.isAuthenticated
  next()
})
app.use(methodOverride('_method'))
const db = require('./models')
const Todo = db.Todo
const User = db.User
//route
app.use('/user', require('./routes/user'))
app.use('/todo', require('./routes/todo'))
app.use('/', require('./routes/home'))
app.use('/auth', require('./routes/fbauth'))
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})