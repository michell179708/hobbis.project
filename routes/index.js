const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/hobbies', require('./hobbies'));

module.exports = router;