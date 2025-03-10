import logo from '@/assets/logo.png';
import Image from 'next/image';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="bg-gray-400 ">
      <div className="flex justify-evenly items-center">
        <div className="">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <div className="">
          <Button variant="ghost">Login</Button>
        </div>
      </div>
    </nav>
  );
}
