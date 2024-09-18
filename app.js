import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import clienteRoutes from './src/routes/clienteRoutes';
import funcionarioRoutes from './src/routes/funcionarioRoutes';
import produtosRoutes from './src/routes/produtosRoutes';
import userRoutes from './src/routes/UserRoutes';
import pedidoRoutes from './src/routes/pedidoRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/clientes', clienteRoutes);
    this.app.use('/funcionarios', funcionarioRoutes);
    this.app.use('/produtos', produtosRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/orders', pedidoRoutes);
    this.app.use('/tokens', tokenRoutes);
  }
}

export default new App().app;
