import { ThemeToggle } from '@/components/navigation/themeToggle';
import { api } from '@/trpc/react';
import { NavItems } from '@/components/navigation/navItems';
import { useSession } from 'next-auth/react';

interface Props {
  onOpenChange?: (open: boolean) => void;
}

const SideBarNavItemsMobile = ({ onOpenChange }: Props) => {
  const session = useSession();

  let selectedItems: { careerId: number; }[] | undefined | null = [];

  if (session.status === "authenticated") {
    const { data } = api.user.getUserCareers.useQuery();
    selectedItems = data;
  } else {
    selectedItems = null;
  }

  return (
    <>
      <NavItems initialData={selectedItems} onOpenChange={onOpenChange} />
      <div className="mt-auto ml-auto mb-3">
        <ThemeToggle />
      </div>
    </>
  );
};
export { SideBarNavItemsMobile };
