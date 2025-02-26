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
exports.adminLogin = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const isExist = yield user_model_1.default.findOne({ email });
        if (isExist) {
            res.status(409).json({ msg: 'user already existes' });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        const user = newUser.save();
        res.status(200).json({ msg: 'created' });
        return res.redirect('/api/users/login');
    }
    catch (error) {
        res.status(500).json({ error: 'error creating user' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found, please sign up' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'incorrect Password' });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        res.cookie('jwt', token);
        console.log(token);
        res.json({ token, email });
    }
    catch (err) {
        res.status(500).json({ msg: 'eroor ' });
    }
});
exports.loginUser = loginUser;
//admin login route
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield admin_model_1.default.findOne({ email });
        if (!user) {
            return res.status(409).json({ msg: 'User Does not exists' });
        }
        // const isMatched = await bcrypt.compare(password, user.password);
        if (password === user.password) {
            const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY, {
                expiresIn: '1h',
            });
            res.cookie('adminCookie', token);
            res.status(200).json({ token, email });
        }
        else {
            res.status(409).json({ msg: 'Password Incorrect' });
        }
    }
    catch (err) {
        res.status(500).json({ msg: 'error occurred' });
    }
});
exports.adminLogin = adminLogin;
