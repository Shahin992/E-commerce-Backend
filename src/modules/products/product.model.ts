import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.Interface";

        // VarientSchema //

const VariantSchema: Schema = new Schema({
    type: { type: String, required: true },
    value: { type: String, required: true }
  },
  { versionKey: false }
);

          //inventorySchema //

  const InventorySchema: Schema = new Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
  },
  { versionKey: false}
);
          // Product Schema   //
           
  const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantSchema], required: true },
    inventory: { type: InventorySchema, required: true }
  },
  { versionKey: false, timestamps: false}
);
  
  export default mongoose.model<IProduct>('Product', ProductSchema);