import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import clienteRoutes from './src/routes/clienteRoutes';
import funcionarioRoutes from './src/routes/funcionarioRoutes';
import produtosRoutes from './src/routes/produtosRoutes';
import userRoutes from './src/routes/UserRoutes';

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
  }
}

export default new App().app;
