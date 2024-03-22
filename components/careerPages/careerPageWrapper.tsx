'use client';
import { api } from '@/trpc/react';
import { Session } from 'next-auth';
import { ProgressBar } from '@/components/ui/progressBar';
import { PeriodsTab } from '@/components/careerPages/careerPeriods/periodsTab';

interface Props {
  career: CareerData;
  session: Session | null;
}

const CareerPageWrapper = ({ career, session }: Props) => {
  let careerData: CareerData | null = null;

  if (session && career) {
    careerData = api.careers.getByIdWithUser.useQuery(
      { id: career.id },
      {
        // TODO: Fix types
        // @ts-ignore
        initialData: career,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 5000,
      }
    ).data;
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
