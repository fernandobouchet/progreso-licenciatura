import { LinkWithIcon } from '@/components/ui/linkWithIcon';
import { ThemeToggle } from '@/components/navigation/themeToggle';
import { Icons } from '@/components/icons';

const Items = [
  {
    title: 'Inicio',
    href: '/',
    icon: <Icons.home className="icon-button" />,
  },
  {
    title: 'Licenciatura',
    href: '/licenciatura',
    icon: <Icons.graduation className="icon-button" />,
  },
  {
    title: 'Informática',
    href: '/tecnicatura/informatica',
    icon: <Icons.computer className="icon-button" />,
  },
  {
    title: 'Programación',
    href: '/tecnicatura/programacion',
    icon: <Icons.terminal className="icon-button" />,
  },
  {
    title: 'Redes',
    href: '/tecnicatura/redes-y-operaciones',
    icon: <Icons.server className="icon-button" />,
  },
  {
    title: 'Inteligencia artificial',
    href: '/tecnicatura/inteligencia-artificial',
    icon: <Icons.cpu className="icon-button" />,
  },
  {
    title: 'Videojuegos',
    href: '/tecnicatura/videojuegos',
    icon: <Icons.gamepad className="icon-button" />,
  },
  {
    title: 'Créditos',
    href: '/creditos',
    icon: <Icons.star className="icon-button" />,
  },
];

interface Props {
  onOpenChange?: (open: boolean) => void;
}

const NavItems = ({ onOpenChange }: Props) => {
  return (
    <>
      {Items.map((item) => (
        <LinkWithIcon key={item.href} item={item} onOpenChange={onOpenChange} />
      ))}
      <div className="mt-auto ml-auto mb-3">
        <ThemeToggle />
      </div>
    </>
  );
};
export { NavItems };
