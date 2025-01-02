import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';
import { authenticateToken } from '../middlewares/authenticate.js';

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  moviesRouter.get('/', authenticateToken, movieController.getAll);
  moviesRouter.post('/', authenticateToken, movieController.create);

  moviesRouter.get('/:id', movieController.getById);
  moviesRouter.delete('/:id', authenticateToken, movieController.delete);
  moviesRouter.patch('/:id', authenticateToken, movieController.update);

  return moviesRouter;
};
