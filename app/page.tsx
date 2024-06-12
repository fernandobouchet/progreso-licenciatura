import { Dashboard } from "@/components/home/dashboard";
import { Login } from "@/components/home/login";
import { getServerAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <>
          <Dashboard />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
