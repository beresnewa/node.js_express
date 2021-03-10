const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    
    try {
        const header = req.header('Authorization');
        const token = header.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secret');
        const user = User.findOne({ _id: decoded.userId })
        console.log(user)
        if (user === null) {
            throw new Error();
        }
        req.user = user;
        next();
        return;

    } catch (err) {
        res.status(401).send(`Please authentificate: ${err.message}`)
    }
}

module.exports = auth;