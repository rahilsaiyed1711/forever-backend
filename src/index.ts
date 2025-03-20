import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import connectCloudinary from './config/cloudnary';
import router from './routes/user.route';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
dotenv.config();
const PORT = process.env.PORT;
const app = express();
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/users', router);
app.use('/api/products', productRouter);
app.use('/api/orders',orderRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('api working');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
