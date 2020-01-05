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
app.use('/user', require('./routes/user'))
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})