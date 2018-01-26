const mongo = require('mongoose')
var ObjectId = mongo.Schema.Types.ObjectId
var license = new mongo.Schema({
  id: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    index: true
  },
  code: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  credits: {
    brandedSms: {
      type: Number,
      default: 0
    }
  },
  package: {
    type: String,
    default: null
  },
  members: [{
    account_id: {
      type: ObjectId,
      default: null
    },
    sms_text: {
      type: Number,
      default: 500
    }
  }],
  deleted: {
    type: Number,
    default: 0
  },
  status: {
    disconnected: {
      type: Number,
      default: 0
    },
    demo: {
      type: Number,
      default: 0
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})
try {
  module.exports = mongo.model('license', license)
} catch (e) {
  module.exports = mongo.model('license')
}
