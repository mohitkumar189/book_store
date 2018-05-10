'use strict'

const _ = require('underscore');
const TABLE_NAME = "user";
const queryExecuter = require('../helpers/queryExecuter');

module.exports = async (req, res, next) => {
    if (!_.isEmpty(req.decoded)) {
        req.decoded = {
            "role": "GUEST"
        }
        return next();
    } else {
        const user_id = req.decoded.user_id;
        const query = `SELECT user_types.type_name AS role FROM ${TABLE_NAME} 
        JOIN user_types ON user.user_type =user_types.id WHERE id = ?`;
        try {
            const result = await queryExecuter(query, user_id);
            if (result.length > 0) {
                const userType = result[0]['role'];
                req.decoded.role = userType;
                return next();
            } else {
                return next(new Error("No user found"));
            }
        } catch (error) {
            return next(error);
        }
    }
}
