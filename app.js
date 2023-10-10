const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
//Rotas
const index = require('./src/routes');
const auth = require('./src/routes/AuthRoute');
const osRoute = require('./src/routes/OsUtilRouter');
const whatsRoute = require('./src/routes/whatsRoute');

app.use('/', index);
app.use('/auth', auth);
app.use('/os', osRoute);
app.use('/whats', whatsRoute);
module.exports = app;
