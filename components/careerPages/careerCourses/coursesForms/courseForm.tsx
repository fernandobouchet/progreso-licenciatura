import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { DialogClose } from '@radix-ui/react-dialog';
import { FormSchema } from '@/components/careerPages/careerCourses/coursesForms/courseCardForm';
import { UseFormReturn } from 'react-hook-form';
import { QualificationSelectFormField } from '@/components/careerPages/careerCourses/coursesForms/qualificationSelectFormField';
import { StatusSelectFormField } from '@/components/careerPages/careerCourses/coursesForms/statusSelectFormField';
import Link from 'next/link';

interface Props {
  form: UseFormReturn<
    {
      status: keyof typeof CourseStatus;
      qualification: number | null;
    },
    any
  >;
  course: careerDataCourse;
}

const CourseForm = ({ form, course }: Props) => {
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitedData = {
      courseId: course.id,
      status: data.status,
      qualification: data.status === 'APROBADA' ? data.qualification : null,
    };
    console.log(submitedData);
  }

  const currentStatus = course?.progress?.length
    ? course?.progress[0]?.status
    : 'PENDIENTE';
  const currentQualification = course?.progress?.length
    ? course?.progress[0]?.qualification
    : null;

  const currentSelectStatus = form.watch('status');
  const currentSelectQualification = form.watch('qualification');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full space-y-6"
      >
        <div className="flex w-full justify-evenly">
          <QualificationSelectFormField course={course} form={form} />
          <StatusSelectFormField course={course} form={form} />
        </div>
        <div className="flex w-full">
          <Link href={`/asignatura/${course.id}`}>
            <Button>Más info</Button>
          </Link>
          <DialogClose asChild>
            <Button
              variant="default"
              disabled={
                (currentSelectStatus !== 'APROBADA' &&
                  currentSelectStatus === currentStatus) ||
                (currentSelectStatus === 'PENDIENTE' &&
                  currentStatus === undefined) ||
                (currentSelectStatus === 'APROBADA' &&
                  (currentSelectQualification === undefined ||
                    currentSelectQualification === null ||
                    currentSelectQualification === currentQualification))
              }
              type="submit"
              className="ml-auto"
            >
              Guardar
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
export { CourseForm };
