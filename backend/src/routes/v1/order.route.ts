import { Router } from 'express';
import {
  createNewOrder,
  getOrderByUserId,
  deleteOrderById,
} from '../../controllers/order.controller';

const router = Router();

router.get('/:id', getOrderByUserId);
router.post('/', createNewOrder);
router.delete('/:id', deleteOrderById);

export { router as orderRoute };
