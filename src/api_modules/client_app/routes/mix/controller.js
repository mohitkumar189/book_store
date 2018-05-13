'use strict'
const Service = require('./Service');
const logger = require('../../../../helpers/logger').logger
const util = require('../../../../common/util');
const apiResponse = require('../../../../helpers/apiResponse');
const constants = require('../../../../common/constants');

module.exports = {
    /*
       /---------------------------ROOT LEVEL-----------------
       */
    getAll: async (req, res, next) => {
        const mixType = req.params.mix;
        console.log("mix request"+mixType);

        switch (mixType) {
            case "country":
                try {
                    const result = await new Service().getCountries();
                    return apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, result);
                } catch (error) {
                    return next(new Error(constants.FETCHING_ERROR + " " + error.message));
                }
                break;
            case "state":
                const countryId = req.query.id;
                try {
                    const result = await new Service().getStates(countryId);
                    return apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, result);
                } catch (error) {
                    return next(new Error(constants.FETCHING_ERROR + " " + error.message));
                }
                break;
            case "city":
                const stateId = req.query.id;
                try {
                    const result = await new Service().getCities(stateId);
                    return apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, result);
                } catch (error) {
                    return next(new Error(constants.FETCHING_ERROR + " " + error.message));
                }
                break;
            case "sub-city":
                break;
            default:
                next();
                break;
        }
    },
}