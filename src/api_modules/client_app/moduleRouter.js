'use strict'

var express = require('express');
var router = express.Router();

router.use('/user-type', require('./routes/user_types/index'));
router.use('/user', require('./routes/users/index'));
router.use('/category', require('./routes/categories/index'));

module.exports = router;