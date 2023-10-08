const express = require('express');
const router = express.Router();
const controller = require('../controllers/OsController')
router.get('/cpu-usage', controller.cpuUsage);
router.get('/mem-usage', controller.memUsage);
module.exports = router;
