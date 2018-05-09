'use strict'
const Service = require('./service');
const logger = require('../../../../helpers/logger').logger
const util = require('../../../../common/util');
const apiResponse = require('../../../../helpers/apiResponse');
const constants = require('../../../../common/constants');
const _ = require('underscore');
const common = require('../../../../helpers/common');
const authController = require('../../../../helpers/authController');

module.exports = {
    /*
       /---------------------------ROOT LEVEL-----------------
       */
    getAll: async (req, res, next) => {
        //  logger.error(util.getTime('2013-12-01'));
        //  logger.logger.info("TEST LOG");
        res.send("test here")
    },
    save: async (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const data = body.data;
        const phone = data.phone;
        if (!common.isValidPhone(phone)) {
            // invalid mobile
            return next(new Error(constants.INVALID_PHONE));
        }

        try {
            const result = await Service.getByPhone(phone);

            if (!_.isEmpty(result)) {
                //login process
                try {
                    const result2 = await Service.sendOtp(result[0].id);
                    if (result2.affectedRows > 0) {
                        //otp sent
                        const responseObj = {
                            "session_id": result2['session_id']
                        }
                        return apiResponse.sendJson(req, res, 200, constants.OTP_SENT, responseObj);
                    } else {
                        //error occured
                        return next(new Error(constants.COMMON_ERROR));
                    }
                } catch (error) {
                    return next(new Error(constants.COMMON_ERROR + " " + error.message));
                }
            } else {
                //register here
                const objectForSaving = {
                    "phone": phone
                };
                try {
                    const result2 = await Service.save(objectForSaving)
                    const responseObj = {
                        "session_id": result2['session_id']
                    }
                    return apiResponse.sendJson(req, res, 201, constants.OTP_SENT, responseObj);
                } catch (error) {
                    return next(new Error(constants.COMMON_ERROR + " " + error.message));
                }
            }
        } catch (error) {
            return next(new Error(constants.COMMON_ERROR + " " + error.message));
        }
    },
    updateAll: async (req, res, next) => {

    },
    patchUpdateAll: async (req, res, next) => {

    },
    deleteAll: async (req, res, next) => {

    },

    /*
    /---------------------------ID LEVEL-----------------
    */
    getById: async (req, res, next) => {

    },
    saveAtId: async (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const data = body.data;
        const otp = data.otp;
        const session_id = data.session_id;
        if (_.isEqual(id, "verify-otp")) {
            //url to verify otp
            try {
                const result = await Service.verifyOtp(session_id, otp);
                const userToken = authController.generateToken(result, constants.MOBILE_AUD);
                if (!_.isNull(userToken)) {
                    const responseObj = {
                        "token": userToken
                    }
                    return apiResponse.sendJson(req, res, 200, constants.OTP_VERIFIED, responseObj);
                } else {
                    return next(new Error(constants.COMMON_ERROR));
                }
            } catch (error) {
                return next(new Error(constants.COMMON_ERROR + " " + error.message));
            }
        } else {
            next();
        }
    },
    updateAtId: async (req, res, next) => {

    },
    patchUpdateAtId: async (req, res, next) => {

    },
    deleteAtId: async (req, res, next) => {

    },
    /*
    /---------------------------ACTION LEVEL-----------------
    */
    getAction: async (req, res, next) => {

    },
    saveAction: async (req, res, next) => {

    },
    updateAction: async (req, res, next) => {

    },
    patchUpdateAction: async (req, res, next) => {

    },
    deleteAction: async (req, res, next) => {

    }
}