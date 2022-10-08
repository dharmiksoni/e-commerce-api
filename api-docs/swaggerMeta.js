module.exports = {
    openapi: '2.0.0',
    info: {
        title: 'Hybr1d',
        version: '1.0.0',
        description: 'API Documentation for the Hybr1d BE service.',
        license: {
            name: 'Hybr1d',
            url: 'http://localhost:3001/status',
        },
        contact: {
            name: 'Hybr1d',
        },
    },
    servers: [
        {
            url: `${process.env.HOST}/${process.env.PORT}`,
            description: 'Hybr1d BE service',
        },
    ],
};
