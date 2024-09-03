import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import clienteRoutes from './src/routes/clienteRoutes';

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
  }
}

export default new App().app;
