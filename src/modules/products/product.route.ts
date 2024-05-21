import { Router } from 'express';
import { createProduct, getProductById, getProducts, updateProduct } from './product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);

export default router;