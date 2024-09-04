import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class FuncionarioModel {
  async criaFuncionario(data) {
    const user = await prisma.funcionarios.create({
      data,
    });
    return user;
  }
}
