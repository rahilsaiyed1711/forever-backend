import Order from '../models/order.model';
import User from '../models/user.model';
import Stripe from 'stripe';
import { Request, Response } from 'express';
const currency = 'inr';
const deliveryCharges = 40;

// for COD
const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentMode: 'COD',
      payment: false,
      date: Date.now(),
    });
    const newOrder = new Order(orderData);
    newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res
      .status(200)
      .json({ success: true, messege: 'order placed successfully' });
  } catch (error) {
    res.status(401).json({ success: false, messege: 'error placing error' });
  }
};

//for stripe
const placeOrderStripe = async (req: Request, res: Response) => {};

//for razorpay
const placeOrderRazorpay = async (req: Request, res: Response) => {};

const allOrders = async (req: Request, res: Response) => {
  try {
    const order = await Order.find({});
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, data: null });
  }
};

const userOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, data: null });
  }
};

//uddate order stratus

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    await Order.findOneAndUpdate(orderId, { status });
    res.status(200).json({ success: true, messege: 'Status Updated' });
  } catch (err) {
    res.status(404).json({ messege: err });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
