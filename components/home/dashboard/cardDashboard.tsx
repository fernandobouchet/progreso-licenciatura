"use client";

import { api } from "@/trpc/react";
import { getCareerNameById, getCoursesProgress } from "@/lib/functions";
import { CardsDashboardCoursesStatus } from "@/components/home/dashboard/cardsDashboardCoursesStatus";
import { Divider } from "@/components/ui/divider";

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
  const progress = getCoursesProgress(data);
  const careerName = getCareerNameById(careerId);

  return (
    <>
      <section className="flex flex-col justify-center w-full py-5">
        <h2 className="text-xl lg:text-2xl font-bold pb-5">
          {careerName?.title}
        </h2>
        <CardsDashboardCoursesStatus progress={progress} />
      </section>
      <div className="last:hidden">
        <Divider />
      </div>
    </>
  );
};

export { CardDashboard };
