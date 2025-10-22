/*
  Warnings:

  - You are about to drop the column `hashedRefreshToken` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Workspace_hashedRefreshToken_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedRefreshToken" TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "hashedRefreshToken";

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedRefreshToken_key" ON "User"("hashedRefreshToken");
