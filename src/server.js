'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';

import Router from './routes/routes';

const app = express();
const router = express.Router();

// set our port
const port = process.env.port || 3000;

// configure app to use bodyParser()
// this allows us get data foom post
// in form of json and url encoded form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add Routes
app.use('/', router);
Router.routes(router);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;