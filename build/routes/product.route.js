"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("../middleware/multer"));
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const productRouter = (0, express_1.Router)();
productRouter.post('/add', adminAuth_1.default, multer_1.default.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), product_controller_1.addProduct);
productRouter.get('/list', product_controller_1.listProduct);
productRouter.post('/remove', adminAuth_1.default, product_controller_1.removeProduct);
productRouter.get('/single', product_controller_1.singleProduct);
exports.default = productRouter;
