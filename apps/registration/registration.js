const express = require('express');
const router = express.Router();

const handlers = require('./registration.handler');

router.post('/new', handlers.createUser);
router.get('/', handlers.getAllUser);

module.exports = router;
