const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.route('/:mix')
    .all((req, res, next) => {
        next();
    })
    .get(Controller.getAll);

module.exports = router;