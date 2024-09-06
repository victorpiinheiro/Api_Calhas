import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class Produto {
  async criaProduto(data) {
    const produtos = await prisma.produto.create({
      data,
    });

    return produtos;
  }

  async FindAllProd() {
    const AllProducts = await prisma.produto.findMany({});
    return AllProducts;
  }

  async findOneProd(id) {
    const idInt = parseInt(id, 10);
    const oneProd = await prisma.produto.findUnique({
      where: {
        id: idInt,
      },
    });

    return oneProd;
  }

  async editProd(id, data) {
    const idInt = parseInt(id, 10);
    const prod = await prisma.produto.update({
      where: {
        id: idInt,
      },
      data,
    });
    return prod;
  }

  async deleteProd(id) {
    const idInt = parseInt(id, 10);
    const prod = await prisma.produto.delete({
      where: {
        id: idInt,
      },
    });
    return prod;
  }
}
