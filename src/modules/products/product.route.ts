import { Router } from 'express';
import { createProduct, getProductById, getProducts } from './product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);

export default router;