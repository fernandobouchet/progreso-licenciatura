-- AlterTable
ALTER TABLE "Career" ADD COLUMN     "courseCorrelativesId" STRING;
ALTER TABLE "Career" ADD COLUMN     "courseEquivalentsId" STRING;
ALTER TABLE "Career" ADD COLUMN     "courseOptativesId" STRING;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_courseCorrelativesId_fkey" FOREIGN KEY ("courseCorrelativesId") REFERENCES "CourseCorrelatives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_courseOptativesId_fkey" FOREIGN KEY ("courseOptativesId") REFERENCES "CourseOptatives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_courseEquivalentsId_fkey" FOREIGN KEY ("courseEquivalentsId") REFERENCES "CourseEquivalents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
