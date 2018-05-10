'use strict'

const apiResponse = require("./helpers/apiResponse");
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rfs = require('rotating-file-stream');
const tokenValidator = require('./middlewares/tokenValidator');
const userValidator = require('./middlewares/userValidator')
const bearerToken = require('express-bearer-token');
const useragent = require('express-useragent');
const requestIp = require('request-ip');
const requestAnalyzer = require('./middlewares/requestAnalyzer');

//app for client app
const app = new express();

(() => {
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
})();

const logDirectory = 'logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('api_access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))

// for parsing the body
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(useragent.express());
app.use(requestIp.mw())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(bearerToken()); //It manages the token variable in request
app.use(requestAnalyzer); //It manages the token variable in request
//app.use(tokenValidator); //It manages the token variable in request
//app.use(userValidator); //It manages the user role in request

app.use('/book-store/api/v1', require('./api_modules/client_app/moduleRouter'));
//error handler
app.use((err, req, res, next) => {
    if (err) {
        apiResponse.sendJson(req, res, 500, err.message);
    }
})

module.exports = {
    app: app
};