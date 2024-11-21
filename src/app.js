const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const apiRouter = require('./routes/api');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

app.use('/api/v1', apiRouter);

module.exports = app;
