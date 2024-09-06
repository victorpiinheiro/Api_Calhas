import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import clienteRoutes from './src/routes/clienteRoutes';
import funcionarioRoutes from './src/routes/funcionarioRoutes';
import produtosRoutes from './src/routes/produtosRoutes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/clientes', clienteRoutes);
    this.app.use('/funcionarios', funcionarioRoutes);
    this.app.use('/produtos', produtosRoutes);
  }
}

export default new App().app;
