import { Router } from 'express';
import {
  createNewOrder,
  getAll,
  getById,
  updateById,
  deleteById,
} from '../../controllers/order.controller';

const router = Router();

// GET /orders
router.get('/', getAll);

// GET /orders/:id
router.get('/:id', getById);

// POST /orders
router.post('/', createNewOrder);

// PATCH /orders/:id
router.patch('/:id', updateById);

// DELETE /orders/:id
router.delete('/:id', deleteById);

export { router as ordersRoute };
