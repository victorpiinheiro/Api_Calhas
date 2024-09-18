import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Pedido {
  async createPedido(data) {
    const createPedido = await prisma.pedidos.create({
      data,
    });
    return createPedido;
  }

  async getClientById(id) {
    const client = await prisma.clientes.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    return client;
  }
}
