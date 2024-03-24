/*
  Warnings:

  - You are about to drop the column `hasCorrelatives` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `hasEquivalents` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `hasOptatives` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "hasCorrelatives";
ALTER TABLE "Course" DROP COLUMN "hasEquivalents";
ALTER TABLE "Course" DROP COLUMN "hasOptatives";

-- CreateTable
CREATE TABLE "CourseCorrelatives" (
    "id" STRING NOT NULL,
    "courseId" INT4 NOT NULL,

    CONSTRAINT "CourseCorrelatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOptatives" (
    "id" STRING NOT NULL,
    "courseId" INT4 NOT NULL,

    CONSTRAINT "CourseOptatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEquivalents" (
    "id" STRING NOT NULL,
    "courseId" INT4 NOT NULL,

    CONSTRAINT "CourseEquivalents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseCorrelatives_courseId_key" ON "CourseCorrelatives"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseOptatives_courseId_key" ON "CourseOptatives"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseEquivalents_courseId_key" ON "CourseEquivalents"("courseId");

-- AddForeignKey
ALTER TABLE "CourseCorrelatives" ADD CONSTRAINT "CourseCorrelatives_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOptatives" ADD CONSTRAINT "CourseOptatives_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEquivalents" ADD CONSTRAINT "CourseEquivalents_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
