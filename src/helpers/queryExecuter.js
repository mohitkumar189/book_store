const db = require('../api_modules/client_app/configs/db');
const _ = require('underscore');
const logger = require('./logger').logger
module.exports = (query, options) => {
    return new Promise((resolve, reject) => {
        db.getConnection(function (err, connection) {
            if (err) {
                logger.info(err)
                connection.release();
                reject(err);
            }
            connection.query(query, options, function (err, result) {
                logger.info("QUERY::" + this.sql);
                connection.release();
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }

            });
            connection.on('error', function (err) {
                logger.info(err)
                connection.release();
                reject(err);
            });
        })
    })
}