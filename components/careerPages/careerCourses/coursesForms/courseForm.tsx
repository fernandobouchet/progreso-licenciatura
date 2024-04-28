import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FormSchema } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";
import { ProgressFormReturn } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";
import { QualificationSelectFormField } from "@/components/careerPages/careerCourses/coursesForms/qualificationSelectFormField";
import { StatusSelectFormField } from "@/components/careerPages/careerCourses/coursesForms/statusSelectFormField";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { CourseSaveButton } from "@/components/careerPages/careerCourses/coursesForms/courseSaveButton";
import { LinkButton } from "@/components/ui/linkButton";
import { ApprovedTermFormField } from "@/components/careerPages/careerCourses/coursesForms/approvedTermFormField";
import { ApprovedYearInputForm } from "@/components/careerPages/careerCourses/coursesForms/approvedYearInputForm";

interface Props {
  form: ProgressFormReturn;
  course: CourseData;
  careerId: number;
  handleOpen: () => void;
}

const CourseForm = ({ form, course, careerId, handleOpen }: Props) => {
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
        approvalTerm: newProgressData.approvalTerm,
        approvalYear: newProgressData.approvalYear,
      };
      // TODO: Fix types
      // @ts-ignore
      utils.careers.getByIdWithUser.setData({ id: careerId }, (oldData) => {
        if (!oldData) {
          return null;
        }
        const updatedPeriods = oldData.periods.map(
          (cachedPeriod: PeriodData) => ({
            ...cachedPeriod,
            courses: cachedPeriod.courses.map((cachedCourse) =>
              cachedCourse.id === newProgressData.courseId
                ? { ...cachedCourse, progress: [progressData] }
                : cachedCourse
            ),
          })
        );
        return { ...oldData, periods: updatedPeriods };
      });
      return { previousCareerData };
    },
    onSuccess: () => {
      utils.careers.getByIdWithUser.refetch();
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
      qualification: data.status === "APROBADA" ? data.qualification : null,
      approvalTerm: data.approvalTerm ? data.approvalTerm : null,
      approvalYear: data.approvalYear ? data.approvalYear : null,
    };
    handleOpen();
    updateUserCourse.mutate({
      ...submitedData,
    });
  }

  const currentStatus = course?.progress;
  const currentSelectStatus = form.watch("status");
  const currentSelectQualification = form.watch("qualification");
  const currentSelectTerm = form.watch("approvalTerm");
  const currentInputYear = form.watch("approvalYear");

  const disableSendButton =
    currentSelectStatus === "APROBADA"
      ? (!currentSelectQualification ||
          Number(currentSelectQualification) ===
            currentStatus?.qualification) &&
        (!currentSelectTerm ||
          currentSelectTerm === undefined ||
          currentSelectTerm === currentStatus?.approvalTerm) &&
        (!currentInputYear ||
          currentInputYear === undefined ||
          currentInputYear === currentStatus?.approvalYear)
      : currentSelectStatus === currentStatus?.status ||
        currentStatus === undefined;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-around items-center h-full w-full lg:gap-8"
      >
        <div className="flex flex-col gap-5 justify-around w-full">
          <div className="grid grid-cols-2 gap-4 gap-x-14 lg:gap-x-24 mx-auto py-4">
            <StatusSelectFormField
              courseProgress={course?.progress}
              form={form}
            />
            <QualificationSelectFormField
              courseProgress={course?.progress}
              form={form}
            />
            <ApprovedTermFormField
              courseProgress={course?.progress}
              form={form}
            />
            <ApprovedYearInputForm
              courseProgress={course?.progress}
              form={form}
            />
          </div>
        </div>
        <div className="flex w-full">
          <LinkButton href={course.infoUrl}>Más info</LinkButton>
          <CourseSaveButton disableSendButton={disableSendButton} />
        </div>
      </form>
    </Form>
  );
};
export { CourseForm };
