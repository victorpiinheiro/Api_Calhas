import { Router } from 'express';
import FuncionarioController from '../controllers/FuncionarioController';

const route = Router();

route.post('/', FuncionarioController.store);

export default route;
