import { Router } from 'express';
import FuncionarioController from '../controllers/FuncionarioController';

const route = Router();

route.post('/', FuncionarioController.store);
route.get('/', FuncionarioController.index);
route.get('/:id', FuncionarioController.show);
route.put('/:id', FuncionarioController.update);
route.delete('/:id', FuncionarioController.delete);

export default route;
