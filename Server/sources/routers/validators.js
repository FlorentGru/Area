'use strict';

const { body } = require('express-validator/check')

exports.validate = (method) => {
    switch (method) {
        case 'createArea': {
            return [
                body('userName', 'userName doesn\'t exists').exists(),
                body('email', 'Invalid email').exists().isEmail(),
                body('phone').optional().isInt(),
                body('status').optional().isIn(['enabled', 'disabled'])
            ]
        }
    }
};