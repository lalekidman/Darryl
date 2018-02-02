let app = require('express').Router()
let brandedsms = new (require('../class/branded-sms'))()

app.post('/', (req, res) => {
  res.type('application/json')
  const d = req.body
})
app.get('/', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    error: null
  }
  const {licenseId} = req.query
  console.log('LICENSE: ', licenseId)
  brandedsms.lists(licenseId).then(data => {
    console.log('DATA: ', licenseId)
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch(err => {
    result.error = err.message
    res.send(JSON.stringify(result, null, 2))
  })
})
app.put('/changeStatus', (req, res) => {
  res.type('application/json')
  const {id, status} = req.body
  let result = {
    data: [],
    error: null
  }
  brandedsms.changeStatus({
    id, status
  }).then(data => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch(err => {
    result.error = err.message
    res.send(JSON.stringify(result, null, 2))
    console.log('ERRORZ: ', err.message)
  })
})
app.delete('/', (req, res) => {
  res.type('application/json')
  const {id} = req.body
  let result = {
    data: [],
    err: null
  }
})
app.get('/:brandedsmsId', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    err: null
  }

})

module.exports = app
