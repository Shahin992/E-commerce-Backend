"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().nonnegative("Price must be a positive number"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tags must be non-empty strings")),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string().min(1, "Type is required"),
        value: zod_1.z.string().min(1, "Value is required")
    })),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().nonnegative("Quantity must be a positive number"),
        inStock: zod_1.z.boolean()
    })
});
exports.productValidationSchema = productValidationSchema;
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
    price: zod_1.z.number().nonnegative("Price must be a positive number"),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1")
});
exports.orderValidationSchema = orderValidationSchema;
