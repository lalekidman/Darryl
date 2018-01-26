var bcrpyt = require('bcrypt')
var salts = bcrpyt.genSaltSync(9)
module.exports = {
  hash: function (password) {
    return bcrpyt.hashSync(password, salts)
  },
  compare: function (confirmPassword, password) {
    return bcrpyt.compareSync(confirmPassword, password)
  }
}
