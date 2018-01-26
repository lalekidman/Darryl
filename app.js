let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let http = require('http').Server(app)
let path = require('path')
let cookierParser = require('cookie-parser')
let express_sess = require('express-session')
let flash = require('connect-flash')
let port = process.env.PORT || 1430
let mongoose = require('mongoose')
let passport = require('passport')
let cors = require('cors')

let mongoStore = require('connect-mongo')(express_sess)
let uri = 'mongodb://localhost/serpentsmsapp'
//override the promise of mongoose
mongoose.Promise = global.Promise
//connect to database

mongoose.connect(uri, {
  useMongoClient: true
}).then((res) => {
  console.log('Successfully connected to database.')
}).catch((err) => {
  console.log('Failed to connect to the database. Error: ', err)
})

//  view engine
app.set('view engine', 'ejs')

//  express session
app.use(express_sess({
  name: 'access_token',
  secret: 'THISISSECRETPLEASEDONOTATTEMPTTOOPENTHISSHITTHANKYOUVERYMUCH',
  saveUninitialized: true,
  resave: true,
  cookie: {
    expires: (((1000 * 60) * 60) * 24)
  }
}))

//  cors middle ware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })
app.use(cors())
//  body parser middle ware
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookierParser())

// public folder/view folder
// app.set('views',path.join(__dirname,'views/dist'))
// app.use(express.static(path.join(__dirname, 'views/dist')))

//  connect flash.
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})
app.use('/api/users', require('./routes/users'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/license', require('./routes/license'))
// app.use(require('./routes/home'))

http.listen(port, () => {
  console.log('ready on PORT: %s ', port)
})
