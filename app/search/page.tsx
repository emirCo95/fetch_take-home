'use client';

import { useState, useEffect } from 'react';
import { BreedFilterBox } from '@/components/BreedFilterBox';
import axios from 'axios';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

export default function SearchDogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
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
    };
    fetchDogData();
    console.log(searchResults);
  }, [selectedBreed]);

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

  return (
    <div className="h-screen flex justify-center items-start space-x-8 pt-24 dark:bg-gray-400">
      <BreedFilterBox breeds={breeds} onFilterByBreed={handleFilterByBreed} />
    </div>
  );
}
