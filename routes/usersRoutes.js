const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController.js');
const auth = require('../middlewares/auth.middlewares.js');
const allowCrossDomain = require('../middlewares/cors.middlewares');
const cors = require('cors');

router
    .get('/', auth, controller.get)
    .post('/', controller.add)
    .post('/login', controller.login)
    .put('/:id', auth, controller.update)
    .delete('/:id', auth, controller.delete)

module.exports = router;