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
      package: 1,
      status: 1
    }).then(res => {
      const data = JSON.parse(JSON.stringify(res))
      const {status} = data
      const {demo = 0, disconnected = 0} = status
      return Object.assign(data, {demoStatus: demo, disconnectedStatus: disconnected})
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
        package: d.package,
        'status.demo': d.demoStatus,
        'status.disconnected': d.disconnectedStatus
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
  getMembers (id) {
    const self = this
    return new Promise(resolve => {
      resolve(self.license.aggregate([
        {
          $match: {
            _id: self.ObjectId(id)
          }
        },
        {
          $sort: {
            _id: 1
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
          $match: {
            'UF.deleted': 0
          }
        },
        {
          $sort: {
            'UF.deleted': 1
          }
        },
        {
          $group: {
            _id: {
              id: '$UF._id',
              name: '$UF.name',
              license: {
                id: '$_id',
                name: '$name',
                code: '$code'
              }
            }
          }
        }
      ]).then(res => {
        return res.map((el) => (el._id))
      }))
    })
  }
  saveMembers ({id, newMembers}) {
    const self = this
    return new Promise(resolve => {
      resolve(self.license.findOne({
        _id: self.ObjectId(id)
      }).then(res => {
        const {members} = res
        const newMemLen = newMembers.length
        const oldMemLen = members.length
        const currentMem = []
        for (let x = 0; x < newMemLen; x++) {
          let checker = false
          for (let y = 0; y < oldMemLen; y++) {
            if (newMembers[x].id.toString() === members[y].account_id.toString()) {
              currentMem.push({
                account_id: this.ObjectId(newMembers[x].id),
                sms_text: members[y].sms_text
              })
              checker = true
              break
            }
          }
          if (!checker) {
            currentMem.push({
              account_id: this.ObjectId(newMembers[x].id),
              sms_text: this.package[res.package]
            })
          }
        }
        res.members = currentMem
        return res.save()
      }))
    })
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
