-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT DEFAULT 'default.png',
    "verified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userpreferences" (
    "id" TEXT NOT NULL,
    "emailUpdates" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "preference" TEXT NOT NULL,

    CONSTRAINT "userpreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userpreferences_userId_key" ON "userpreferences"("userId");

-- AddForeignKey
ALTER TABLE "userpreferences" ADD CONSTRAINT "userpreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
