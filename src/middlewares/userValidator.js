'use strict'

const db = require('../api_modules/client_app/configs/db');
const _ = require('underscore');
const TABLE_NAME = "user";

module.exports = async (req, res, next) => {
    if (!_.isEmpty(req.decoded)) {
        req.decoded = {
            "role": "GUEST"
        }
        return next();
    } else {
        const user_id = req.decoded.user_id;
        const query = `SELECT user_types.type_name AS role FROM ${TABLE_NAME} JOIN user_types ON user.user_type =user_types.id WHERE id = ?`;
        db.getConnection(function (err, connection) {
            if (err) {
                logger.info(err)
                connection.release();
                return next(err);
            }
            connection.query(query, pid, function (err, result) {
                logger.info("QUERY::" + this.sql);
                connection.release();
                if (err) {
                    return next(err)
                } else {
                    if (result.length > 0) {
                        const userType = result[0]['role'];
                        req.decoded.role = userType;
                        return next();
                    } else {
                        return next(new Error("No user found"));
                    }
                }
            });
            connection.on('error', function (err) {
                logger.info(err)
                connection.release();
                return next(err);
            });
        })
    }
}
