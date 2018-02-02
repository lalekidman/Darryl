const db = require('./database')
class License extends db {
  constructor () {
    super()
    this.license = require('../models/license')
    this.rs = require('randomstring')
    this.package = {
      'A': 3000,
      'B': 2000,
      'C': 1000
    }
  }
  findOne (id) {
    let self = this
    return self.license.findOne({
      _id: self.ObjectId(id)
    }, {
      email: 1,
      name: 1,
      package: 1
    })
  }
  add (d) {
    return this.license.create({
      name: d.name,
      email: d.email,
      package: d.packageType,
      code: this.rs.generate()
    })
  }
  update (d) {
    return this.license.update({
      _id: this.ObjectId(d.id)
    }, {
      $set: {
        name: d.name,
        email: d.email,
        package: d.package
      }
    })
  }
  delete (id) {
    return this.license.update({
      _id: this.ObjectId(id)
    }, {
      $set: {
        deleted: 1
      }
    })
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
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$members'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'members.account_id',
          foreignField: '_id',
          as: 'UF'
        }
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$UF'
        }
      },
      {
        $group: {
          _id: {
            id: '$_id',
            name: '$name',
            code: '$code',
            email: '$email',
            package: '$package',
            status: '$status'
          },
          members: {
            $push: {
              account_id: '$members.account_id',
              sms_text: '$members.sms_text',
              name: '$UF.name',
              email: '$UF.email'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          id: `$_id.id`,
          name: '$_id.name',
          code: '$_id.code',
          email: '$_id.email',
          package: '$_id.package',
          status: '$_id.status',
          members: 1
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
    })
  }
}

module.exports = License
