import { Router } from 'express';
import characterController from './controllers/characterController';
import userController from './controllers/userController';

const routes = Router();

// User
routes.get('/user/get', userController.get);
routes.post('/user/create', userController.create);
// Banned
routes.post('/user/banned/set', userController.updateBanned);
// Whitelist
routes.post('/user/whitelisted/set', userController.updateWhitelisted);

// Character
routes.post('/character/create', characterController.create);
routes.post('/character/delete', characterController.delete);
routes.get('/character/list', characterController.list);

export { routes };
