const express = require('express');

const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', apiRouter);

module.exports = app;
