import { CoursePageContainer } from '@/components/coursePages/coursePageContainer';
import { api } from '@/trpc/server';

const AsignaturaPage = async ({ params }: { params: { id: string } }) => {
  const courseId = Number(params.id);
  const course = await api.courses.getById({ id: courseId });

  return <CoursePageContainer course={course} />;
};
export default AsignaturaPage;
