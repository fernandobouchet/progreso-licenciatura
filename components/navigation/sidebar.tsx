import { NavItems } from '@/components/navigation/navItems';

const Sidebar = () => {
  return (
    <nav className="hidden bg-background-secondary lg:flex flex-col w-80 h-full px-3 pt-2">
      <NavItems />
    </nav>
  );
};
export { Sidebar };
