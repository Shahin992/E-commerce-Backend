import { Request, Response, NextFunction } from 'express';
import {productValidationSchema} from '../../../Utils/ErrorValidation'
import productModel from './product.model';
import { CLIENT_RENEG_LIMIT } from 'tls';


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
  const { searchTerm } = req.query;
  let products;

  try {
   if (searchTerm) {
      products = await productModel.find({
        $or: [
          { name: new RegExp(searchTerm as string, 'i') },
          { category: new RegExp(searchTerm as string, 'i') },
          { tags: { $in: [new RegExp(searchTerm as string, 'i')] } }
        ]
      });
      res.status(200).json({ success: true, message: `Products matching search term '${searchTerm}' fetched successfully!`, data: products });
    } else {
      products = await productModel.find();
      res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
    }
  }   catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product fetched successfully!', data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product updated successfully!', data: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted successfully!', data: null });
  } catch (err) {
    next(err);
  }
};