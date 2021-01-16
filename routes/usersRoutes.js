const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController.js');

router
    .get('/', controller.get)
    .post('/', controller.add)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)

module.exports = router;