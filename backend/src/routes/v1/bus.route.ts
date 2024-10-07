import { Router } from 'express';
import {
  createNewBus,
  getAll,
  getById,
  updateById,
  deleteById,
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

export { router as busRoute };
