const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const axios = require('axios');
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-docs/swagger');

const userRoutes = require('./platform/routes/user');


// routes

const HOSTNAME = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3001;
const SERVICE_NAME = process.env.SERVICE_NAME || process.env.HOSTNAME || '';

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json())
// app.use(require('connect').bodyParser());
app.get('/status', (req, res) => {
    const now = Date.now();
    const serviceName = SERVICE_NAME;
    return res.status(200).send({ status: 'running', service_name: serviceName, message: `E-commerce Backend Service ${now}` });
});

// routes
app.use('/api', userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.swaggerDocs));


// app.listen(PORT, () => {
//     console.log(`Server running on ${process.env.PORT}`);
//   });
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', async () => {
    server.listen(PORT, HOSTNAME, () => console.info(`Server is listening at http://${HOSTNAME}:${PORT} for ENV: ${process.env.NODE_ENV}`));
});

module.exports = server;
