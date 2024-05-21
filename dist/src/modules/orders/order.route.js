"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const router = express_1.Router();
router.post('/', order_controller_1.createOrder);
router.get('/', order_controller_1.getOrders);
exports.default = router;
