"use client";

import { api } from "@/trpc/react";
import { getCareerNameById, getCoursesProgress } from "@/lib/functions";
import { CardsDashboardCoursesStatus } from "@/components/home/dashboard/cardsDashboardCoursesStatus";
import { Divider } from "@/components/ui/divider";
import { ProgressBarSimple } from "@/components/ui/progressBarSimple";

interface Props {
  careerId: number;
}

const CardDashboard = ({ careerId }: Props) => {
  const { data } = api.careers.getByIdWithUser.useQuery(
    { id: careerId },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (!data) {
    return;
  }

  const progress: CareerProgress = getCoursesProgress(data);
  const careerName = getCareerNameById(careerId);
  const percentage = (
    (progress.APROBADA.length * 100) /
    progress.TOTAL
  ).toFixed(0);

  return (
    <>
      <section className="flex flex-col items-center w-full p-8 bg-card rounded-lg">
        <h2 className="text-base lg:text-lg font-semibold pb-5">
          {careerName?.title}
        </h2>
        <div className="w-full flex justify-center">
          <CardsDashboardCoursesStatus progress={progress} />
        </div>
        <div className="w-full pt-4 font-semibold text-start text-sm lg:text-base">
          <h2>Progreso:</h2>
          <ProgressBarSimple percentage={percentage} />
        </div>
      </section>
      <div className="mx-auto last:hidden">
        <Divider />
      </div>
    </>
  );
};

export { CardDashboard };
