const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-Parser')
const { User } = require('./models/User')

//application/x-www-form-urlencoded 파싱을 위해 사용
app.use(bodyParser.urlencoded({extended: true}))

// application/json 파싱을 위해 사용
app.use(bodyParser.json())

const mongoose = require('mongoose')
var db_config = require('./conf/mongo-config.json')
mongoose.connect(db_config.MONGO_URI)
.then(() => console.log('Mongodb Connected....'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
    const user = new User(req.body)

    // 과거버전 문법
    // user.save((err, doc) => {
    //     if(err) return res.json({ success: false, err})
    //     return res.status(200).json({
    //         success: true
    //     })
    // })

    user.save()
    .then(saveUSer => {
        return res.status(200).json({
            success: true
        })
    })
    .catch( err => {
        return res.json({ success: false, err})
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

