const jwt = require('jsonwebtoken');
const users = require('../users.json');

const auth = (token) => (req, res, next) => {
    
    try {
        const [strategy , token] = req.headers['authorization'].split(' ');

        const decodedData = jwt.verify(token, 'secret'); 

        const findUser = users.find(user => {
            if (decodedData.login === user.login) {
                return true   
            }
        })
        if(findUser) {
            req.user = decodedData;
            next();
        } else {
            res.status(401).send('Unauthorized')
        }

    } catch (err) {
        res.status(401).send(err.message)
    }
}

module.exports = auth;