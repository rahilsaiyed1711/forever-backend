"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = require("validator");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator_1.isEmail,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    cartData: {
        type: Object,
        default: {},
    },
}, { minimize: false });
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
