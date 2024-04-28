import { Chip } from "@/components/ui/chip";
import { capitalizeFirstLetter } from "@/lib/functions";

type Props = {
  progress?: CourseProgress;
};

const CourseStatusChip = ({ progress }: Props) => {
  const normalizedStatus = progress?.status
    ? capitalizeFirstLetter(progress.status)
    : "Pendiente";

  return (
    <Chip
      variant={
        normalizedStatus === "Cursando"
          ? "default"
          : normalizedStatus === "Regularizada"
          ? "caution"
          : normalizedStatus === "Aprobada"
          ? "success"
          : "muted"
      }
    >
      {normalizedStatus}
    </Chip>
  );
};

export { CourseStatusChip };
