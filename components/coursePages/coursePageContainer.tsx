import { Divider } from '@/components/ui/divider';
import BackButton from '@/components/coursePages/backButton';

interface Props {
  course: CourseData | null;
}

const CoursePageContainer = ({ course }: Props) => {
  if (!course) {
    return (
      <h2 className="mt-10">
        No se encontró información sobre la asignatura solicitada.
      </h2>
    );
  }

  return (
    <>
      <h1 className="title">{course.name}</h1>
      <Divider />
      <div className="flex flex-col items-center w-full h-screen">
        <div>
          <p>{course.area}</p>
        </div>
        <div className="mt-auto">
          <BackButton />
        </div>
      </div>
    </>
  );
};
export { CoursePageContainer };
