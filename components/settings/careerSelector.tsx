"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldError } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { api } from "@/trpc/react";

const items = [
  {
    id: "1",
    label: "Licenciatura en informática",
  },
  {
    id: "2",
    label: "Tecnicatura en informática",
  },
  {
    id: "3",
    label: "Tecnicatura en programación",
  },
  {
    id: "4",
    label: "Tecnicatura en redes y operaciones",
  },
  {
    id: "5",
    label: "Tecnicatura en inteligencia artificial",
  },
  {
    id: "6",
    label: "Tecnicatura en videojuegos",
  },
];

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un item.",
  }),
});

interface Props {
  selectorInitialData: { careerId: number }[];
}
const CareerSelector = ({ selectorInitialData }: Props) => {
  const utils = api.useUtils();

  const defaultCareers = items.map((item) => item.id);

  const { data } = api.user.getUserCareers.useQuery(undefined, {
    initialData: selectorInitialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const savedCareers = data.map((item) => item.careerId.toString());

  const userCareers = savedCareers.length >= 1 ? savedCareers : defaultCareers;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: userCareers,
    },
  });

  const updateUserCourse = api.user.updateUserCareers.useMutation({
    onMutate: async (newData) => {
      await utils.user.getUserCareers.cancel();

      const updatedNewData = newData.careerIds.map((item) => ({
        careerId: item,
      }));

      const previousCareersData = utils.user.getUserCareers.getData();

      // @ts-ignore
      utils.user.getUserCareers.setData(undefined, (oldData) => {
        if (!oldData) {
          return null;
        }
        return [...updatedNewData];
      });

      return { previousCareersData };
    },
    onError: (err, _newProgressData, context) => {
      utils.user.getUserCareers.setData(
        undefined,
        context?.previousCareersData
      );
      toast.error(
        "Se ha producido un error al intentar guardar los ajustes. Por favor, inténtelo nuevamente."
      );
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitedData = {
      careerIds: data.items.map(Number),
    };
    updateUserCourse.mutate({ ...submitedData });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Carreras a mostrar</FormLabel>
                <FormDescription>
                  Selecciona las carreras que quieras visualizar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            className="rounded-none"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.control.getFieldState("items").error !== undefined}
          type="submit"
        >
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default CareerSelector;
