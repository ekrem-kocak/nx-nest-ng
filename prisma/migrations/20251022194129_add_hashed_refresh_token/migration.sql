/*
  Warnings:

  - A unique constraint covering the columns `[hashedRefreshToken]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "hashedRefreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_hashedRefreshToken_key" ON "Workspace"("hashedRefreshToken");
