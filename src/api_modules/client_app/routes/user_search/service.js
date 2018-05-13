'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger
const QueryExecuter = require('../../../../helpers/queryExecuter');
const TABLE_NAME = "user_searches";
const POST_TABLE = "enquiries";
const SEARCH_CLICKS = "search_clicks";

module.exports = class Service {
    constructor() {}
    save(data) {
        let query = `INSERT INTO ${TABLE_NAME} SET ?`;
        let query2 = `SELECT * FROM ${POST_TABLE}`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query, data)
                .then((result) => {
                    const insertId = result.insertId;
                    new QueryExecuter().executeQuery(query2)
                        .then((result) => {
                            resolve({
                                "searchId": insertId,
                                "searchResult": result
                            })
                        })
                        .catch(error => reject(error))
                })
                .catch(error => reject(error))
        })
    }
    saveSearchAction(data) {
        let query = `INSERT INTO ${SEARCH_CLICKS} SET ?`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query, data)
                .then((result) => resolve(result))
                .catch(error => reject(error))
        })
    }
}