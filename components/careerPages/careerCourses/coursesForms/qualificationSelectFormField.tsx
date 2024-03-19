import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  course: careerDataCourse;
  form: UseFormReturn<
    {
      status: keyof typeof CourseStatus;
      qualification: number | null;
    },
    any
  >;
}

const QualificationSelectFormField = ({ form, course }: Props) => {
  return (
    <FormField
      control={form.control}
      name="qualification"
      render={({ field }) => (
        <FormItem className="w-[35%]">
          <FormLabel>Calificación</FormLabel>
          <Select
            disabled={form.watch('status') !== 'APROBADA'}
            onValueChange={field.onChange}
            defaultValue={
              course?.progress?.length
                ? course?.progress[0]?.qualification?.toString()
                : undefined
            }
          >
            <FormControl className="border-none bg-accent hover:bg-accent/80">
              <SelectTrigger>
                <SelectValue placeholder="Aún sin calificar" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-none">
              <ScrollArea className="h-[200px] w-auto rounded-md pr-3">
                {[4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value.toString()}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormDescription>Calificación de la materia.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { QualificationSelectFormField };
