'use client';
import { api } from '@/trpc/react';
import { ProgressBar } from '@/components/ui/progressBar';
import { PeriodsTab } from '@/components/careerPages/careerPeriods/periodsTab';

interface Props {
  career: CareerData;
  session: boolean;
}

const CareerPageWrapper = ({ career, session }: Props) => {
  let careerData: CareerData = null;

  if (session && career) {
    const { data } = api.careers.getByIdWithUser.useQuery(
      { id: career.id },
      {
        // TODO: Fix types
        // @ts-ignore
        initialData: career,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      }
    );
    careerData = data;
  } else {
    careerData = career;
  }
  return (
    <>
      <ProgressBar career={careerData} />
      <h2 className="subtitle">
        {careerData?.id === 1 ? 'Año' : 'Cuatrimestre'}
      </h2>
      <PeriodsTab career={careerData} />
    </>
  );
};

export { CareerPageWrapper };
