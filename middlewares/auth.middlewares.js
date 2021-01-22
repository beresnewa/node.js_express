const jwt = require('jsonwebtoken');

const auth = (token) => (req, res, next) => {
    
    try {
        const [strategy , token] = req.headers['authorization'].split(' ');
        const result = jwt.verify(token, 'secret'); 
        req.user = result;

        next();
    } catch (err) {
        res.status(401).send(err.message)
    }
}

module.exports = auth;