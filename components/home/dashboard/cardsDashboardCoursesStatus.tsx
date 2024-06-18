interface Props {
  progress: CareerProgress;
}

const CardsDashboardCoursesStatus = ({ progress }: Props) => {
  return (
    <div className="w-full grid gap-2 grid-cols-2 text-sm md:text-base">
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto">Aprobadas</h2>
        <span className="font-bold text-success">
          {progress.APROBADA.length}
        </span>
      </div>
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto">Cursando</h2>
        <span className="font-bold text-default">
          {progress.CURSANDO.length}
        </span>
      </div>
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto">Regularizadas</h2>
        <span className="font-bold text-caution">
          {progress.REGULARIZADA.length}
        </span>
      </div>
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto">Pendientes</h2>
        <span className="font-bold text-muted-foreground">
          {progress.PENDIENTE.length}
        </span>
      </div>
    </div>
  );
};

export { CardsDashboardCoursesStatus };
