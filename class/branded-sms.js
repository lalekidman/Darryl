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
  addCredit ({id, credit}) {
    return new Promise(resolve => {
      resolve(this.brandedsms.findOne({
        _id: this.ObjectId(id)
      }).then(res => {
        if (res) {
          const {creditList = []} = res
          creditList.push({
            date: (new Date()).toISOString(),
            amount: credit || 0
          })
          res.creditList = creditList
          return res.save()
        }
      }).then(res => {
        const {creditList = []} = res
        res.creditList = creditList.filter(el => (el.deleted.status === 0))
        return res
      }))
    })
  }
  editCredit ({id, creditId, amount}) {
    return new Promise(resolve => {
      resolve(this.brandedsms.findOne({
        _id: this.ObjectId(id)
      }).then(res => {
        if (res) {
          const {creditList = []} = res
          const ind = creditList.findIndex(el => (el._id.toString() === creditId.toString()))
          if (ind !== -1) {
            Object.assign(creditList[ind], {
              date: new Date(),
              amount: amount || 0
            })
            res.creditList = creditList
          }
          return res.save()
        }
      }).then(res => {
        const {creditList = []} = res
        res.creditList = creditList.filter(el => (el.deleted.status === 0))
        return res
      }))
    })
  }
  deleteCredit ({id, creditId}) {
    return new Promise(resolve => {
      resolve(this.brandedsms.findOne({
        _id: this.ObjectId(id)
      }).then(res => {
        if (res) {
          const {creditList = []} = res
          const ind = creditList.findIndex(el => (el._id.toString() === creditId.toString()))
          if (ind !== -1) {
            Object.assign(creditList[ind].deleted, {
              date: new Date(),
              status: 1
            })
            res.creditList = creditList
          }
          return res.save()
        }
      }).then(res => {
        const {creditList = []} = res
        res.creditList = creditList.filter(el => (el.deleted.status === 0))
        return res
      }))
    })
  }
  findOne ({licenseId, id}) {
    return new Promise(resolve => {
      resolve(this.brandedsms.aggregate([
        {
          $match: {
            'keys.license_id': this.ObjectId(licenseId)
          }
        },
        {
          $sort: {
            'keys.license_id': 1
          }
        },
        {
          $match: {
            _id: this.ObjectId(id),
            'deleted.status': 0
          }
        },
        {
          $sort: {
            _id: 1,
            'deleted.status': 1
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            name: 1,
            credits: 1,
            creditList: {
              $filter: {
                input: '$creditList',
                as: 'f',
                cond: {
                  $eq: ['$$f.deleted.status', 0]
                }
              }
            }
          }
        }
      ]))
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
