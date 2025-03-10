import logo from '@/assets/logo.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Image src={logo} alt="logo" width={500} height={500} />
    </div>
  );
}
