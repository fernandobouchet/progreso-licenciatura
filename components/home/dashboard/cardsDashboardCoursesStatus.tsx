interface Props {
  progress: CareerProgress;
}

const CardsDashboardCoursesStatus = ({ progress }: Props) => {
  return (
    <div className="grid gap-4 grid-cols-2 lg:gap-8 lg:grid-cols-4">
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto text-lg lg:text-xl">Aprobadas</h2>
        <span className="text-xl lg:text-2xl font-bold text-success">
          {progress.APROBADA.length}
        </span>
      </div>
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto text-lg lg:text-xl">Cursando</h2>
        <span className="text-xl lg:text-2xl font-bold text-default">
          {progress.CURSANDO.length}
        </span>
      </div>
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto text-lg lg:text-xl">Regularizadas</h2>
        <span className="text-xl lg:text-2xl font-bold text-caution">
          {progress.REGULARIZADA.length}
        </span>
      </div>
      <div className="border-none flex flex-col justify-center gap-2 font-semibold">
        <h2 className="mx-auto text-lg lg:text-xl">Pendientes</h2>
        <span className="text-xl lg:text-2xl font-bold text-muted-foreground">
          {progress.PENDIENTE.length}
        </span>
      </div>
    </div>
  );
};

export { CardsDashboardCoursesStatus };
