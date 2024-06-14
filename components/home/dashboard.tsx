import { api } from "@/trpc/server";
import { CardDashboard } from "@/components/home/dashboard/cardDashboard";
import { getServerAuthSession } from "@/lib/auth";

const Dashboard = async () => {
  const careers = await api.user.getUserCareers();
  const session = await getServerAuthSession();

  return (
    <>
      <div className="flex flex-col gap-2 w-full text-start text-base lg:text-lg">
        <p className="font-semibold">Bienvenido, {session?.user.name}!</p>
        <p>
          Actualmente estas registrado en {careers.length}{" "}
          {careers.length > 1 ? "carreras" : "carrera"}:
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row md:justify-around gap-4 mt-6">
        {careers.map((career) => (
          <CardDashboard key={career.careerId} careerId={career.careerId} />
        ))}
      </div>
    </>
  );
};

export { Dashboard };
