import express, { json } from 'express';
import { createMovieRouter } from './routes/movies.js';
import { createAuthenticateRouter } from './routes/authenticate.js';
import { corsMiddleware } from './middlewares/cors.js';

//import { MovieModel as MovieModelMongo } from './models/movies/mongodb/movies.js'
import { MovieModel as MovieModelMock } from './models/movies/local-file-system/movies.js'

import { AuthenticateModel as AuthenticateModelJWT } from './models/authenticate/JWT/authenticate.js';

import dotenv from 'dotenv';
dotenv.config();

export const createApp = ({ movieModel, authenticateModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  app.use('/movies', createMovieRouter({ movieModel }));
  app.use('/login', createAuthenticateRouter({ authenticateModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};

createApp({
  movieModel: MovieModelMock,
  authenticateModel: AuthenticateModelJWT
});
