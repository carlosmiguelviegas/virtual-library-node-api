const express = require('express');

const apiRouter = require('./routes/api');

const app = express();

app.use('/api/v1', apiRouter);

module.exports = app;
