'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger
const QueryExecuter = require('../../../../helpers/queryExecuter');
const TABLE_COUNTRY = "countries";
const TABLE_STATES = "states";
const TABLE_CITY = "cities";

module.exports = class Service {
    constructor() {}
    getCountries() {
        const query = `SELECT * FROM ${TABLE_COUNTRY} WHERE status = 1`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
    getStates(countryId) {
        const query = `SELECT * FROM ${TABLE_STATES} WHERE country_id = ${countryId} AND status = 1`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
    getCities(stateId) {
        const query = `SELECT * FROM ${TABLE_CITY} WHERE state_id = ${stateId} AND status = 1`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
}