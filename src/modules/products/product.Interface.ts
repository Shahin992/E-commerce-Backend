import mongoose from 'mongoose';

interface Variant {
  type: string;
  value: string;
}

interface Inventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
}