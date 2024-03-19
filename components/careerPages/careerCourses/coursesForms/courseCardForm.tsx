'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CourseForm } from '@/components/careerPages/careerCourses/coursesForms/courseForm';
import { CourseStatus } from '@prisma/client';

type Props = {
  course: careerDataCourse;
};

export const FormSchema = z.object({
  status: z.nativeEnum(CourseStatus),
  qualification: z.coerce.number().min(0).max(10).nullable(),
});

const CourseCardForm = ({ course }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const currentStatus = course?.progress?.length
    ? course?.progress[0]?.status
    : 'PENDIENTE';
  const currentQualification = course?.progress?.length
    ? course?.progress[0]?.qualification
    : null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: currentStatus,
      qualification: currentQualification,
    },
  });

  if (isDesktop) {
    return (
      <DialogContent
        onCloseAutoFocus={() =>
          form.reset({
            status: currentStatus,
            qualification: currentQualification,
          })
        }
        onInteractOutside={() => {
          form.reset({
            status: currentStatus,
            qualification: currentQualification,
          });
        }}
        asChild={false}
        className="max-w-[calc(100dvw-1rem)] sm:max-w-[40rem] border-none rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle>{course?.name}</DialogTitle>
          <DialogDescription>
            Modifica el estado y/o la calificación de la materia.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <CourseForm form={form} course={course} />
        </div>
      </DialogContent>
    );
  }
  return (
    <DrawerContent
      onCloseAutoFocus={() =>
        form.reset({
          status: currentStatus,
          qualification: currentQualification,
        })
      }
      onInteractOutside={() => {
        form.reset({
          status: currentStatus,
          qualification: currentQualification,
        });
      }}
      asChild={false}
      className="border-none p-4 h-[calc(100dvh-40%)]"
    >
      <DrawerHeader>
        <DrawerTitle className="mt-4">{course?.name}</DrawerTitle>
        <DrawerDescription>
          Modifica el estado y/o la calificación de la materia.
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex py-4">
        <CourseForm form={form} course={course} />
      </div>
    </DrawerContent>
  );
};

export { CourseCardForm };
