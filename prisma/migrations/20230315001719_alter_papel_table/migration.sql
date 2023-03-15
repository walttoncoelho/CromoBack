/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Papel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Papel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Papel` ADD COLUMN `codigo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Papel_codigo_key` ON `Papel`(`codigo`);
