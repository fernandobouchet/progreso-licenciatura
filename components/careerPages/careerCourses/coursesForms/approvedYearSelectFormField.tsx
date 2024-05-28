import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProgressFormReturn } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvaileableSelectYears } from "@/lib/functions";

interface Props {
  courseProgress?: CourseProgress;
  form: ProgressFormReturn;
}

const selectYears = getAvaileableSelectYears();

const ApprovedYearSelectFormField = ({ form, courseProgress }: Props) => {
  return (
    <FormField
      control={form.control}
      name="approvalYear"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Año</FormLabel>
          <Select
            disabled={form.watch("status") !== "APROBADA"}
            onValueChange={field.onChange}
            defaultValue={
              courseProgress?.approvalYear
                ? courseProgress.approvalYear.toString()
                : undefined
            }
          >
            <FormControl className="border-none bg-accent hover:bg-accent/80 [&>span]:mx-auto w-24">
              <SelectTrigger>
                <SelectValue placeholder={"-"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-none max-h-36 min-w-0">
              {selectYears.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ApprovedYearSelectFormField };
