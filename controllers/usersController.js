const userService = require('../services/user.service.js');

class UsersController {
    constructor() {
        this.get = this.get.bind(this)
    }
    service = userService;

    get = (req, res) => {
        res
            .status(200)
            .send(
                this.service.getUsers(),
                // login: req.login
            )
    }

    add = (req, res, next) => {
        res
            .status(201)
            .send(this.service.addUser(req.body))
            
    }

    update = (req, res, next) => {
        res
            .status(201)
            .send(this.service.updateUser(req.params.id, req.body));
    }

    
    delete = (req, res, next) => {
        res
            .status(201)
            .send(this.service.deleteUser(req.params.id))
    }

    login = (req, res) => {
        res
            .set("Access-Control-Allow-Origin", "http://localhost:8081")
            .send(this.service.login(req.body.login, req.body.password));
    }
}

module.exports = new UsersController();