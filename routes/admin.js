const app = require('express').Router()
const admins = new (require('../class/admin'))()
const passport = require('../class/passport')

app.post('/', (req, res) => {
  res.type('application/json')
  res.sendStatus(404)
  // return false
  // const d = req.body
  // const result = {
  //   err: null,
  //   data: null
  // }
  // if (!d) {
  //   result.err = 'username and password parameters are required. Please try again'
  //   res.send(result)
  // } else if (!d.username) {
  //   result.err = 'username parameter is required. Please try again'
  //   res.send(result)
  // } else if (!d.password) {
  //   result.err = 'password parameter is required. Please try again'
  //   res.send(result)
  // } else {
  //   admins.create(d).then(data => {
  //     result.data = data
  //     res.send(result)
  //   }).catch(err => {
  //     result.err = err.message
  //     res.send(result)
  //   })
  // }
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/api/admin/login_failed'}), (req, res) => {
  res.type('application/json')
  res.jsonp({authenticated: req.isAuthenticated(), users: req.user})
  res.end()
})
app.get('/login_failed', (req, res) => {
  res.jsonp({authenticated: false, err_msg: 'Invalid Credentials'})
  // res.jsonp({authenticated: false, err_msg: req.flash('error')[0]})
  res.end()
})
app.get('/verify', (req, res) => {
  res.type('application/json')
  let data = {
    authenticated: req.isAuthenticated(),
    users: req.user
  }
  res.send(data)
  res.end()
})

module.exports = app
