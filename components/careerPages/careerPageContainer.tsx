import { Divider } from '@/components/ui/divider';
import { getServerAuthSession } from '@/lib/auth';
import { api } from '@/trpc/server';
import { CareerPageWrapper } from './careerPageWrapper';

interface Props {
  careerId: number;
}

const CareerPageContainer = async ({ careerId }: Props) => {
  const session = await getServerAuthSession();
  let careerData: CareerData | null = null;

  if (session) {
    careerData = await api.careers.getByIdWithUser({ id: careerId });
  } else {
    careerData = await api.careers.getById({ id: careerId });
  }

  if (!careerData) {
    return (
      <h2 className="mt-10">
        Hubo un error al obtener la información. Por favor, inténtelo
        nuevamente.
      </h2>
    );
  }

  if (careerData.periods.length <= 0) {
    return (
      <h2 className="mt-10">
        No se encontraron datos para la carrera seleccionada.
      </h2>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Divider />
      <CareerPageWrapper career={careerData} session={session} />
    </div>
  );
};

export { CareerPageContainer };
