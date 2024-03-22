'use client';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { CourseCard } from '@/components/careerPages/careerCourses/courseCard';
import { CourseCardForm } from '@/components/careerPages/careerCourses/coursesForms/courseCardForm';

interface Props {
  course: CourseData;
  careerId: number;
}

const CourseCardTrigger = ({ course, careerId }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger>
          <CourseCard course={course} />
        </DialogTrigger>
        <CourseCardForm course={course} careerId={careerId} />
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <CourseCard course={course} />
      </DrawerTrigger>
      <CourseCardForm course={course} careerId={careerId} />
    </Drawer>
  );
};

export { CourseCardTrigger };
