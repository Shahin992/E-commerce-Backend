import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './product.controller';

const router = Router();

router.post('/', createProduct); // Add Product 
router.get('/', getProducts); //  Get All Product
router.get('/:productId', getProductById); // Get Product by id
router.put('/:productId', updateProduct); // update product details
router.delete('/:productId',deleteProduct) // delete product from database

export default router;