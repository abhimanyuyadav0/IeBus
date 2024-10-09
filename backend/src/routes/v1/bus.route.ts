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

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createNewBus);
router.patch('/:id', updateById);
router.delete('/:id', deleteById);
router.patch('/:id/book', bookBusSeats);

export { router as busRoute };
