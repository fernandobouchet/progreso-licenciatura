import { LoginButton } from '@/components/auth/loginButton';
import { AvatarMenu } from '@/components/avatarMenu';
import { getServerAuthSession } from '@/lib/auth';

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex w-full justify-end p-2">
      <div>{session ? <AvatarMenu /> : <LoginButton />}</div>
    </nav>
  );
};
export default Navbar;
