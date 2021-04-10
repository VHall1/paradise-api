import { Router } from 'express';
import characterController from './controllers/characterController';
import userController from './controllers/userController';

const routes = Router();

// User
routes.post('/user/create', userController.create);
routes.get('/user/read', userController.read);
routes.post('/user/update', userController.update);

// Character
routes.post('/character/create', characterController.create);
routes.post('/character/delete', characterController.delete);
routes.get('/character/list', characterController.list);

export { routes };
