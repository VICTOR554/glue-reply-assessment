const express = require('express');
const router = express.Router();

const handlers = require('./payment.handler');

router.get('/all', handlers.getAllPayment);
router.post('/new', handlers.createPayment);

module.exports = router;
