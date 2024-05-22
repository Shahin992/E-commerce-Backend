import { Request, Response, NextFunction } from 'express';
import {productValidationSchema} from '../../../Utils/ErrorValidation'
import productModel from './product.model';

                        // Add product Controller //
                        
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
 
                      // Validation check with zod //
  const validationResult = productValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      const error = validationResult.error;
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }

  try {
    const product = new productModel(req.body);
    await product.save();       // save product to the database
    res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
  } catch (err) {
    next(err);
  }
};


                                // Gell all Products  controller // 
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { searchTerm } = req.query;  // query for search
  let products;

  try {
   if (searchTerm) {
      products = await productModel.find({
        $or: [
          { name: new RegExp(searchTerm as string, 'i') },  // search by name
          { category: new RegExp(searchTerm as string, 'i') }, // search by category
          { tags: { $in: [new RegExp(searchTerm as string, 'i')] } } // search by tags
        ]
      });
      res.status(200).json({ success: true, message: `Products matching search term '${searchTerm}' fetched successfully!`, data: products });
    } else {
      products = await productModel.find();  // get all data from db
      res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
    }
  }   catch (err) {
    next(err);
  }
};


                                // get product by id controller //

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.findById(req.params.productId); // find product from db by productId
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product fetched successfully!', data: product });
  } catch (err) {
    next(err);
  }
};


                          // update any product field  controller//

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true }); // find by id and update that field come from req.body  and save the new 
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product updated successfully!', data: product });
  } catch (err) {
    next(err);
  }
};

                          // delete any product by id // 

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.productId); // find from db and delete
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted successfully!', data: null });
  } catch (err) {
    next(err);
  }
};