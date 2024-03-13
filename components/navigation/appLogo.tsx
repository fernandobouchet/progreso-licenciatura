import Image from 'next/image';
import logo from '@/public/logo-unahur.webp';

import { Marcellus } from 'next/font/google';
const marcellus = Marcellus({ subsets: ['latin'], weight: '400' });

const AppLogo = () => {
  return (
    <div className="flex justify-center items-center mx-0 w-56">
      <Image src={logo} alt="logo" className="w-12 h-auto" />
      <div className={`flex flex-col ${marcellus.className} pl-3`}>
        <p className="font-bold text-3xl">UNAHUR</p>
        <p className="font-bold text-[0.4rem]">
          UNIVERSIDAD NACIONAL DE HURLINGHAM
        </p>
      </div>
    </div>
  );
};
export default AppLogo;
