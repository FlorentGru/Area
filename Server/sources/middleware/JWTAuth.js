const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWTAuth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);

        if (!process.env.SERVER_ADDRESS) {
            throw ({ error: 'You didn\'t update the server address!' });
        }
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw ({ error: 'Unauthorized' });
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
};
module.exports = JWTAuth;