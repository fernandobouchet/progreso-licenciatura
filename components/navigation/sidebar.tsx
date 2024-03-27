import { SideBarNavItems } from '@/components/navigation/sideBarNavItems';

const Sidebar = () => {
  return (
    <nav className="hidden bg-background-secondary lg:flex flex-col w-80 h-full px-3 pt-2">
      <SideBarNavItems />
    </nav>
  );
};
export { Sidebar };
