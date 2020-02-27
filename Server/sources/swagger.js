var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var options = {
    swaggerDefinition: {
        info: {
            title: 'Area server API',
            version: '0.1.0',
            description: 'RESTful API for a web application ' +
                'that aims to create Actions/REActions between different services',
        },
        host: 'localhost:8081',
        basePath: '',
        produces: [
            "application/json"
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname,
    files: ['./**/*.js']
};

module.exports = options;