const userService = require('../services/user.service.js');

class UsersController {
    constructor() {
        this.get = this.get.bind(this)
    }
    service = userService;

    get(req, res, next) {
        res
            .status(200)
            .send({
                users: this.service.getUsers(),
                login: req.login
            })
    }

    add = (req, res, next) => {
        res
            .status(201)
            .send(this.service.addUser(req.body))
    }

    update = (req, res, next) => {
        res
            .send(
                this.service.update(req.body, req.body.login)
            );
    }

    
    delete = (req, res, next) => {
        res
            .status(201)
            .send(this.service.deleteUser(req.params.id))
    }

    login = (req, res) => {
        res
            .send(this.service.login(req.body.login, req.body.password));
    }
}

module.exports = new UsersController();