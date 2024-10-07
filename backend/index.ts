import cors from 'cors';
import express, { Application } from 'express';
import connectDB from './src/config/db';
import { errorHandler } from './src/middlewares/errorHandler';
import { notFoundHandler } from './src/middlewares/notFoundHandler';
import routes from './src/routes/v1/index';
import 'dotenv/config';

connectDB();

const app: Application = express();
const port = process.env.PORT || 5001;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port as number, '0.0.0.0', () =>
  console.log(`Server is started on port ${port}`),
);
