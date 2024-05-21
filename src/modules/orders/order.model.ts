import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema: Schema = new Schema({
    email: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  });
  
  export default mongoose.model<IOrder>('Order', OrderSchema);