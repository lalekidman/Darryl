const db = require('./database')
class Users extends db {
  constructor () {
    super()
    const self = this
    console.log('READY ON USER CLASS')
    self.user = require('../models/users')
    self.license = require('../models/license')
    self.l = new (require('./license'))()
    self.bcrypt = require('./bcrypt')
    self.async = require('async')
  }
  save (d) {
    let self = this
    return self.user.create({
      name: d.name,
      username: d.username,
      password: self.bcrypt.hash(d.password),
      email: d.email,
      roles: [d.roles]
    }).then(res => {
      if (d.license_id) {
        return self.l.checkAccountId({
          account_id: res._id,
          license_id: d.license_id
        })
      }
      return false
    }).then(res => {
      return res
    })
  }
  findOne ({licenseId, accountId}) {
    let self = this
    let data = {}
    return self.user.findOne({
      _id: accountId
    }, {
      _id: 1,
      name: 1,
      username: 1,
      email: 1,
      roles: 1
    }).then(res => {
      let userData = JSON.parse(JSON.stringify(res))
      data.user = Object.assign(userData, {roles: userData.roles[0]})
      return self.license.findOne({
        _id: licenseId
      }, {
        name: 1
      })
    }).then(res => {
      data.license = res
      return data
    })
  }
  update (userData) {
    let self = this
    return self.user.update({
      _id: self.ObjectId(userData.id)
    }, {
      $set: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        roles: [userData.roles]
      }
    }).then(res => {
      if ((userData.license_id.toString() !== userData.oldLicenseId.toString())) {
        return self.license.findOne({
          _id: self.ObjectId(userData.oldLicenseId)
        }).then(res => {
          res.members.forEach((el, ind) => {
            if (el.account_id.toString() === userData.id.toString()) {
              res.members.splice(ind, 1)
            }
          })
          return res.save()
        }).then(res => {
          return self.l.checkAccountId({
            account_id: userData.id,
            license_id: userData.license_id
          })
        })
      }
      return false
    })
  }
  deletes ({accountId}) {
    const self = this
    return self.user.update({
      _id: self.ObjectId(accountId)
    }, {
      $set: {
        deleted: 1
      }
    })
  }
  setActiveStatus ({active, accountId}) {
    const self = this
    console.log('STATUSS: ', active)
    console.log('STATUSS: ', active ? 0 : 1)
    return self.user.update({
      _id: self.ObjectId(accountId)
    }, {
      $set: {
        'status.actives': active ? 0 : 1
      }
    })
  }
  lists () {
    let self = this
    let userData = {}
    return self.license.aggregate([
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
          preserveNullAndEmptyArrays: false,
          path: '$UF'
        }
      },
      {
        $group: {
          _id: {
            id: '$UF._id',
            name: '$UF.name',
            username: '$UF.username',
            email: '$UF.email',
            status: '$UF.status',
            roles: '$UF.roles',
            deleted: '$UF.deleted'
          },
          license: {
            $first: {
              id: '$_id',
              name: '$name'
            }
          }
        }
      },
      {
        $project: {
          id: '$_id.id',
          name: '$_id.name',
          username: '$_id.username',
          email: '$_id.email',
          status: '$_id.status',
          roles: '$_id.roles',
          deleted: '$_id.deleted',
          license: 1,
          _id: 0
        }
      }
    ]).then((data) => {
      userData = data
      let accountIds = data.map((user) => {
        return user.id
      })
      return self.user.aggregate([
        {
          $match: {
            _id: {
              $nin: accountIds
            },
            deleted: 0
          }
        },
        {
          $project: {
            id: '$_id',
            name: 1,
            username: 1,
            email: 1,
            status: 1,
            roles: 1,
            deleted: 1,
            _id: 0
          }
        }
      ])
    }).then((data) => {
      return userData.concat(data)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = Users
