'use client';

//imports
import logo from '@/assets/logo.png';
import Image from 'next/image';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

export default function Navbar() {
  //useAuth() hook check if the user is authenticated
  const { isAuthenticated } = useAuth();

  //userRouter hook call
  const router = useRouter();

  //logout handler
  const handleLogout = async () => {
    await axios(`${base_url}/auth/logout`, {
      method: 'post',
      withCredentials: true,
    });

    //redirect user to home page after logging out
    router.push('/');

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <nav className="w-full bg-[#fefdf8] dark:bg-gray-300 shadow-md p-4">
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
            {isAuthenticated && (
              <li>
                <Link href="/search">
                  <Button variant="ghost">Search</Button>
                </Link>
              </li>
            )}
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
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button onClick={() => router.push('/login')} variant="outline">
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
