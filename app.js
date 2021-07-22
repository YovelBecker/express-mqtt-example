const express = require('express')
const app = express()

require('./mqtt.service');
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)
