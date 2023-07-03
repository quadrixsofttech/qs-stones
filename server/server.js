require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const publicRouter = require('./routes/public.routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1', publicRouter);

const bam = require('./services/pto/pto.service');

const newPTO = {
  type: 'vacation',
  status: 'pending',
  userId: '6446881210fe681e89d9d7c4',
  reviewerId: '6446881210fe681e89d9d7c4',
  dates: [
    ['2023-07-01', '2023-07-05'],
    ['2023-07-10', '2023-07-12'],
  ],
  comment: 'Taking a vacation',
};

async function connect() {
  try {
    mongoose.Promise = global.Promise;
    await bam.createPTO(newPTO);
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log('Mongoose error', err);
  }
  app.listen(3001);
  console.log('API listening on localhost:3001');
}

connect();
