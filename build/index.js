"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const cloudnary_1 = __importDefault(require("./config/cloudnary"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
(0, db_1.default)();
(0, cloudnary_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//api endpoints
app.use('/api/users', user_route_1.default);
app.use('/api/products', product_route_1.default);
app.get('/', (req, res) => {
    res.send('api working');
});
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
