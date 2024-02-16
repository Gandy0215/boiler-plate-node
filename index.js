const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
var db_config = require('./conf/mongo-config.json')
mongoose.connect(db_config.MONGO_URI)
.then(() => console.log('Mongodb Connected....'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

