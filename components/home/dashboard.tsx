import { api } from "@/trpc/server";
import { CardDashboard } from "@/components/home/dashboard/cardDashboard";

const Dashboard = async () => {
  const careers = await api.user.getUserCareers();

  return (
    <>
      <p className="w-full text-start pt-5 text-base lg:text-lg">
        {careers.length >= 2
          ? "Carreras seleccionadas"
          : "Carrera seleccionada"}{" "}
        y estadísticas:
      </p>
      {careers.map((career) => (
        <CardDashboard key={career.careerId} careerId={career.careerId} />
      ))}
    </>
  );
};

export { Dashboard };
