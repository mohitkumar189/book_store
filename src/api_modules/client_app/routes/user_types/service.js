'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger

module.exports = {
    getAll: () => {
        const query = "SELECT * FROM user_types";
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query, function (err, result) {
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
    },
    save: (data) => {
        let query = "INSERT INTO user_types SET ?";
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query, data, function (err, result) {
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
    },
    getById: (id) => {
        const query = "SELECT * FROM user_types WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query,id, function (err, result) {
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
}