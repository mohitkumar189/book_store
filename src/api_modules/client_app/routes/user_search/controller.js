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

    save: async (req, res, next) => {
        const body = req.body;
        let data = body.data;
        let objectToSave = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                objectToSave[key] = data[key];
            }
        }
        try {
            const result = await new Service().save(objectToSave);
            return apiResponse.sendJson(req, res, 201, constants.DATA_SAVED, result);
        } catch (error) {
            return next(new Error(constants.SAVING_ERROR + " " + error.message));
        }
    },

    /*
    /---------------------------ID LEVEL-----------------
    */
    saveAction: async (req, res, next) => {
        const body = req.body;
        let data = body.data;
        let objectToSave = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                objectToSave[key] = data[key];
            }
        }
        try {
            const result = await new Service().saveSearchAction(objectToSave);
            return apiResponse.sendJson(req, res, 201, constants.DATA_SAVED, result);
        } catch (error) {
            return next(new Error(constants.SAVING_ERROR + " " + error.message));
        }
    }
}