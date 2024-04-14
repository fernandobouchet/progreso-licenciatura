/*
  Warnings:

  - You are about to drop the column `approvalMonth` on the `UserCourse` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Terms" AS ENUM ('VERANO', 'PRIMER_CUATRIMESTRE', 'SEGUNDO_CUATRIMESTRE');

-- AlterTable
ALTER TABLE "UserCourse" DROP COLUMN "approvalMonth";
ALTER TABLE "UserCourse" ADD COLUMN     "approvalTerm" "Terms";

-- DropEnum
DROP TYPE "Month";
