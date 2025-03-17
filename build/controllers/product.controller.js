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
exports.singleProduct = exports.removeProduct = exports.listProduct = exports.addProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
//for adding products
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller, } = req.body;
        const files = req.files;
        // const image1 = req.files.image1 && req.files.image1[0]
        // const image2 = req.files.image2 && req.files.image2[0]
        // const image3 = req.files.image3 && req.files.image3[0]
        // const image4 = req.files.image4 && req.files.image4[0]
        const { image1: [image1], image2: [image2], image3: [image3], image4: [image4], } = files;
        const images = [image1, image2, image3, image4].filter((item) => item != undefined);
        let imagesURL = yield Promise.all(images.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            let result = yield cloudinary_1.v2.uploader.upload(item.path, {
                resource_type: 'image',
            });
            return result.secure_url;
        })));
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesURL,
            category,
            subCategory,
            sizes,
            bestSeller: bestSeller === 'true' ? true : false,
            date: Date.now(),
        };
        console.log(productData);
        const product = new product_model_1.default(productData);
        product.save();
        console.log(image1, image2, image3, image4);
        console.log(imagesURL);
        res.status(201).json({ msg: 'Product Added' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addProduct = addProduct;
//for listing products 
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({});
        console.table(products);
        res.status(200).json({ success: true, data: products });
    }
    catch (err) {
        res.status(500).json({ success: false });
    }
});
exports.listProduct = listProduct;
//for removing products
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.default.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, msg: "Product Removed" });
    }
    catch (error) {
        res.status(500).json({ success: false, msg: "error removing product" });
    }
});
exports.removeProduct = removeProduct;
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.default.findById(req.body.id);
        res.status(200).json({ success: true });
    }
    catch (err) {
    }
});
exports.singleProduct = singleProduct;
