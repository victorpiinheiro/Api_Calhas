import { Router } from 'express';
import userController from '../controllers/UserController';

const route = Router();

route.post('/', userController.store);
route.get('/', userController.index);
route.get('/:id', userController.show);
route.put('/:id', userController.update);
route.delete('/:id', userController.delete);

export default route;
