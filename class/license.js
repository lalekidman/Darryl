const db = require('./database')
class License extends db {
  constructor () {
    super()
    this.license = require('../models/license')
    this.package = {
      'A': 3000,
      'B': 2000,
      'C': 1000
    }
  }
  lists () {
    return this.license.aggregate([
      {
        $match: {
          deleted: 0
        }
      },
      {
        $sort: {
          _id: 1,
          deleted: 1
        }
      },
      {
        $project: {
          _id: 0,
          id: `$_id`,
          name: 1,
          code: 1,
          email: 1,
          members: 1,
          package: 1,
          status: 1
        }
      }
    ])
  }
  checkAccountId ({account_id, license_id}) {
    let self = this
    return self.license.findOne({
      _id: license_id
    }).then(res => {
      if (res) {
        let ind = res.members.findIndex(el => { return (el.account_id === account_id) })
        if (ind === -1) {
          res.members.push({
            sms_text: self.package[res.package],
            account_id
          })
          return res.save()
        }
      }
      return false
    }).catch(err => {
      console.log('ERROR: ', err)
    })
  }
}

module.exports = License
