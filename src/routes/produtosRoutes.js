import { Router } from 'express';

import ProdutoController from '../controllers/ProdutoController';

const route = Router();

route.post('/', ProdutoController.store);
route.get('/', ProdutoController.index);
route.get('/:id', ProdutoController.show);
route.put('/:id', ProdutoController.update);
route.delete('/:id', ProdutoController.delete);

export default route;
