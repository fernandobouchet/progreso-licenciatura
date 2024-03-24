import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormSchema } from '@/components/careerPages/careerCourses/coursesForms/courseCardForm';
import { UseFormReturn } from 'react-hook-form';
import { QualificationSelectFormField } from '@/components/careerPages/careerCourses/coursesForms/qualificationSelectFormField';
import { StatusSelectFormField } from '@/components/careerPages/careerCourses/coursesForms/statusSelectFormField';
import Link from 'next/link';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { CourseSaveButton } from '@/components/careerPages/careerCourses/coursesForms/courseSaveButton';

interface Props {
  form: UseFormReturn<
    {
      status: keyof typeof CourseStatus;
      qualification: number | null;
    },
    any
  >;
  course: CourseData;
  careerId: number;
}

const CourseForm = ({ form, course, careerId }: Props) => {
  const utils = api.useUtils();

  const updateUserCourse = api.user.updateUserCourse.useMutation({
    onMutate: async (newProgressData) => {
      await utils.careers.getByIdWithUser.cancel({ id: careerId });

      const previousCareerData = utils.careers.getByIdWithUser.getData({
        id: careerId,
      });

      const progressData = {
        status: newProgressData.status,
        qualification: newProgressData.qualification,
      };
      // TODO: Fix types
      // @ts-ignore
      utils.careers.getByIdWithUser.setData({ id: careerId }, (oldData) => {
        if (!oldData) {
          return null;
        }
        const updatedPeriods = oldData.periods.map((cachedPeriod) => ({
          ...cachedPeriod,
          courses: cachedPeriod.courses.map((cachedCourse) =>
            cachedCourse.id === newProgressData.courseId
              ? { ...cachedCourse, progress: [progressData] }
              : cachedCourse
          ),
        }));
        return { ...oldData, periods: updatedPeriods };
      });
      return { previousCareerData };
    },
    onError: (err, _newProgressData, context) => {
      utils.careers.getByIdWithUser.setData(
        { id: careerId },
        context?.previousCareerData
      );
      toast.error(
        `Se ha producido un error al intentar modificar la asignatura ${course.name}. Por favor, inténtelo nuevamente.`
      );
      console.log(err);
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitedData = {
      courseId: course.id,
      status: data.status,
      qualification: data.status === 'APROBADA' ? data.qualification : null,
    };
    updateUserCourse.mutate({ ...submitedData });
  }

  const currentStatus = course?.progress?.length
    ? course?.progress[0]?.status
    : 'PENDIENTE';
  const currentQualification = course?.progress?.length
    ? course?.progress[0]?.qualification
    : null;

  const currentSelectStatus = form.watch('status');
  const currentSelectQualification = form.watch('qualification');
  const disableSendButton =
    (currentSelectStatus !== 'APROBADA' &&
      currentSelectStatus === currentStatus) ||
    (currentSelectStatus === 'PENDIENTE' && currentStatus === undefined) ||
    (currentSelectStatus === 'APROBADA' &&
      (currentSelectQualification === undefined ||
        currentSelectQualification === null ||
        currentSelectQualification === currentQualification));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full space-y-6"
      >
        <div className="flex w-full justify-evenly">
          <StatusSelectFormField course={course} form={form} />
          <QualificationSelectFormField course={course} form={form} />
        </div>
        <div className="flex w-full">
          <Link href={`/asignatura/${course.id}`}>
            <Button>Más info</Button>
          </Link>
          <CourseSaveButton disableSendButton={disableSendButton} />
        </div>
      </form>
    </Form>
  );
};
export { CourseForm };
