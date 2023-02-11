const express = require('express');
const router = express.Router();

const contactsController = require('../controller/hobbies');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createHobbie);

router.put('/:id', contactsController.updateHobbie);

router.delete('/:id', contactsController.deleteHobbie);

module.exports = router;