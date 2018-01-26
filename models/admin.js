module.exports = (function () {
  var mongoose = require('mongoose')
  var ObjectId = mongoose.Schema.Types.ObjectId
  var admin = new mongoose.Schema({
    username: {
      type: String,
      default: null
    },
    display_name: {
      type: String,
      default: null
    },
    password: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    date: {
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      }
    },
    deleted: {
      status: {
        type: Number,
        default: 0
      },
      ip: {
        type: String,
        default: null
      },
      date: {
        type: Date,
        default: null
      },
      user_id: {
        type: ObjectId,
        default: null
      }
    }
  })
  return mongoose.model('admins', admin)
})()
