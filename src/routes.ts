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

// Character Survival
routes.post('/character/save_coords', characterController.updateCoords);

// Bank
routes.get('/bank/get_wallet/:id', bankController.getWallet);
routes.get('/bank/get_bank/:id', bankController.getBank);

routes.post('/bank/deposit', bankController.deposit);
routes.post('/bank/withdraw', bankController.withdraw);

routes.post('/bank/wallet_transfer', bankController.walletTransfer);
routes.post('/bank/bank_transfer', bankController.bankTransfer);

routes.post('/bank/wallet_pay', bankController.walletPay);
routes.post('/bank/bank_pay', bankController.bankPay);

export { routes };
