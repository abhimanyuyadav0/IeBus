import { Router } from 'express';
import {
  createNewBus,
  getAll,
  getById,
  updateById,
  deleteById,
  bookBusSeats,
} from '../../controllers/bus.controller';

const router = Router();

// GET /buses
router.get('/', getAll);

// GET /buses/:id
router.get('/:id', getById);

// POST /buses
router.post('/', createNewBus);

// PATCH /buses/:id
router.patch('/:id', updateById);

// DELETE /buses/:id
router.delete('/:id', deleteById);

// PATCH /buses/:id/book
router.patch('/:id/book', bookBusSeats);

export { router as busRoute };
