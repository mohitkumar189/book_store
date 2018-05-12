'use strict'

const db = require('../../configs/db');
const common = require('../../../../helpers/common');
const _ = require('underscore');
const logger = require('../../../../helpers/logger').logger
const constants = require('../../../../common/constants');
const queryExecuter = require('../../../../helpers/queryExecuter');
const TABLE_NAME = "users";
const USER_LOGIN_TABLE = "user_logins";

module.exports = {
    getAll: () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return queryExecuter(query);
        /*         return new Promise((resolve, reject) => {
                    db.getConnection(function (err, connection) {
                        if (err) {
                            logger.info(err)
                            connection.release();
                            reject(err);
                        }
                        connection.query(query, function (err, result) {
                            logger.info("QUERY::" + this.sql);
                            connection.release();
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result);
                            }

                        });
                        connection.on('error', function (err) {
                            logger.info(err)
                            connection.release();
                            reject(err);
                        });
                    })
                }) */
    },
    save: async (data) => {
        let query = `INSERT INTO ${TABLE_NAME} SET ?`;

        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query, data, function (err, result) {
                    logger.info("QUERY::" + this.sql);
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        //find the inserted id and initiate otp
                        if (result.affectedRows > 0 && result.insertId > 0) {
                            //initiate otp
                            module.exports.sendOtp(result.insertId).then((result) => {
                                resolve(result);
                            }).catch((err) => {
                                reject(err);
                            });
                        }
                    }

                });
                connection.on('error', function (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                });
            })
        })
    },
    getById: (id) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        return queryExecuter(query, id);

        /*       return new Promise((resolve, reject) => {
                  db.getConnection(function (err, connection) {
                      if (err) {
                          logger.info(err)
                          connection.release();
                          reject(err);
                      }

                      connection.query(query, id, function (err, result) {
                          logger.info("QUERY::" + this.sql);
                          connection.release();
                          if (err) {
                              reject(err)
                          } else {
                              resolve(result);
                          }

                      });
                      connection.on('error', function (err) {
                          logger.info(err)
                          connection.release();
                          reject(err);
                      });
                  })
              }) */
    },
    updateAtId: (id, data) => {
        data['last_updated'] = common.currentDate();

        let query = `UPDATE ${TABLE_NAME} SET ? WHERE id = ${id}`;

        return queryExecuter(query, data);
        /* 
                return new Promise((resolve, reject) => {
                    db.getConnection(function (err, connection) {
                        if (err) {
                            logger.info(err)
                            connection.release();
                            reject(err);
                        }

                        connection.query(query, data, function (err, result) {
                            logger.info("QUERY::" + this.sql);
                            connection.release();
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result);
                            }

                        });
                        connection.on('error', function (err) {
                            logger.info(err)
                            connection.release();
                            reject(err);
                        });
                    })
                }) */
    },
    getByPhone: (data) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE phone = ?`;
        return queryExecuter(query, data);
        /* 
                return new Promise((resolve, reject) => {
                    db.getConnection(function (err, connection) {
                        if (err) {
                            logger.info(err)
                            connection.release();
                            reject(err);
                        }

                        connection.query(query, data, function (err, result) {
                            logger.info("QUERY::" + this.sql);
                            connection.release();
                            if (err) {
                                reject(err)
                            } else {
                                resolve(result);
                            }

                        });
                        connection.on('error', function (err) {
                            logger.info(err)
                            connection.release();
                            reject(err);
                        });
                    })
                })
         */
    },
    sendOtp: (userId) => {
        let objectToSave = {};
        const otp = common.generateOtp(4);
        const session_id = common.generateOtp(4);
        const query = `INSERT INTO ${USER_LOGIN_TABLE} SET ?`;
        objectToSave.otp = otp;
        objectToSave.user_id = userId;
        objectToSave.session_id = session_id;
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query, objectToSave, function (err, result) {
                    logger.info("QUERY::" + this.sql);
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        result.session_id = session_id;
                        resolve(result);
                    }

                });
                connection.on('error', function (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                });
            })
        })
    },
    verifyOtp: (session_id, otp) => {
        const query = `SELECT * FROM ${USER_LOGIN_TABLE} WHERE session_id = ? ORDER BY id DESC LIMIT 1`;
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query, session_id, function (err, result) {
                    logger.info("QUERY::" + this.sql);
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        if (!_.isEmpty(result)) {
                            const rotp = result[0]['otp'];
                            if (otp == rotp) {
                                // otp matched
                                process.nextTick(() => {
                                    //update previous otp by new otp
                                    module.exports.updateOtp(session_id);
                                })
                                const loginData = {
                                    "user_id": result[0]['user_id'],
                                    "session_id": result[0]['session_id'],
                                }
                                resolve(loginData)
                            } else {
                                //wrong otp
                                reject(new Error(constants.INVALID_OTP))
                            }
                        } else {
                            reject(new Error(constants.NO_SESSION_FOUND));
                        }
                    }
                });
                connection.on('error', function (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                });
            })
        })
    },
    updateOtp: (session_id) => {
        let objectToSave = {};
        const otp = common.generateOtp(4);
        const query = `UPDATE ${USER_LOGIN_TABLE} SET ? WHERE session_id = ?`;
        objectToSave.otp = otp;
        objectToSave.status = '1';
        return new Promise((resolve, reject) => {
            db.getConnection(function (err, connection) {
                if (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                }

                connection.query(query, [objectToSave, session_id], function (err, result) {
                    logger.info("QUERY::" + this.sql);
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        result.session_id = session_id;
                        resolve(result);
                    }

                });
                connection.on('error', function (err) {
                    logger.info(err)
                    connection.release();
                    reject(err);
                });
            })
        })
    }
}