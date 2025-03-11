'use client';

import { useState, useEffect } from 'react';
import { BreedFilterBox } from '@/components/BreedFilterBox';
import axios from 'axios';
import DogCard from '@/components/DogCard';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

interface SearchResults {
  next: string;
  resultIds: string[];
  total: number;
}

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
  const [searchResults, setSearchResults] = useState<SearchResults>({
    next: '',
    resultIds: [],
    total: 0,
  });
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

    if (response.data) {
      setSearchResults(response.data);
    }

    return searchResults.resultIds;
  };

  const fetchDogs = async ({ dogIds }: { dogIds: string[] }) => {
    const response = await axios.post(`${base_url}/dogs`, dogIds, {
      withCredentials: true,
    });
    if (response.data) {
      setDogs(response.data);
    }
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
    fetchDogData().then((result) => {
      fetchDogs({ dogIds: result });
    });
  }, [selectedBreed]);

  return (
    <div className="h-screen flex justify-center items-start space-x-8 pt-24 dark:bg-gray-400">
      <BreedFilterBox breeds={breeds} onFilterByBreed={handleFilterByBreed} />
      <main className="flex flex-wrap gap-6 p-6 justify-center">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </main>
    </div>
  );
}
