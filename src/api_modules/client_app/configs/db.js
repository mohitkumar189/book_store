const mysql = require('mysql');
const config = require('./config').config();

module.exports = mysql.createPool({
    connectionLimit: 50,
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE_NAME,
    multipleStatements: true
});
