const express = require('express');
const router = express.Router();

router.use('/note', require('./note'));
router.use('/notes', require('./notes'));

module.exports = router;