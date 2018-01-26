let app = require('express').Router()
let license = new (require('../class/license'))()
app.post('/create', (req, res) => {
  res.type('application/json')
  let d = req.body
  license.save(d).then((data) => {
    res.end()
  }).catch((err) => {
    console.log('FAILED')
  })
})
app.get('/', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    err: null
  }
  license.lists().then((data) => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch((err) => {
    res.status(404)
    res.end()
  })
})

module.exports = app
