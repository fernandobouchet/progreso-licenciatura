'use server'
import { ThemeToggle } from '@/components/navigation/themeToggle';
import { api } from '@/trpc/server';
import { getServerAuthSession } from '@/lib/auth';
import { NavItems } from '@/components/navigation/navItems';

interface Props {
  onOpenChange?: (open: boolean) => void;
}

const SideBarNavItems = async ({ onOpenChange }: Props) => {
  const session = await getServerAuthSession();

  let selectedItems;

  if (session) {
    selectedItems = await api.user.getUserCareers();
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
export { SideBarNavItems };
