'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger
const queryExecuter = require('../../../../helpers/queryExecuter');
const TABLE_NAME = "categories";

module.exports = {
    getAll: (pid) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE parent_id = ?`;
        return queryExecuter(query, pid);
    },
    save: (data) => {
        let query = `INSERT INTO ${TABLE_NAME} SET ?`;
        return queryExecuter(query, data);
    },
    getById: (id) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        return queryExecuter(query, id);
    },
    updateAtId: (id, data) => {
        data['last_updated'] = common.currentDate();
        let query = `UPDATE ${TABLE_NAME} SET ? WHERE id = ${id}`;
        return queryExecuter(query, [data, id]);
    }
}