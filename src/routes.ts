import { Router } from 'express';
import characterController from './controllers/characterController';
import userController from './controllers/userController';
import whitelistController from './controllers/whitelistController';

const routes = Router();

// User
routes.post('/user/create', userController.create);

// Whitelist
routes.post('/whitelist/add', whitelistController.add);
routes.get('/whitelist/status', whitelistController.isWhitelisted);

// Character
routes.post('/character/create', characterController.create);

export { routes };
