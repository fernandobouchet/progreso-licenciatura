import { Dashboard } from "@/components/home/dashboard";
import { Login } from "@/components/home/login";
import { getServerAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <>
          <h1 className="title">Inicio</h1>
          <Dashboard />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
