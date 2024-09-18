import { Router } from 'express';

import PedidosController from '../controllers/PedidosController';

const route = Router();

route.post('/', PedidosController.store);

export default route;
