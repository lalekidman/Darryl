let app = require('express').Router()
let license = new (require('../class/license'))()

app.post('/', (req, res) => {
  res.type('application/json')
  const d = req.body
  console.log('DATA: ', d)
  license.add(d).then((data) => {
    res.send(JSON.stringify({
      err: null,
      data
    }, null, 2))
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
app.put('/', (req, res) => {
  res.type('application/json')
  const d = req.body
  let result = {
    data: [],
    err: null
  }
  license.update(d).then((data) => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch((err) => {
    res.status(404)
    res.end()
  })
})
app.delete('/', (req, res) => {
  res.type('application/json')
  const {id} = req.body
  let result = {
    data: [],
    err: null
  }
  if (!id) {
    res.sendStatus(404).send({
      err: 'id parameter is required. Please try again',
      data: null
    })
  } else {
    license.delete(id).then((data) => {
      result.data = data
      res.send(JSON.stringify(result, null, 2))
    }).catch((err) => {
      res.status(404)
      res.end()
    })
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
