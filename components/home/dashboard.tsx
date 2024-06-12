import { api } from "@/trpc/server";
import { CardDashboard } from "@/components/home/dashboard/cardDashboard";
import { getServerAuthSession } from "@/lib/auth";

const Dashboard = async () => {
  const careers = await api.user.getUserCareers();
  const session = await getServerAuthSession();

  return (
    <>
      <div className="w-full text-start pt-5 text-base lg:text-lg">
        <p>Bienvenido, {session?.user.name}!</p>
        <p>
          Actualmente estas registrado en {careers.length}{" "}
          {careers.length > 1 ? "carreras" : "carrera"}:
        </p>
      </div>
      {careers.map((career) => (
        <CardDashboard key={career.careerId} careerId={career.careerId} />
      ))}
    </>
  );
};

export { Dashboard };
