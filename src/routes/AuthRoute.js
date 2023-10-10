const express = require('express');
const router = express.Router();
const controller = require('../controllers/AuthController')
router.post('/login', controller.login);
router.post('/logoff', controller.logoff);
module.exports = router;
