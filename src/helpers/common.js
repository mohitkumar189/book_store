'use strict'
var moment = require('moment');

exports.isSame = function (str1, str2) {
    if (str1 && str2) {
        if (str1 == str2) return true;
        else return false;
    } else {
        return false;
    }
}
exports.currentDate = function () {
    return new moment();
}

exports.contentType = function (content) {
    if (content != undefined) {
        return typeof content;
    } else return null;
}

exports.isValidPhone = function (phone) {
    return true;
}

exports.generateOtp = (length) => {
    return '1234';
}