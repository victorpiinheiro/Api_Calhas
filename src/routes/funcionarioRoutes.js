import { Router } from 'express';
import FuncionarioController from '../controllers/FuncionarioController';

const route = Router();

route.post('/cadastrar', FuncionarioController.store);
route.get('/', FuncionarioController.index);
route.get('/:id', FuncionarioController.show);
route.put('/edit/:id', FuncionarioController.update);
route.delete('/:id', FuncionarioController.delete);

export default route;
