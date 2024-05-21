const express = require('express');
const router = express.Router();

router.use('/api', productsRoutes);
export default router;