"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("../middleware/multer"));
const productRouter = (0, express_1.Router)();
productRouter.post('/add', multer_1.default.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), product_controller_1.addProduct);
productRouter.post('/list', product_controller_1.listProduct);
productRouter.post('/remove', product_controller_1.removeProduct);
productRouter.post('/single', product_controller_1.addProduct);
exports.default = productRouter;
