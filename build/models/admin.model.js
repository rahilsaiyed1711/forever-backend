"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = require("validator");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        validate: [validator_1.isEmail, "Enter a valid mail"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password minimum length is 6"]
    }
}, { timestamps: true });
const Admin = (0, mongoose_1.model)('admin', adminSchema);
exports.default = Admin;
