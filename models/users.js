module.exports = (() => {
  var mongo = require('mongoose')
  var userSchema = new mongo.Schema({
    name: {
      type: String,
      default: null
    },
    username: {
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
    roles: [String],
    status: {
      account: {
        type: Number,
        default: 0
      },
      port: {
        type: Number,
        default: 0
      },
      report: {
        type: Number,
        default: 0
      },
      online: {
        type: Number,
        default: 0
      },
      promotion: {
        type: Number,
        default: 0
      },
      busylight: {
        type: Boolean,
        default: false
      },
      actives: {
        type: Number,
        default: 1
      }
    },
    signature: {
      mode: {
        type: Number,
        default: 0
      },
      text: {
        type: String,
        default: null
      }
    },
    notification: {
      sound: {
        url: {
          type: String,
          default: `../wav-sounds/one.wav`
        },
        status: {
          type: Number,
          default: 1
        }
      },
      browser: {
        status: {
          type: Number,
          default: 1
        }
      }
    },
    api: {
      token: {
        text: {
          type: String,
          default: null
        },
        status: {
          type: Number,
          default: 0
        }
      }
    },
    deleted: {
      type: Number,
      default: 0
    },
    ip: {
      type: String,
      default: null
    },
    picture: {
      type: String,
      default: null
    }
  })
  try {
    return mongo.model('users', userSchema)
  } catch (e) {
    return mongo.model('users')
  }
})()
