import { Router } from 'express';
import { createOrder, getOrders } from './order.controller';

const router = Router();

router.post('/', createOrder); // create order route
router.get('/', getOrders); // gel all orders


export default router;