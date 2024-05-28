"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CourseForm } from "@/components/careerPages/careerCourses/coursesForms/courseForm";
import { CourseStatus } from "@prisma/client";

type Props = {
  course: CourseData;
  careerId: number;
  handleOpen: () => void;
};

export const FormSchema = z.object({
  status: z.nativeEnum(CourseStatus),
  qualification: z.coerce
    .number()
    .min(4, { message: "La calificación debe ser superior o igual a 4." })
    .max(10, { message: "La calificación debe ser inferior o igual a 10." })
    .nullable(),
  approvalYear: z.coerce
    .number({
      required_error:
        "La fecha aproximada de aprobación de la materia es requerida.",
    })
    .min(2016)
    .nullable(),
});

export type ProgressFormReturn = UseFormReturn<ProgressForm>;

const CourseCardForm = ({ course, careerId, handleOpen }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const currentStatus = course?.progress ? course.progress.status : "PENDIENTE";
  const currentQualification = course?.progress
    ? course.progress.qualification
    : null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: currentStatus,
      qualification: currentQualification,
      approvalYear: null,
    },
  });

  if (isDesktop) {
    return (
      <DialogContent
        onCloseAutoFocus={() => form.reset()}
        onInteractOutside={() => {
          form.reset();
        }}
        asChild={false}
        className="flex flex-col border-none rounded-2xl h-80"
      >
        <DialogHeader>
          <DialogTitle>{course?.name}</DialogTitle>
          <DialogDescription className="py-4">
            Modifica el estado y/o la calificación de la materia.
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          form={form}
          course={course}
          careerId={careerId}
          handleOpen={handleOpen}
        />
      </DialogContent>
    );
  }
  return (
    <DrawerContent
      onCloseAutoFocus={() => form.reset()}
      onInteractOutside={() => {
        form.reset();
      }}
      asChild={false}
      className="border-none p-4 h-[calc(100dvh-45%)]"
    >
      <DrawerHeader className="flex flex-col mt-4 gap-4">
        <DrawerTitle>{course?.name}</DrawerTitle>
        <DrawerDescription>
          Modifica el estado y/o la calificación de la materia.
        </DrawerDescription>
      </DrawerHeader>
      <CourseForm
        form={form}
        course={course}
        careerId={careerId}
        handleOpen={handleOpen}
      />
    </DrawerContent>
  );
};

export { CourseCardForm };
