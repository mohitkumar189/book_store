'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger
const QueryExecuter = require('../../../../helpers/queryExecuter');
const TABLE_NAME = "categories";
const UPDATE_VER = ", __v =__v +1";

module.exports = class Service {
    constructor() {}
    getAll(pid) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE parent_id = ?`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query, pid)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
    save(data) {
        let query = `INSERT INTO ${TABLE_NAME} SET ?`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query, data)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
    getById(id) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query, id)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
    updateAtId(id, data) {
        data['last_updated'] = common.currentDate();
        let query = `UPDATE ${TABLE_NAME} SET ? ${UPDATE_VER} WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            new QueryExecuter().executeQuery(query, data)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
}