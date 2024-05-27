/*
  Warnings:

  - You are about to drop the column `approvalTerm` on the `UserCourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserCourse" DROP COLUMN "approvalTerm";

-- DropEnum
DROP TYPE "Terms";
