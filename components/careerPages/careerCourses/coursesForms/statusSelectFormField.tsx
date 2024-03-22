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
import { UseFormReturn } from 'react-hook-form';

interface Props {
  course: CourseData;
  form: UseFormReturn<
    {
      status: keyof typeof CourseStatus;
      qualification: number | null;
    },
    any
  >;
}

const StatusSelectFormField = ({ form, course }: Props) => {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem className="w-[35%]">
          <FormLabel>Estado</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={
              course?.progress?.length
                ? course?.progress[0]?.status.toString()
                : 'PENDIENTE'
            }
          >
            <FormControl className="border-none bg-accent hover:bg-accent/80">
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
          <FormDescription>Estado de la materia.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { StatusSelectFormField };
