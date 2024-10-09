import express from 'express';
import { usersRoute } from './user.routes';
import { orderRoute } from './order.route';
import { busRoute } from './bus.route';
import { locationRoute } from './location.route';

const routes = express.Router();

// Routes
routes.use('/v1/users', usersRoute);
routes.use('/v1/order', orderRoute);
routes.use('/v1/bus', busRoute);
routes.use('/v1/locations', locationRoute);

export default routes;
