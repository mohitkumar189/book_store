'use strict'

var express = require('express');
var router = express.Router();

router.use('/user-type', require('./routes/user_types/index'));
router.use('/user', require('./routes/users/index'));
router.use('/category', require('./routes/categories/index'));
router.use('/enquiry', require('./routes/enquiries/index'));
router.use('/analytic', require('./routes/analytics/index'));
router.use('/address', require('./routes/user_address/index'));
router.use('/post_action', require('./routes/post_analytics/index'));

module.exports = router;