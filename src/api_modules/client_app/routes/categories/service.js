'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger

module.exports = {
    getAll: (pid) => {
        const query = "SELECT * FROM categories WHERE parent_id = ?";
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query,pid, function (err, result) {
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
        let query = "INSERT INTO categories SET ?";
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
        const query = "SELECT * FROM categories WHERE id = ?";
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