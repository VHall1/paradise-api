import { Router } from 'express';
import bankController from './controllers/bankController';
import characterController from './controllers/characterController';
import userController from './controllers/userController';

const routes = Router();

// User
routes.post('/user/create', userController.create);
routes.get('/user/read', userController.read);
routes.post('/user/update', userController.update);

// Character
routes.post('/character/create', characterController.create);
routes.get('/character/list', characterController.list);
routes.post('/character/delete', characterController.delete);

// Bank
routes.get('/bank/read', bankController.read);
routes.post('/bank/update', bankController.update);

export { routes };
