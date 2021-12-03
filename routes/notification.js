const express = require('express')
const router = express.Router();
const notificationCtrl = require('../controllers/notification');

router.post('/notification', notificationCtrl.sendNotification);

module.exports = router;