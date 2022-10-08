const swaggerJSDoc = require('swagger-jsdoc');
const meta = require('./swaggerMeta');
const paths = require('./paths');
const components = require('./components');

const document = module.exports;
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            openapi: meta.openapi || '',
            title: meta.info.title || '',
            version: meta.info.version || '',
            description: meta.info.description || '',
            license: {
                name: meta.info.license.name || '',
                url: meta.info.license.url || '',
            },
            contact: {
                name: meta.info.contact.name || '',
                url: meta.info.contact.url || '',
                email: meta.info.contact.email | '',
            },
        },
        host: [`${process.env.HOST}:${process.env.PORT}`],
        // host: [process.env.HOST],
        basePath: '/api',
        // schemes: ['http', 'https'],
        // securityDefinitions: {
            // Bearer: {
            //     type: 'apiKey',
            //     name: 'Authorization',
            //     in: 'header',
            // },
            // definition for oauth2
        // },
        // securityDefinitions: {
        //     simple: {
        //       type: 'basic',
        //     },
        //   },
        //   security: [{
        //     simple: [],
        //   }],
        paths,
        components,
    },
    apis: ['../server.js'],
};

document.swaggerDocs = swaggerJSDoc(swaggerOptions);
