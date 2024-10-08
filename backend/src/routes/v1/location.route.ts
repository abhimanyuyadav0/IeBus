import { Router } from 'express';
import { fetchLocations, addLocation } from '../../controllers/location.controller';

const router = Router();

router.get('/', fetchLocations);
router.post('/', addLocation);

export { router as locationRoute };
