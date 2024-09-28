import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Pedido {
  async createPedido(data) {
    const createPedido = await prisma.pedidos.create({
      data,
    });
    return createPedido;
  }

  async getPedidoById(id) {
    const pedido = await prisma.pedidos.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    return pedido;
  }

  async getAllPedidos() {
    const pedidos = await prisma.pedidos.findMany({});
    return pedidos;
  }

  async deletePedidoByid(id) {
    const deletePedido = await prisma.pedidos.deleteMany({
      where: {
        id: parseInt(id, 10),
      },
    });

    return deletePedido;
  }

  async updateOrders(id, data) {
    const editaPedido = await prisma.pedidos.update({
      where: {
        id: parseInt(id, 10),
      },
      data,
    });

    return editaPedido;
  }
}
