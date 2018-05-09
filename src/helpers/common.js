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
exports.currentDate = function (formatType) {
    //default format 2018-05-09T12:00:22+05:30
    const common_format = 'MMMM Do YYYY, h:mm:ss a';// May 9th 2018, 11:59:39 am
    if (formatType) {
        return new moment().format(formatType);
    } else {
        return new moment().format();
    }
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