import { Request, Response, NextFunction } from 'express';
import {orderValidationSchema} from '../../../Utils/ErrorValidation'
import productModel from '../products/product.model';
import orderModel from './order.model';


                              // Add order controller //  
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {

                              // validation with zod //
    const validationResult = orderValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      const error = validationResult.error;
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }

    try {
      const { productId, quantity } = req.body;
      const product = await productModel.findById(productId);  // find product from productModel
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  
                        // Insufficient quantity // 

      if (product.inventory.quantity < quantity) {
        return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
      }

      product.inventory.quantity -= quantity; // reduce product quantity by orders quantity
      product.inventory.inStock = product.inventory.quantity > 0; // inStock true when quantiy getter than 0
      await product.save(); // save the updated  quantity & instock by order
  
      const order = new orderModel(req.body);  // create order
      await order.save(); // save to the ordermodel
      res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
    } catch (err) {
      next(err);
    }
  };
  
                                // get order controller // 

  export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query;
    let orders;
    try {
                    // Get Orders by email //
      if(email ){
        const orders = await orderModel.find({ email });
        res.status(200).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });

      }
                        // Get all order //
      else {
         orders = await orderModel.find();
        res.status(200).json({ success: true, message: 'Orders fetched successfully!', data: orders });
      }
    } catch (err) {
      next(err);
    }
  };