import { AvatarMenu } from '@/components/navigation/avatarMenu';
import { MobileMenu } from '@/components/navigation/mobileMenu';
import Applogo from '@/components/navigation/appLogo';
import { LoginButton } from '@/components/auth/loginButton';
import { getServerAuthSession } from '@/lib/auth';
import Link from 'next/link';

const Topbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="bg-background-secondary flex justify-between items-center py-2 px-3 h-16 lg:h-[4.5rem] lg:rounded-none">
      <MobileMenu />
      <div className="hidden lg:flex">
        <Link href="/">
          <Applogo />
        </Link>
      </div>
      {session ? <AvatarMenu /> : <LoginButton />}
    </nav>
  );
};
export { Topbar };
