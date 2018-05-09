'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../common/config').config();
const _ = require('underscore');
const constants = require('../common/constants');

module.exports = {
    generateSaltPass: (stringPassword) => {
        const salt = bcrypt.genSaltSync(10);
        const hashValue = bcrypt.hashSync(stringPassword, salt);
        return {
            "salt": salt,
            "hashValue": hashValue
        }
    },
    comparePassword: (stringPassword, hashedPassword) => {
        return bcrypt.compareSync(stringPassword, hashedPassword);
    },
    generateToken: (signingObject, aud) => {
        let options = {};
        options.algorithm = 'HS256';

        if (aud == constants.WEB_AUD) {
            options.expiresIn = constants.TOKEN_EXPIRY_TIME;
        }
        options.issuer = constants.TOKEN_ISSUER;

        if (_.isEmpty(signingObject)) {
            return null;
        }

        try {
            return jwt.sign(signingObject, config.SECRET_KEY, options)
        } catch (error) {
            return null;
        }
    },
    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(jwt.verify(token, config.SECRET_KEY));
            } catch (error) {
                reject(error);
            }
        });
    }
}