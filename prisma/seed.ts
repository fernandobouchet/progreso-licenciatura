import { Prisma } from '@prisma/client';
import { careersData } from './seed-data/careers';
import { coursesData } from './seed-data/courses';
import { db } from '../lib/db';

const prisma = db;

const courses: Prisma.CourseCreateInput[] = coursesData;
const careers: Prisma.CareerCreateInput[] = careersData;

async function main() {
  console.log(`Deleting previous data ...`);
  await db.career.deleteMany();
  await db.course.deleteMany();
  console.log(`Start seeding ...`);
  for (const careerData of careers) {
    const career = await prisma.career.create({
      data: careerData,
    });
    console.log(`Created career with id: ${career.id}`);
  }
  for (const CourseData of courses) {
    const course = await prisma.course.create({
      data: CourseData,
    });
    console.log(`Created course with id: ${course.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
