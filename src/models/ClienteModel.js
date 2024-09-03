import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Cliente {
  async criaCliente(data) {
    const createUser = await prisma.clientes.create({
      data,
    });

    return createUser;
  }

  async getCliente() {
    const allUsers = await prisma.clientes.findMany({});
    return allUsers;
  }

  async getOneCliente(id) {
    const idInt = parseInt(id, 10);
    const oneCliente = await prisma.clientes.findUnique({
      where: { id: idInt },
    });
    return oneCliente;
  }

  async updateUser(id, data) {
    const idInt = parseInt(id, 10);
    const user = await prisma.clientes.update({
      where: { id: idInt },
      data,
    });

    return user;
  }

  async deleteUser(id) {
    const idInt = parseInt(id, 10);
    const deleteUser = await prisma.clientes.delete({
      where: { id: idInt },
    });

    return deleteUser;
  }
}
