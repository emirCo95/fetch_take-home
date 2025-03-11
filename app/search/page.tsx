'use client';

import { useState, useEffect } from 'react';
import { BreedFilterBox } from '@/components/BreedFilterBox';
import axios from 'axios';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

interface SearchResults {
  next: string;
  resultIds: string[];
  total: number;
}

export default function SearchDogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    next: '',
    resultIds: [],
    total: 0,
  });

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

      return searchResults.resultIds;
    };

    const fetchDogs = async ({ dogIds }: { dogIds: string[] }) => {
      const response = await axios.post(`${base_url}/dogs`, dogIds, {
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
      }
    };
    fetchDogData().then((result) => {
      console.log(result);
      fetchDogs({ dogIds: result });
    });
  }, [selectedBreed]);

  // useEffect(() => {
  //   const fetchDogs = async () => {
  //     const response = await axios.post(
  //       `${base_url}/dogs`,
  //       searchResults.resultIds,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.data) {
  //       console.log(response.data);
  //     }
  //   };

  //   fetchDogs();
  // }, [selectedBreed]);

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
