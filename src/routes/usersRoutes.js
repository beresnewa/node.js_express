const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController.js');
const auth = require('../middlewares/auth.middlewares.js');
const upload = require('../middlewares/multer.middlewares.js');

router
    .get('/', auth, controller.get)

    .post('/followers', auth, controller.getFollowers)
    .post('/registration', controller.add)
    .post('/login', controller.login)
    .post('/upload/photo', auth, upload.single("filedata"), controller.uploadPhoto)
    .post('/upload/avatar', auth, upload.single("filedata"), controller.uploadAvatar)
    .post('/', auth, controller.deleteImage)
    .post('/subscription', auth, controller.deleteSubscrption)
    .post('/follower', controller.getFollower)

    .put('/followers', auth, controller.addFollowers)
    .put('/:id', auth, controller.update)

    .delete('/:id', auth, controller.delete)

module.exports = router;