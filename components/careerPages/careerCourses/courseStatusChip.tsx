import { Chip } from '@/components/ui/chip';
import { capitalizeFirstLetter } from '@/lib/functions';

type Props = {
  progress?:
    | {
        status: keyof typeof CourseStatus;
        qualification: number | null;
      }[]
    | undefined;
};

const CourseStatusChip = ({ progress }: Props) => {
  const normalizedStatus = progress?.length
    ? capitalizeFirstLetter(progress[0]?.status)
    : 'Pendiente';

  return (
    <Chip
      variant={
        normalizedStatus === 'Cursando'
          ? 'default'
          : normalizedStatus === 'Regularizada'
          ? 'caution'
          : normalizedStatus === 'Aprobada'
          ? 'success'
          : 'muted'
      }
    >
      {normalizedStatus}
    </Chip>
  );
};

export { CourseStatusChip };
