/*
  Warnings:

  - The values [inativo] on the enum `Funcionarios_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `funcionarios` MODIFY `status` ENUM('ativo', 'ferias', 'licenca', 'demitido') NOT NULL DEFAULT 'ativo';
