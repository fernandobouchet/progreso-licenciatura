import { Chip } from "@/components/ui/chip";
import { capitalizeFirstLetter } from "@/lib/functions";

type Props = {
  progress: CourseProgress[];
};

const CourseStatusChip = ({ progress }: Props) => {
  const normalizedStatus =
    progress?.length && progress[0]?.status
      ? capitalizeFirstLetter(progress[0].status)
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
