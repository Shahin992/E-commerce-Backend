import mongoose from 'mongoose';


export interface IOrder extends mongoose.Document {
    email: string;
    productId: mongoose.Schema.Types.ObjectId;
    price: number;
    quantity: number;
  }