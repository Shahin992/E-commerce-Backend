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
const product_model_1 = __importDefault(require("./product.model"));
exports.createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = ErrorValidation_1.productValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
        const error = validationResult.error;
        return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    try {
        const product = new product_model_1.default(req.body);
        yield product.save();
        res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
    }
    catch (err) {
        next(err);
    }
});
exports.getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    let products;
    try {
        if (searchTerm) {
            products = yield product_model_1.default.find({
                $or: [
                    { name: new RegExp(searchTerm, 'i') },
                    { category: new RegExp(searchTerm, 'i') },
                    { tags: { $in: [new RegExp(searchTerm, 'i')] } }
                ]
            });
            res.status(200).json({ success: true, message: `Products matching search term '${searchTerm}' fetched successfully!`, data: products });
        }
        else {
            products = yield product_model_1.default.find();
            res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product fetched successfully!', data: product });
    }
    catch (err) {
        next(err);
    }
});
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product updated successfully!', data: product });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByIdAndDelete(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product deleted successfully!', data: null });
    }
    catch (err) {
        next(err);
    }
});
