import express from 'express'
const app = express()
import dotenv from 'dotenv'
import multer from 'multer'
import * as path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import authUser from './routes/user.js'
import authPost from './routes/posts.js'
import authCat from './routes/categories.js'
import * as uuid from 'uuid'
import Router from 'express'
const router = new Router()

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
