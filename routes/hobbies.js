const express = require('express');
const router = express.Router();

const contactsController = require('../controller/hobbies');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createHobbie);

module.exports = router;