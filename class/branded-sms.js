const db = require('./database')

class brandedSMS extends db {
  constructor () {
    super()
    this.brandedsms = require('../models/branded-sms')
  }
  changeStatus (data) {
    return new Promise((resolve) => {
      resolve(this.brandedsms.update({
        _id: this.ObjectId(data.id)
      }, {
        $set: {
          status: data.status,
          'date.updated': (new Date()).toISOString()
        }
      }))
    })
  }
  lists (licenseId) {
    return new Promise((resolve, reject) => {
      resolve(this.brandedsms.aggregate([
        {
          $match: {
            'keys.license_id': this.ObjectId(licenseId),
            'deleted.status': 0
          }
        },
        {
          $sort: {
            'keys.license_id': 1,
            'deleted.status': 1
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            name: 1,
            description: 1,
            apiKey: 1,
            credits: 1,
            creditList: 1,
            status: 1,
            enabled: 1
          }
        }
      ]))
    })
  }
}

module.exports = brandedSMS
