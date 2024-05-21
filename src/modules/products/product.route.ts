import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId',deleteProduct)

export default router;