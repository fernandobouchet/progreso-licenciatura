import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProgressFormReturn } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";

interface Props {
  courseProgress?: CourseProgress;
  form: ProgressFormReturn;
}

const ApprovedYearInputForm = ({ form, courseProgress }: Props) => {
  return (
    <FormField
      control={form.control}
      name="approvalYear"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Año</FormLabel>
          <FormControl>
            <Input
              disabled={form.watch("status") !== "APROBADA"}
              onChange={field.onChange}
              className="w-24 text-center border-none bg-accent text-accent-foreground"
              type="number"
              inputMode="numeric"
              min={2016}
              max={2066}
              defaultValue={
                courseProgress?.approvalYear
                  ? courseProgress.approvalYear
                  : undefined
              }
              placeholder={
                form.watch("status") !== "APROBADA"
                  ? "Aún sin aprobar"
                  : "Aún sin definir"
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ApprovedYearInputForm };
