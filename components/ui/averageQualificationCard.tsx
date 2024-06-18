import { getCareerAverageQualification } from "@/lib/functions";
import { Chip } from "@/components/ui/chip";

interface Props {
  courses: CourseData[];
}
const AverageQualificationCard = ({ courses }: Props) => {
  const average = getCareerAverageQualification(courses);

  return (
    <div className="flex justify-center items-center gap-1 text-sm md:text-base">
      <span className="font-semibold">Promedio</span>
      <Chip
        variant="info"
        className="rounded-full py-[0.125rem] px-2 font-bold text-sm md:text-base"
      >
        {average !== "NaN" ? average : "-"}
      </Chip>
    </div>
  );
};
export { AverageQualificationCard };
