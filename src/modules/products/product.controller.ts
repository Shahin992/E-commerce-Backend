import { Request, Response, NextFunction } from 'express';
import {productValidationSchema} from '../../../Utils/ErrorValidation'
import productModel from './product.model';
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult = productValidationSchema.safeParse(req.body);

  if (!validationResult.success) {
    const error = validationResult.error;
    return res.status(400).json({ success: false, message: error.errors[0].message });
  }

  try {
    const product = new productModel(req.body);
    await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
  } catch (err) {
    next(err);
  }
};