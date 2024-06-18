import { getCoursesProgress } from "@/lib/functions";
import { Chip } from "@/components/ui/chip";

interface Props {
  career: CareerData;
}

const ProgressBar = ({ career }: Props) => {
  const progress = getCoursesProgress(career);
  return (
    <div className="relative w-full py-4 flex flex-col items-center gap-3 lg:max-w-2xl">
      <div className="overflow-hidden h-5 text-xs flex rounded-full w-full">
        <div
          style={{
            width: `${(
              (progress.APROBADA.length * 100) /
              progress.TOTAL
            ).toFixed(0)}%`,
          }}
          className={`
                shadow-none
                flex flex-col
                text-center whitespace-nowrap
                text-success-foreground
                justify-center
                bg-success
                font-semibold
                w-[${(
                  (progress.APROBADA.length * 100) /
                  progress.TOTAL
                ).toFixed(0)}%]
                `}
        >
          {((progress.APROBADA.length * 100) / progress.TOTAL).toFixed(0)}%
        </div>
        <div
          style={{
            width: `${(
              (progress.CURSANDO.length * 100) /
              progress.TOTAL
            ).toFixed(0)}%`,
          }}
          className={`
          shadow-none
          flex flex-col
          text-center whitespace-nowrap
          text-default-foreground
          justify-center
          font-semibold
          bg-default

          `}
        >
          {((progress.CURSANDO.length * 100) / progress.TOTAL).toFixed(0)}%
        </div>
        <div
          style={{
            width: `${(
              (progress.REGULARIZADA.length * 100) /
              progress.TOTAL
            ).toFixed(0)}%`,
          }}
          className={`
                   shadow-none
                   flex flex-col
                   text-center whitespace-nowrap
                   text-caution-foreground
                   justify-center
                   bg-caution
                   font-semibold

                   w-[${(
                     (progress.REGULARIZADA.length * 100) /
                     progress.TOTAL
                   ).toFixed(0)}%]

                   `}
        >
          {((progress.REGULARIZADA.length * 100) / progress.TOTAL).toFixed(0)}%
        </div>
        <div
          style={{
            width: `${(
              (progress.PENDIENTE.length * 100) /
              progress.TOTAL
            ).toFixed(0)}%`,
          }}
          className={`
          shadow-none
          flex flex-col
          text-center whitespace-nowrap
          text-muted-foreground
          justify-center
          bg-muted
          font-semibold

          w-[${((progress.PENDIENTE.length * 100) / progress.TOTAL).toFixed(
            0
          )}%]
          `}
        >
          {((progress.PENDIENTE.length * 100) / progress.TOTAL).toFixed(0)}%
        </div>
      </div>
      <div className="flex justify-evenly flex-col items-center gap-3 md:gap-0 md:flex-row w-full">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 grow">
            <Chip
              variant="success"
              className="rounded-full py-[0.05rem] px-[0.30rem] w-6 justify-center"
            >
              {progress.APROBADA.length}
            </Chip>
            <span className="text-xs">Aprobadas</span>
          </div>
          <div className="flex items-center gap-1 grow">
            <Chip
              variant="default"
              className="rounded-full py-[0.05rem] px-[0.30rem] w-6 justify-center"
            >
              {progress.CURSANDO.length}
            </Chip>
            <span className="text-xs">Cursando</span>
          </div>
          <div className="flex items-center gap-1 grow">
            <Chip
              variant="caution"
              className="rounded-full py-[0.05rem] px-[0.30rem] w-6 justify-center"
            >
              {progress.REGULARIZADA.length}
            </Chip>
            <span className="text-xs">Regularizadas</span>
          </div>
          <div className="flex items-center gap-1 grow">
            <Chip
              variant="muted"
              className="rounded-full py-[0.05rem] px-[0.30rem] w-6 justify-center"
            >
              {progress.PENDIENTE.length}
            </Chip>
            <span className="text-xs">Pendientes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
