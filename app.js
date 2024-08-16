import dotenv from 'dotenv';
import { resolve } from 'path';
import express from 'express';

dotenv.config();


class App {
  constructor(){
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware(){
this.app.use(express.urlencoded({extended: true}))
this.app.use(express.json());
  }

  routes(){

  }
}

export default new App().app;