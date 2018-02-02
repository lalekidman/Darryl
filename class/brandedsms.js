const db = require('./database')

class brandedSMS extends db {
  constructor () {
    this.brandedsms = require('../models/brandedsms')
  }
}