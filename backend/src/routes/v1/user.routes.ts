import { Router } from 'express';
import {
   deleteById,
   getAll,
   getById,
   loginUser,
   registerUser,
   updateById,
} from '../../controllers/users.controller';
import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
const router = Router();
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', requireFieldsMiddleware(['email', 'password']), registerUser);
router.post('/login', loginUser);
router.patch('/:id', updateById);
router.delete('/:id', deleteById);

export { router as usersRoute };
