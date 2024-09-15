import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Servicos {
  async criaServico(data) {
    const criaSerrvico = await prisma.servico.create({
      data,
    });

    return criaSerrvico;
  }
}
