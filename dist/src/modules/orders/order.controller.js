"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorValidation_1 = require("../../../Utils/ErrorValidation");
const product_model_1 = __importDefault(require("../products/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
exports.createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = ErrorValidation_1.orderValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
        const error = validationResult.error;
        return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    try {
        const { productId, quantity } = req.body;
        const product = yield product_model_1.default.findById(productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        if (product.inventory.quantity < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
        }
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        const order = new order_model_1.default(req.body);
        yield order.save();
        res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
    }
    catch (err) {
        next(err);
    }
});
exports.getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    let orders;
    try {
        if (email) {
            const orders = yield order_model_1.default.find({ email });
            res.status(200).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });
        }
        else {
            orders = yield order_model_1.default.find();
            res.status(200).json({ success: true, message: 'Orders fetched successfully!', data: orders });
        }
    }
    catch (err) {
        next(err);
    }
});
