const mongo = require('mongoose')
var ObjectId = mongo.Schema.Types.ObjectId
var brandedSMS = new mongo.Schema({
  name: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  apiKey: {
    type: String,
    default: null
  },
  credits: {
    type: Number,
    default: 0
  },
  creditList: [
    {
      amount: {
        type: Number,
        default: 0
      },
      date: {
        type: Date,
        default: Date.now
      },
      deleted: {
        date: {
          type: Date,
          default: Date.now
        },
        status: {
          type: Number,
          default: 0
        }
      }
    }
  ],
  status: {
    type: String,
    default: 'PENDING'
  },
  enabled: {
    type: Boolean,
    default: true
  },
  deleted: {
    status: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    account_id: {
      type: ObjectId,
      default: null
    },
    ip: {
      type: String,
      default: null
    }
  },
  keys: {
    account_id: {
      type: ObjectId,
      default: null
    },
    license_id: {
      type: ObjectId,
      default: null
    }
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
  }
})
try {
  module.exports = mongo.model('branded_sms', brandedSMS)
} catch (e) {
  module.exports = mongo.model('branded_sms')
}
