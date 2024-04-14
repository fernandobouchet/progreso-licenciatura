import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressFormReturn } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";

interface Props {
  courseProgress: CourseProgress;
  form: ProgressFormReturn;
}

const StatusSelectFormField = ({ form, courseProgress }: Props) => {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Estado</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={
              courseProgress?.status
                ? courseProgress.status.toString()
                : "PENDIENTE"
            }
          >
            <FormControl className="border-none bg-accent hover:bg-accent/80 w-28 lg:w-36">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-none">
              <SelectItem value="CURSANDO">Cursando</SelectItem>
              <SelectItem value="APROBADA">Aprobada</SelectItem>
              <SelectItem value="PENDIENTE">Pendiente</SelectItem>
              <SelectItem value="REGULARIZADA">Regularizada</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { StatusSelectFormField };
