import { Request, Response, NextFunction } from 'express';
import {orderValidationSchema} from '../../../Utils/ErrorValidation'
import productModel from '../products/product.model';
import orderModel from './order.model';


export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const validationResult = orderValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      const error = validationResult.error;
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }

    try {
      const { productId, quantity } = req.body;
      const product = await productModel.findById(productId);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  
      if (product.inventory.quantity < quantity) {
        return res.status(400).json({ success: false, message: 'Insufficient quantity available in inventory' });
      }
  
      product.inventory.quantity -= quantity;
      product.inventory.inStock = product.inventory.quantity > 0;
      await product.save();
  
      const order = new orderModel(req.body);
      await order.save();
      res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
    } catch (err) {
      next(err);
    }
  };
  

  export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query;
    let orders;
    try {
      if(email ){
        const orders = await orderModel.find({ email });
        res.status(200).json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });

      }
      else {
         orders = await orderModel.find();
        res.status(200).json({ success: true, message: 'Orders fetched successfully!', data: orders });
      }
    } catch (err) {
      next(err);
    }
  };