const passport = require('passport')
const LocalStategy = require('passport-local').Strategy
// const mongoose = require('mongoose')
// const users = new (require('./users.js'))()
const admins = new (require('../class/admin'))()

passport.use('login', new LocalStategy((username, password, done) => {
  admins.login({
    username,
    password
  }).then((res) => {
    done(null, res)
  }).catch(err => {
    done(null, false, err.message)
  })
}))

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user)
})
passport.deserializeUser((user, done) => {
  console.log(user)
  done(null, user)
})

module.exports = passport
