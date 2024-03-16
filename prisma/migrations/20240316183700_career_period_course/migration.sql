-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('CURSANDO', 'PENDIENTE', 'REGULARIZADA', 'APROBADA');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Career" (
    "id" INT4 NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" INT4 NOT NULL,
    "order" INT4 NOT NULL,
    "careerID" INT4 NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INT4 NOT NULL,
    "order" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "area" STRING,
    "description" STRING,
    "hsWeekly" INT4,
    "hsTotal" INT4,
    "hasCorrelatives" BOOL NOT NULL DEFAULT false,
    "hasOptatives" BOOL NOT NULL DEFAULT false,
    "hasEquivalents" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "id" STRING NOT NULL,
    "courseId" INT4 NOT NULL,
    "userId" STRING NOT NULL,
    "qualification" INT4,
    "status" "CourseStatus" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCareer" (
    "id" STRING NOT NULL,
    "careerId" INT4 NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "UserCareer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToPeriod" (
    "A" INT4 NOT NULL,
    "B" INT4 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Career_name_key" ON "Career"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Period_order_careerID_key" ON "Period"("order", "careerID");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserCourse_courseId_userId_key" ON "UserCourse"("courseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCareer_careerId_userId_key" ON "UserCareer"("careerId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToPeriod_AB_unique" ON "_CourseToPeriod"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToPeriod_B_index" ON "_CourseToPeriod"("B");

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_careerID_fkey" FOREIGN KEY ("careerID") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCareer" ADD CONSTRAINT "UserCareer_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCareer" ADD CONSTRAINT "UserCareer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToPeriod" ADD CONSTRAINT "_CourseToPeriod_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToPeriod" ADD CONSTRAINT "_CourseToPeriod_B_fkey" FOREIGN KEY ("B") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;
