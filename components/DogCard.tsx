import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';

type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export default function DogCard({
  dog,
  onSetFavorites,
}: {
  dog: Dog;
  onSetFavorites: (value: string) => void;
}) {
  const handleSetFavorites = (dogId: string) => {
    onSetFavorites(dogId);
  };
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
        <p className="dark:text-white">
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p className="dark:text-white">
          <strong>Age:</strong> {dog.age} years
        </p>
        <p className="dark:text-white">
          <strong>Zip Code:</strong> {dog.zip_code}
        </p>
        <p className="dark:text-white">
          <Button onClick={() => handleSetFavorites(dog.id)} variant="outline">
            Add To Favorites
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}
