import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class User {
  async createUser(data) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async listAllUsers() {
    const users = await prisma.user.findMany({});
    return users;
  }

  async UpdateUser(id, data) {
    const editUser = await prisma.user.update({
      where: {
        id: parseInt(id, 10),
      },
      data,
    });
    return editUser;
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    return user;
  }

  async deleteUser(id) {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    return deleteUser;
  }

  async verifyUser(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
