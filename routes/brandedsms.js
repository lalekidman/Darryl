let app = require('express').Router()
let brandedsms = new (require('../class/brandedsms'))()

app.post('/', (req, res) => {
  res.type('application/json')
  const d = req.body
})
app.get('/', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    err: null
  }
})
app.put('/', (req, res) => {
  res.type('application/json')
  const d = req.body
  let result = {
    data: [],
    err: null
  }
})
app.delete('/', (req, res) => {
  res.type('application/json')
  const {id} = req.body
  let result = {
    data: [],
    err: null
  }
})
app.get('/:licenseId', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    err: null
  }
  const {licenseId} = req.params
  license.findOne(licenseId).then((data) => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch((err) => {
    result.err = err.message
    res.status(404).send(JSON.stringify(result, null, 2))
    res.end()
  })
})

module.exports = app
