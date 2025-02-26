import { Router } from 'express';
import {
  addProduct,
  listProduct,
  removeProduct,
} from '../controllers/product.controller';
import upload from '../middleware/multer';
const productRouter = Router();

productRouter.post(
  '/add',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);
productRouter.post('/list', listProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', addProduct);

export default productRouter;
