import { Router } from 'express';
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} from '../controllers/order.controller';
import adminAuth from '../middleware/adminAuth';
import authUser from '../middleware/auth';

const orderRouter = Router();

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//payment method

orderRouter.post('/place', placeOrder );
orderRouter.post('/stripe',authUser, placeOrderStripe );
orderRouter.post('/razorpay',authUser, placeOrderRazorpay );


//user order
orderRouter.post('/userorders', adminAuth, userOrders);



export default orderRouter;
