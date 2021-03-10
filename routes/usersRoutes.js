const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController.js');
const auth = require('../middlewares/auth.middlewares.js');

router
    .get('/', auth, controller.get)
    // .get('/', auth(), controller.get)
    .post('/', controller.add)
    .post('/login', controller.login)
    .put('/:id', auth, controller.update)
    .delete('/:id', auth, controller.delete)

module.exports = router;