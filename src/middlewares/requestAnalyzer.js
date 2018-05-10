'use strict'

const queryExecuter = require('../helpers/queryExecuter');
const _ = require('underscore');
const TABLE_NAME = "api_requests";

module.exports = async (req, res, next) => {
    let query = `INSERT INTO ${TABLE_NAME} SET ?`;
    let options = {
        "api_url": req.url,
        "user_agent": JSON.stringify(req.useragent),
        "ip_address": req.clientIp
    };
    queryExecuter(query, options);
    return next();
}