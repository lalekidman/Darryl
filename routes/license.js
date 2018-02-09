let app = require('express').Router()
let license = new (require('../class/license'))()

app.post('/', (req, res) => {
  res.type('application/json')
  const d = req.body
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
  console.log('updated submit data: ', d)
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
    return true
  }).catch((err) => {
    result.err = err.message
    return true
  }).then(() => {
    res.send(JSON.stringify(result, null, 2))
  })
})

app.get('/:licenseId/members', (req, res) => {
  res.type('application/json')
  const {licenseId} = req.params
  let result = {
    error: null,
    data: []
  }
  license.getMembers(licenseId).then(data => {
    result.data = data
    return result
  }).catch(err => {
    result.error = err.message
    return result
  }).then(data => {
    res.send(JSON.stringify(result, null, 2))
  })
})
app.put('/:licenseId/members', (req, res) => {
  res.type('application/json')
  const {licenseId} = req.params
  const {members} = req.body
  let result = {
    error: null,
    data: []
  }
  license.saveMembers({id: licenseId, newMembers: members}).then(data => {
    result.data = data
    return result
  }).catch(err => {
    result.error = err.message
    return result
  }).then(data => {
    res.send(JSON.stringify(result, null, 2))
  })
})
module.exports = app
