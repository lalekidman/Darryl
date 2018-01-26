'use strict'
const db = require('./database')
class admins extends db {
  constructor () {
    super()
    this.crypts = require('./bcrypt')
    this.admins = require('../models/admin')
    console.log('Admin contructor')
  }
  login (cred) {
    const self = this
    return self.admins.findOne({
      $or: [
        {
          username: cred.username
        }
      ]
    }).then((res) => {
      if (res) {
        if (self.crypts.compare(cred.password, res.password)) {
          return {
            id: res._id,
            display_name: res.display_name,
            username: res.username,
            email: res.email
          }
        } else {
          throw new Error('Incorrect password')
        }
      } else {
        throw new Error('Incorrect username')
      }
    })
  }
  create (d) {
    const self = this
    console.log('WTAHATSADAS : ', d)
    return self.admins.create({
      username: d.username,
      password: self.crypts.hash(d.password)
    })
  }
}

module.exports = admins
