-- CreateEnum
CREATE TYPE "Month" AS ENUM ('ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE');

-- AlterTable
ALTER TABLE "UserCourse" ADD COLUMN     "approvalMonth" "Month";
ALTER TABLE "UserCourse" ADD COLUMN     "approvalYear" INT4;
