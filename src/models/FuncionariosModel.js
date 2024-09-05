import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class FuncionarioModel {
  async criaFuncionario(data) {
    const user = await prisma.funcionarios.create({
      data,
    });
    return user;
  }

  async ListaFuncionarios() {
    const users = await prisma.funcionarios.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return users;
  }

  async ListaUmFuncionario(id) {
    const idInt = parseInt(id, 10);
    const user = await prisma.funcionarios.findUnique({
      where: {
        id: idInt,
      },
    });

    return user;
  }

  async editaFuncionaro(id, data) {
    const idInt = parseInt(id, 10);
    const user = await prisma.funcionarios.update({
      where: {
        id: idInt,
      },
      data,
    });
    return user;
  }

  async deleteUser(id) {
    const idInt = parseInt(id, 10);
    const deleteUser = await prisma.funcionarios.delete({
      where: {
        id: idInt,
      },
    });

    return deleteUser;
  }
}
