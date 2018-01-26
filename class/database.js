class database {
  constructor () {
    this.mongoose = require('mongoose')
    this.ObjectId = this.mongoose.Types.ObjectId
  }
  get objectId () {
    return this.ObjectId
  }
}
module.exports = database
