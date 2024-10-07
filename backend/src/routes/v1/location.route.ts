import { Router } from 'express';
import { fetchLocations, addLocation } from '../../controllers/location.controller';

const router = Router();

// GET /locations
router.get('/', fetchLocations);

// POST /locations (optional: if you want to allow adding new locations)
router.post('/', addLocation);

export { router as locationRoute };
