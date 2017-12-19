'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';

const app = express();

// set our port
const port = process.env.port || 3000;

// configure app to use bodyParser()
// this allows us get data foom post
// in form of json and url encoded form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;