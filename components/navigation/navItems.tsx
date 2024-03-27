'use client';
import { LinkWithIcon } from '@/components/ui/linkWithIcon';
import { Icons } from '@/components/icons';
import { api } from '@/trpc/react';

const Items = [
  {
    title: 'Inicio',
    href: '/',
    icon: <Icons.home className="icon-button" />,
    optionId: null,
  },
  {
    title: 'Licenciatura',
    href: '/licenciatura',
    icon: <Icons.graduation className="icon-button" />,
    optionId: 1,
  },
  {
    title: 'Informática',
    href: '/tecnicatura/informatica',
    icon: <Icons.computer className="icon-button" />,
    optionId: 2,
  },
  {
    title: 'Programación',
    href: '/tecnicatura/programacion',
    icon: <Icons.terminal className="icon-button" />,
    optionId: 3,
  },
  {
    title: 'Redes',
    href: '/tecnicatura/redes-y-operaciones',
    icon: <Icons.server className="icon-button" />,
    optionId: 4,
  },
  {
    title: 'Inteligencia artificial',
    href: '/tecnicatura/inteligencia-artificial',
    icon: <Icons.cpu className="icon-button" />,
    optionId: 5,
  },
  {
    title: 'Videojuegos',
    href: '/tecnicatura/videojuegos',
    icon: <Icons.gamepad className="icon-button" />,
    optionId: 6,
  },
];

const extraItems = [
  {
    title: 'Créditos',
    href: '/creditos',
    icon: <Icons.star className="icon-button" />,
    optionId: 10,
  },
];

interface Props {
  onOpenChange?: (open: boolean) => void;
  initialData:
  | {
    careerId: number;
  }[]
  | null;
}

const NavItems = ({ onOpenChange, initialData }: Props) => {
  let selectedItems;

  if (initialData) {
    const { data } = api.user.getUserCareers.useQuery(undefined, {
      initialData: initialData,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

    selectedItems = Items.filter(
      (item) =>
        item.optionId === null ||
        data?.some((career) => career.careerId === item.optionId)
    );

    selectedItems = selectedItems.some(
      (career) => career.optionId !== null && career.optionId > 2 && career.optionId < 10
    )
      ? [...selectedItems, ...extraItems]
      : selectedItems;
  } else {
    selectedItems = [...Items, ...extraItems];
  }

  return (
    <>
      {selectedItems.map((item) => (
        <LinkWithIcon key={item.href} item={item} onOpenChange={onOpenChange} />
      ))}
    </>
  );
};
export { NavItems };
