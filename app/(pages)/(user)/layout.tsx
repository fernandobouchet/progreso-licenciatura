import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
