import userController from './controllers/userController';
import { Router } from 'express';

const routes = Router();

routes.post('/create_user', userController.create);

export { routes };
