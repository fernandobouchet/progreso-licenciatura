import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseStatusChip } from '@/components/careerPages/courseStatusChip';

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  return (
    <Card className="flex flex-col justify-between h-24 w-full hover:bg-accent hover:text-foreground transition duration-200 p-3 rounded-2xl border-none cursor-pointer">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium">{course.name}</CardTitle>
      </CardHeader>
      <CardFooter className="p-0 justify-end text-sm">
        <CourseStatusChip progress={course?.progress} />
      </CardFooter>
    </Card>
  );
};

export { CourseCard };
