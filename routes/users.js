let app = require('express').Router()
let user = new (require('../class/users'))()
app.post('/', (req, res) => {
  res.type('application/json')
  let d = req.body
  user.save(d).then((data) => {
    if (!data) {
      console.log('Create user without license/company')
      res.send(JSON.stringify({
        err: null,
        result: 'successfully create user without license/company'
      }))
    } else {
      res.send(JSON.stringify({
        err: null,
        result: 'successfully create user'
      }))
    }
  }).catch((err) => {
    console.log('FAILED', err)
  })
})
app.get('/', (req, res) => {
  res.type('application/json')
  console.log('Ping here')
  let result = {
    data: [],
    err: null
  }
  user.lists().then((data) => {
    result.data = data
    return true
  }).catch((err) => {
    result.err = err.message
    return true
  }).then(() => {
    res.send(JSON.stringify(result, null, 2))
  })
})
app.put('/', (req, res) => {
  res.type('application/json')
  let userData = req.body
  let result = {
    data: [],
    err: null
  }
  console.log('USER DATA', userData)
  user.update(userData).then((data) => {
    if (data) {
      console.log('User update even the company.')
    } else {
      console.log('User update but company not included.')
    }
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch((err) => {
    res.status(404)
    res.end()
  })
})
app.delete('/', (req, res) => {
  res.type('application/json')
  let userData = req.body
  let result = {
    data: [],
    err: null
  }
  console.log('DELETE:SDD: ', userData)
  user.deletes(userData).then((data) => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch((err) => {
    res.status(404)
    res.end()
  })
})
app.put('/set-active-status', (req, res) => {
  res.type('application/json')
  let userData = req.body
  let result = {
    data: [],
    err: null
  }
  console.log('submitted data: ', userData)
  user.setActiveStatus(userData).then((data) => {
    result.data = data
    res.send(JSON.stringify(result, null, 2))
  }).catch((err) => {
    res.status(404)
    res.end()
  })
})
app.get('/without-license', (req, res) => {
  res.type('application/json')
  let result = {
    data: {},
    err: null
  }
  user.withOutLicense().then((data) => {
    result.data = data
    return true
  }).catch((err) => {
    result.err = err.message
    return true
  }).then(() => {
    res.send(JSON.stringify(result, null, 2))
  })
})

app.get('/:accountId', (req, res) => {
  res.type('application/json')
  const {accountId} = req.params
  const {licenseId} = req.query
  let result = {
    data: {},
    err: null
  }
  user.findOne({licenseId, accountId}).then((data) => {
    result.data = data
    return true
  }).catch((err) => {
    result.err = err.message
    return true
  }).then(() => {
    res.send(JSON.stringify(result, null, 2))
  })
})

module.exports = app
