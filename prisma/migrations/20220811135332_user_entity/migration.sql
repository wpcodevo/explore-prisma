/*
  Warnings:

  - You are about to drop the column `userId` on the `userpreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPreferenceId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "userpreferences" DROP CONSTRAINT "userpreferences_userId_fkey";

-- DropIndex
DROP INDEX "userpreferences_userId_key";

-- AlterTable
ALTER TABLE "userpreferences" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userPreferenceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_userPreferenceId_key" ON "users"("userPreferenceId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userPreferenceId_fkey" FOREIGN KEY ("userPreferenceId") REFERENCES "userpreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
