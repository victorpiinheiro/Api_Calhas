import { Router } from 'express';

import PedidosController from '../controllers/PedidosController';

const route = Router();

route.post('/', PedidosController.store);
route.get('/:id', PedidosController.show);
route.get('/', PedidosController.index);
route.delete('/:id', PedidosController.delete);
route.put('/:id', PedidosController.update);

export default route;
