const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.route('/')
    .all((req, res, next) => {
        next();
    })
    .post(Controller.save)

router.route('/save-action')
    .all((req, res, next) => {
        next();
    })
    .post(Controller.saveAction)

module.exports = router;