import { PeriodsTab } from '@/components/careerPages/periodsTab';
import { Divider } from '@/components/ui/divider';
import { api } from '@/trpc/server';

interface Props {
  careerId: number;
}

const CareerData = async ({ careerId }: Props) => {
  const careerData = await api.careers.getById({ id: careerId });

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
      <h2 className="subtitle">
        {careerData.id === 1 ? 'Año' : 'Cuatrimestre'}
      </h2>
      <PeriodsTab career={careerData} />
    </div>
  );
};

export default CareerData;
