const express = require('express');
const router = express.Router();

const hobbiesController = require('../controller/hobbies');

router.get('/', hobbiesController.getAll);

router.get('/:id', hobbiesController.getSingle);

router.post('/', hobbiesController.createHobbie);

router.put('/:id', hobbiesController.updateHobbie);

router.delete('/:id', hobbiesController.deleteHobbie);

module.exports = router;