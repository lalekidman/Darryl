const app = require('express').Router()

app.get('/', (req, res) => {
  res.type('application/json')
  const d = req.query
})