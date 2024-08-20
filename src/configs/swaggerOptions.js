// src/config/swaggerOptions.js

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Name',
            version: '1.0.0',
            description: 'API documentation for Your Project',
        },
        servers: [
            {
                url: 'http://localhost:3056/', // Your server URL
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/**/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
