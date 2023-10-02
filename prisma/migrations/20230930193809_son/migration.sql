/*
  Warnings:

  - You are about to drop the column `secretkey` on the `crowdAuth` table. All the data in the column will be lost.
  - Added the required column `secretKey` to the `crowdAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crowdAuth" DROP COLUMN "secretkey",
ADD COLUMN     "secretKey" TEXT NOT NULL;
