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
  brandedsms.lists(licenseId).then(data => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch(err => {
    result.error = err.message
    res.send(JSON.stringify(result, null, 2))
  })
})
app.get('/:id', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    error: null
  }
  const {licenseId} = req.query
  const {id} = req.params
  console.log('LICENSE: ', licenseId)
  console.log('id: ', id)
  brandedsms.findOne({
    licenseId,
    id
  }).then(data => {
    if (data.length) {
      result.data = data[0]
      res.send(JSON.stringify(result, null, 2))
    } else {
      throw new Error('No Data found.')
    }
  }).catch(err => {
    result.error = err.message
    res.send(JSON.stringify(result, null, 2))
  })
})

app.post('/credit', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    error: null
  }
  const data = req.body
  brandedsms.addCredit(data).then(reslt => {
    result.data = reslt
    res.send(JSON.stringify(result, null, 2))
  }).catch(err => {
    result.error = err.message
    res.send(JSON.stringify(result, null, 2))
  })
})
app.put('/credit', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    error: null
  }
  const data = req.body
  brandedsms.editCredit(data).then(reslt => {
    result.data = reslt
    res.send(JSON.stringify(result, null, 2))
  }).catch(err => {
    result.error = err.message
    res.send(JSON.stringify(result, null, 2))
  })
})
app.delete('/credit', (req, res) => {
  res.type('application/json')
  let result = {
    data: [],
    error: null
  }
  const data = req.body
  brandedsms.deleteCredit(data).then(reslt => {
    result.data = reslt
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

module.exports = app
