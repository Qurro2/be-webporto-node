/*
  Warnings:

  - You are about to drop the column `createdAt` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
