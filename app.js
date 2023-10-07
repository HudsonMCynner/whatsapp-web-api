const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/x-www-form-urlencoded
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
//Rotas
const index = require('./routes');
const osRoute = require('./routes/OsUtilRouter');
const whatsRoute = require('./routes/whatsRoute');
app.use('/', index);
app.use('/os', osRoute);
app.use('/whats', whatsRoute);
module.exports = app;
