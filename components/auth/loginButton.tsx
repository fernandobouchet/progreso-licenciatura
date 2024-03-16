'use client';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';

const LoginButton = () => {
  return (
    <Button
      onClick={() => signIn('google')}
      className="rounded-full border-none font-medium"
    >
      <Icons.googleIcon className="icon-button" />
      <span>Acceder</span>
    </Button>
  );
};
export { LoginButton };
