/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Clientes_cpf_key` ON `Clientes`(`cpf`);
