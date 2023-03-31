import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import * as uuid from 'uuid';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import authRoute from './routes/auth.js';
import authUser from './routes/user.js';
import authPost from './routes/posts.js';
import authCat from './routes/categories.js';

const childPython = spawn('Python', ['segmentation/main.py']);

childPython.stdout.on('data', (data) => {
  console.log(data);
});
childPython.on('close', (code) => {
  console.log(`ChildProccess exited with code ${code}`);
});
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));
mongoose
  .connect(process.env.MONGDODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDb'))
  .catch((err) => console.log(err));

let filename;
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'images');
  },
  filename: (_, file, cb) => {
    filename = `${uuid.v4()}.jpg`;
    cb(null, filename);
  },
});
const upload = multer({ storage });
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/images/${filename}`,
  });
});

app.use('/auth', authRoute);
app.use('/users', authUser);
app.use('/posts', authPost);
app.use('/category', authCat);

app.listen('4444', () => {
  console.log('Backend running...');
});
