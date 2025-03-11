import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <Card className="w-full max-w-sm rounded-xl shadow-md">
      <CardHeader className="p-4">
        <Image
          src={dog.img}
          alt={dog.name}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-48"
        />
        <CardTitle className="text-xl font-bold mt-2">{dog.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <p className="text-gray-700">
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p className="text-gray-700">
          <strong>Age:</strong> {dog.age} years
        </p>
        <p className="text-gray-700">
          <strong>Zip Code:</strong> {dog.zip_code}
        </p>
      </CardContent>
    </Card>
  );
}
