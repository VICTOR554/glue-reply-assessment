const express = require('express');
const router = express.Router();

const handlers = require('./registration.handler');

router.get('/all', handlers.getAllUser);
router.post('/new', handlers.createUser);

module.exports = router;
