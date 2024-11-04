import { Router } from 'express';
import userController from '../controllers/UserController';

import loginrequired from '../middlewares/loginrequired';

const route = Router();

route.post('/', userController.store);
route.get('/', loginrequired, userController.index);
route.get('/:id', loginrequired, userController.show);
route.put('/:id', userController.update);
route.delete('/:id', userController.delete);

export default route;
