"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = express_1.Router();
router.post('/', product_controller_1.createProduct);
router.get('/', product_controller_1.getProducts);
exports.default = router;
