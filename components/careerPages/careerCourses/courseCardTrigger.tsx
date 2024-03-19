'use client';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { CourseCard } from '@/components/careerPages/careerCourses/courseCard';
import { CourseCardForm } from '@/components/careerPages/careerCourses/coursesForms/courseCardForm';

interface Props {
  course: careerDataCourse;
}

const CourseCardTrigger = ({ course }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger>
          <CourseCard course={course} />
        </DialogTrigger>
        <CourseCardForm course={course} />
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <CourseCard course={course} />
      </DrawerTrigger>
      <CourseCardForm course={course} />
    </Drawer>
  );
};

export { CourseCardTrigger };
