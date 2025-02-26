"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    // destination: function(res,file, cb){
    //   cb(null, "./uploads");
    // },
    filename: function (res, file, cb) {
        const suffix = `${Date.now()}-${Math.random() * 1e9}${path_1.default.extname(file.originalname)}`;
        cb(null, suffix);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
exports.default = upload;
