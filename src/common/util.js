'use strict'
const moment = require('moment-timezone');
const zone = "Asia/Kolkata";
//const zone = "America/Los_Angeles";
moment.tz.setDefault(zone);

module.exports = {
    getTime: (time) => {
        if (time) {
            return moment(time).format();
        } else {
            return moment().format();
        }
    },
    getTimeZone: () => {
        return moment.tz.guess();
    }
}