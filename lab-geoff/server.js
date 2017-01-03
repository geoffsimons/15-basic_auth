'use strict';

const express = require('express');
const mongoose = require('mongoose');
// const Promise = require('bluebird');
const debug = require('debug')('mnp:server');

require('dotenv').load();

const PORT = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(require('./route/auth-route.js'));
app.use(require('./lib/error-middleware.js'));

app.listen(PORT, () => {
  debug('server up:', PORT);
});
