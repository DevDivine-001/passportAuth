-- CreateTable
CREATE TABLE "passportAuth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "verify" BOOLEAN NOT NULL DEFAULT false,
    "secretkey" TEXT NOT NULL,
    "profile" JSONB NOT NULL,
    "abeg" JSONB NOT NULL,

    CONSTRAINT "passportAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passportAuth_email_key" ON "passportAuth"("email");
