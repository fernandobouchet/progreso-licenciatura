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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressFormReturn } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";

interface Props {
  courseProgress?: CourseProgress;
  form: ProgressFormReturn;
}

const QualificationSelectFormField = ({ form, courseProgress }: Props) => {
  return (
    <FormField
      control={form.control}
      name="qualification"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Calificación</FormLabel>
          <Select
            disabled={form.watch("status") !== "APROBADA"}
            onValueChange={field.onChange}
            defaultValue={
              courseProgress?.qualification
                ? courseProgress.qualification.toString()
                : undefined
            }
          >
            <FormControl className="border-none bg-accent hover:bg-accent/80">
              <SelectTrigger className="[&>span]:line-clamp-none [&>span]:text-left [&>span]:truncate w-32">
                <SelectValue
                  placeholder={
                    form.watch("status") !== "APROBADA"
                      ? "Aún sin aprobar"
                      : "Aún sin calificar"
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-none">
              <ScrollArea className="h-[150px] rounded-md">
                {[4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value.toString()}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { QualificationSelectFormField };
