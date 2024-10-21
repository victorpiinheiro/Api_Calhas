/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Funcionarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `funcionarios` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `data_demissao` DATETIME(3) NULL,
    ADD COLUMN `data_nascimento` DATETIME(3) NULL,
    ADD COLUMN `departamento` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `observacoes` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';

-- CreateIndex
CREATE UNIQUE INDEX `Funcionarios_email_key` ON `Funcionarios`(`email`);
