'use client';

import { useState, useEffect } from 'react';
import { BreedFilterBox } from '@/components/BreedFilterBox';
import axios from 'axios';
import DogCard from '@/components/DogCard';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function SearchDogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [dogs, setDogs] = useState<Dog[]>([]);

  const fetchDogData = async () => {
    const response = await axios(`${base_url}/dogs/search`, {
      method: 'GET',
      params: {
        breeds: selectedBreed,
        size: 5,
      },
      withCredentials: true,
    });

    return response.data.resultIds;
  };

  const fetchDogs = async ({ dogIds }: { dogIds: string[] }) => {
    const response = await axios.post(`${base_url}/dogs`, dogIds, {
      withCredentials: true,
    });
    return response.data;
  };
  const fetchBreeds = async () => {
    const response = await axios(`${base_url}/dogs/breeds`, {
      method: 'GET',
      withCredentials: true,
    });

    if (response.data) {
      setBreeds(response.data);
    }
  };

  const handleFilterByBreed = async (breed: string) => {
    setSelectedBreed(breed);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    const getDogs = async () => {
      try {
        const result = await fetchDogData(); // Fetch dog IDs first
        const data = await fetchDogs({ dogIds: result }); // Fetch dog details

        if (data) {
          setDogs(data);
        }
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    getDogs();
    console.log(dogs);
  }, [selectedBreed]);

  return (
    <div className="flex flex-col justify-center items-center space-x-8 dark:bg-gray-400">
      <div className="mt-10">
        <BreedFilterBox breeds={breeds} onFilterByBreed={handleFilterByBreed} />
      </div>
      <main className="flex flex-wrap gap-6 p-6 justify-center">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </main>
    </div>
  );
}
