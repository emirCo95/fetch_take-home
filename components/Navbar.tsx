import logo from '@/assets/logo.png';
import Image from 'next/image';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-[#fefdf8] dark:bg-gray-300 shadow-md p-4">
      <div className="flex justify-evenly items-center">
        <div className="">
          <Image src={logo} alt="logo" width={50} height={50} />
        </div>
        <div className="">
          <ul className="flex items-center space-x-4">
            <li>
              <Link className="font-bold hover:underline" href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button variant="ghost">About</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button variant="ghost">Contact</Button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items center space-x-2">
          <ModeToggle />
          <Button variant="outline">Login</Button>
        </div>
      </div>
    </nav>
  );
}
