import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import moviesRoute from './routes/api/moviesRoute';
import { notFound } from './utils';
import database from './config/database';
import config from './config/configs';

// This is represent our express application.
const app = express();
const port = config.app.port;

app.use(bodyParser.json());

// logging to console on development mode!
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routers, you can find it into routes/api
// You can add more routes here, for example /api/books
app.use('/api/movies', moviesRoute);
app.all('*', (req: Request, res: Response) => notFound(res));

// Starting mongodb
database();

app.listen(port, () => console.log('listening on port: ' + port));
