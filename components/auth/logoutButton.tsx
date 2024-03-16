'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <DropdownMenuItem
      onClick={() => signOut()}
      className="rounded-2xl cursor-pointer"
    >
      <Icons.logout className="icon-button" />
      <span>Cerrar sesión</span>
    </DropdownMenuItem>
  );
};
export { LogoutButton };
