import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import * as uuid from 'uuid';
import dotenv from 'dotenv';
import axios from 'axios';
import authRoute from './routes/auth.js';
import authUser from './routes/user.js';
import authPost from './routes/posts.js';
import authCat from './routes/categories.js';
import authCard from './routes/card.js';
import authCards from './routes/cards.js';

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
  filename: (req, file, cb) => {
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

app.post('/upload-look', async (req, res) => {
  const AIPicture = await axios
    .post('https://{ipAddresAI}:5000/{route}', req.body.httpLink)
    .then((response) => response)
    .catch((error) => `AI error ${error}`);

  res.json({
    image: AIPicture,
  });
});

app.use('/auth', authRoute);
app.use('/users', authUser);
app.use('/posts', authPost);
app.use('/category', authCat);
app.use('/card', authCard);
app.use('/cards', authCards);

app.listen('3333', () => {
  console.log('Backend running...');
});
