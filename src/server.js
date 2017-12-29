'use strict';

import env from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import Router from './routes/routes';

const app = express();
const router = express.Router();

// configure app to use .env
env.config();

// set db
const db = process.env.USER === 'travis' && process.env.NODE_ENV === 'test' ?  process.env.MONGO_URL : process.env.MONGO_TEST;

// set our port
const port = process.env.PORT || 3000;

// Connect to the db
mongoose.connect(db);

// configure app to use bodyParser()
// this allows us get data foom post
// in form of json and url encoded form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add Routes
app.use('/api', router);
Router.routes(router);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;