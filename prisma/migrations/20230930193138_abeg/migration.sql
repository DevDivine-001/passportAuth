/*
  Warnings:

  - You are about to drop the `passportAuth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "passportAuth";

-- CreateTable
CREATE TABLE "crowdAuth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "verify" BOOLEAN NOT NULL DEFAULT false,
    "secretkey" TEXT NOT NULL,
    "profile" JSONB NOT NULL,
    "abeg" JSONB NOT NULL,

    CONSTRAINT "crowdAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crowdAuth_email_key" ON "crowdAuth"("email");
