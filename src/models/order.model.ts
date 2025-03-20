import {Schema, model} from "mongoose";
import { IOrderData } from "../Interfaces/db.interface";
const orderSchema = new Schema<IOrderData>({
    orderId:{
        type: String,
        required : true,
    },
    items:{
        type: [],
        required : true,
    },
    amount:{
        type:Number,
        required : true,
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'Order placed'
    },
    paymentMode:{
        type: String,
        required: true
    },
    payment:{
        type: Boolean,
        required : true,
        default: false
    },
    date:{
        type: Number,
        required : true,
    }
});

const Order = model<IOrderData>("order", orderSchema);

export default Order;