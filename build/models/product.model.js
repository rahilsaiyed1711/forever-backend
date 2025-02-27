"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: [Array],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: [Array],
        required: true,
    },
    bestSeller: {
        type: Boolean,
    },
    date: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Product = (0, mongoose_1.model)('product', productSchema);
exports.default = Product;
