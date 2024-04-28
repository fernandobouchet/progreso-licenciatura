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
import { Terms } from "@prisma/client";

interface Props {
  courseProgress?: CourseProgress;
  form: ProgressFormReturn;
}

const terms = [
  { term: "Verano", value: Terms.VERANO },
  { term: "Primer Cuatrimestre", value: Terms.PRIMER_CUATRIMESTRE },
  { term: "Segundo Cuatrimestre", value: Terms.SEGUNDO_CUATRIMESTRE },
];

const ApprovedTermFormField = ({ courseProgress, form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="approvalTerm"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Período</FormLabel>
          <Select
            disabled={form.watch("status") !== "APROBADA"}
            onValueChange={field.onChange}
            defaultValue={
              courseProgress?.approvalTerm
                ? courseProgress.approvalTerm
                : undefined
            }
          >
            <FormControl className="border-none bg-accent hover:bg-accent/80 w-32 lg:w-36">
              <SelectTrigger className="[&>span]:line-clamp-none [&>span]:text-left [&>span]:truncate">
                <SelectValue
                  placeholder={
                    form.watch("status") !== "APROBADA"
                      ? "Aún sin aprobar"
                      : "Aún sin definir"
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-none">
              {terms.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.term}
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

export { ApprovedTermFormField };
