'use strict'
const Service = require('./service');
const logger = require('../../../../helpers/logger').logger
const util = require('../../../../common/util');
const apiResponse = require('../../../../helpers/apiResponse');
const constants = require('../../../../common/constants');

module.exports = {
    /*
       /---------------------------ROOT LEVEL-----------------
       */
    getAll: async (req, res, next) => {
        try {
            const result = await Service.getAll();
            return apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED, result);
        } catch (error) {
            return next(new Error(constants.FETCHING_ERROR + " " + err.message));
        }
    },
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
            const result = await Service.save(objectToSave);
            return apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED, result);
        } catch (error) {
            return next(new Error(constants.FETCHING_ERROR + " " + error.message));
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
        try {
            const result = await Service.getById(req.params.id);
            return apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED, result);
        } catch (error) {
            return next(new Error(constants.FETCHING_ERROR + " " + error.message));
        }
    },
    saveAtId: async (req, res, next) => {

    },
    updateAtId: async (req, res, next) => {

    },
    patchUpdateAtId: async (req, res, next) => {

    },
    deleteAtId: async (req, res, next) => {

    }
}