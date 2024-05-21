"use strict";
const express = require('express');
const router = express.Router();
router.use('/api', productsRoutes);
module.exports = router;
