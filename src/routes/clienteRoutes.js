import { Router } from 'express';
import clienteController from '../controllers/ClienteController';

const route = Router();

route.post('/', clienteController.store);
route.get('/', clienteController.index);
route.get('/:id', clienteController.show);
route.put('/:id', clienteController.update);
route.delete('/:id', clienteController.delete);

export default route;
