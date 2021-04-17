import { Router } from 'express';
import bankController from './controllers/bankController';
import characterController from './controllers/characterController';
import userController from './controllers/userController';

const routes = Router();

// User
routes.get('/user/:steam', userController.read);
routes.post('/user/create', userController.create);

routes.post('/user/set_whitelisted', userController.setWhitelisted);
routes.post('/user/set_banned', userController.setBanned);
routes.post('/user/set_priority', userController.setPriority);

// Character
routes.get('/character/list/:steam', characterController.listCharacters);

routes.post('/character/create', characterController.create);
routes.post('/character/delete', characterController.delete);

// Character Custom
routes.get('/character/custom/:id', characterController.getCustom);

routes.post(
  '/character/custom/update_custom',
  characterController.updateCustom
);
routes.post('/character/custom/update_model', characterController.updateModel);

// Character Survival
// routes.post('/character/save_coords', characterController.updateCoords);

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
