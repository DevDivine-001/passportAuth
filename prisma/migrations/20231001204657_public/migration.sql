/*
  Warnings:

  - You are about to drop the column `abeg` on the `passportAuth` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `passportAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "passportAuth" DROP COLUMN "abeg",
DROP COLUMN "profile";
