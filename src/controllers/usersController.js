const userService = require('../services/user.service.js');

class UsersController {
    constructor() {
        this.get = this.get.bind(this)
    }
    service = userService;

    get = async(req, res) => {
        try {
            res
            .status(200)
            .send(await this.service.getUsers(req.user, req.query))
        } catch(error) {
            res.status(400).send({error:error.message});
            console.log(error)
        }  
    }

    add = async(req, res, next) => {
        try {
            res
            .status(201)
            .send(await this.service.addUser(req.body))
        } catch(error) {
            res.status(400).send({error:error.message});
        }       
    }

    update = async(req, res, next) => {
        try {
            res
            .status(201)
            .send(await this.service.updateUser(req.params.id, req.body));
        } catch(error) {
            res.status(400).send({error:error.message});
        }  
    }

    delete = async(req, res, next) => {
        try {
            res
            .status(201)
            .send( await this.service.deleteUser(req.params.id))
        } catch(error) {
            res.status(400).send({error:error.message});
        }  
    }

    login = async(req, res) => {
        try {
            res
            .send(await this.service.login(req.body.login, req.body.password));
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }

    addFollowers = async(req, res) => {
        try {
            res
            .send(await this.service.addFollowers(req.user, req.body.id))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }

    deleteSubscrption = async(req, res) => {
        try {
            res
            .send(await this.service.deleteSubscrption(req.user, req.body.id))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }

    getFollowers = async(req, res) => {
        try {
            res
            .send(await this.service.getFollowers(req.user))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }

    uploadPhoto = async (req, res, next ) => {
        try {
            res
            .status(201)
            .send(await this.service.uploadPhoto(req.file, req.user))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }
    uploadAvatar = async (req, res, next ) => {
        try {
            res
            .status(201)
            .send(await this.service.uploadAvatar(req.file, req.user))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }

    deleteImage = async (req, res) => {
        try {
            res
            .status(201)
            .send(await this.service.deleteImage(req.body.indexImage, req.user))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }

    getFollower = async(req, res) => {
        try {
            res
            .send(await this.service.getFollower(req.body.id))
        } catch(error) {
            res.status(400).send({error:error.message});
        } 
    }
}

module.exports = new UsersController();