import { Router } from 'express';
import { AuthenticateController } from '../controllers/authenticate.js';

export const createAuthenticateRouter = ({ authenticateModel }) => {
  const authenticateRouter = Router();

  const authenticateController = new AuthenticateController({
    authenticateModel
  });

  authenticateRouter.post('/', authenticateController.login);

  return authenticateRouter;
};
