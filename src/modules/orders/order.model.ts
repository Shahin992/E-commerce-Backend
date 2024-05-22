import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

            // Order Schema //

const OrderSchema: Schema = new Schema({
    email: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // product id refer the product that in the products list
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
{versionKey:false, timestamps:false}
);
  
  export default mongoose.model<IOrder>('Order', OrderSchema);