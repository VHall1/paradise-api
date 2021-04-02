import { Router } from 'express';
import userController from './controllers/userController';
import whitelistController from './controllers/whitelistController';

const routes = Router();

// User
routes.post('/user/create', userController.create);

// Whitelist
routes.post('/whitelist/add', whitelistController.add);

export { routes };
