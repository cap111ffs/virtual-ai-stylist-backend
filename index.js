const express = require('express')
const app = express()
const dotenv = require('dotenv')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const authUser = require('./routes/user')
const authPost = require('./routes/posts')
const authCat = require('./routes/categories')
const uuid = require('uuid')
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/images', express.static('images'))
mongoose
  .connect(process.env.MONGDODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDb'))
  .catch((err) => console.log(err))

let filename
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'images')
  },
  filename: (_, file, cb) => {
    filename = uuid.v4() + '.jpg'
    cb(null, filename)
  },
})
const upload = multer({ storage })
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/images/${filename}`,
  })
})

app.use('/auth', authRoute)
app.use('/users', authUser)
app.use('/posts', authPost)
app.use('/category', authCat)

app.listen('4444', () => {
  console.log('Backend running...')
})
