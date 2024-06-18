import { getCareerNameById, getCoursesProgress } from "@/lib/functions";
import { CardsDashboardCoursesStatus } from "@/components/home/dashboard/cardsDashboardCoursesStatus";
import { ProgressBarSimple } from "@/components/ui/progressBarSimple";
import { AverageQualificationCard } from "@/components/ui/averageQualificationCard";
import { api } from "@/trpc/server";

interface Props {
  careerId: number;
}

const CardDashboard = async ({ careerId }: Props) => {
  const data = await api.careers.getByIdWithUser({ id: careerId });

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
    <section className="flex flex-col items-center w-full p-8 bg-card rounded-lg max-w-lg">
      <h2 className="text-base lg:text-lg font-semibold pb-5">
        {careerName?.title}
      </h2>
      <div className="w-full flex flex-col justify-center">
        <CardsDashboardCoursesStatus progress={progress} />
        <AverageQualificationCard courses={progress.APROBADA} />
      </div>
      <div className="w-full pt-4 font-semibold text-start text-sm lg:text-base">
        <h2>Progreso:</h2>
        <ProgressBarSimple percentage={percentage} />
      </div>
    </section>
  );
};

export { CardDashboard };
