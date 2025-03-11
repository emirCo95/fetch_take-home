'use client';

import { useState, useEffect } from 'react';
import { BreedFilterBox } from '@/components/BreedFilterBox';
import axios from 'axios';
import DogCard from '@/components/DogCard';
import { Button } from '@/components/ui/button';

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

interface SearchResults {
  resultIds: string[];
  next: string | undefined;
  prev: string | undefined;
  size: number;
}

export default function SearchDogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    resultIds: [],
    next: '',
    prev: '',
    size: 0,
  });
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [paginationState, setPaginationState] = useState<boolean>(false);

  const fetchDogData = async () => {
    const response = await axios(`${base_url}/dogs/search`, {
      method: 'GET',
      params: {
        breeds: selectedBreed,
        size: 6,
        sort: 'name:asc',
      },
      withCredentials: true,
    });

    return response.data;
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

  const getNextPage = async () => {
    if (searchResults.next) {
      const queryData = await axios(`${base_url}${searchResults.next}`, {
        method: 'GET',
        withCredentials: true,
      });

      setSearchResults(queryData.data);
      setPaginationState(true);
    } else {
      return;
    }
  };

  const getPrevPage = async () => {
    if (searchResults.prev) {
      const queryData = await axios(`${base_url}${searchResults.prev}`, {
        method: 'GET',
        withCredentials: true,
      });

      setSearchResults(queryData.data);
      setPaginationState(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    const getDogs = async () => {
      try {
        const resultData = await fetchDogData();
        setSearchResults(resultData);
        const data = await fetchDogs({ dogIds: resultData.resultIds }); // Fetch dog details

        if (data) {
          setDogs(data);
        }
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    getDogs();
  }, [selectedBreed]);

  useEffect(() => {
    const fetchNextDogs = async () => {
      try {
        const dogData = await axios.post(
          `${base_url}/dogs`,
          searchResults.resultIds,
          {
            withCredentials: true,
          }
        );

        if (dogData.data) {
          setDogs(dogData.data);
        }
      } catch (error) {
        console.error('Error fetching next page:', error);
      }
    };
    const fetchPrevDogs = async () => {
      try {
        const dogData = await axios.post(
          `${base_url}/dogs`,
          searchResults.resultIds,
          {
            withCredentials: true,
          }
        );

        if (dogData.data) {
          setDogs(dogData.data);
        }
      } catch (error) {
        console.error('Error fetching prev page:', error);
      }
    };

    if (paginationState) {
      fetchNextDogs();
    } else {
      fetchPrevDogs();
    }
  }, [searchResults]);

  return (
    <div className="flex flex-col justify-center items-center space-x-8 dark:bg-gray-400">
      <div className="flex space-x-4 mt-10">
        <BreedFilterBox breeds={breeds} onFilterByBreed={handleFilterByBreed} />
        <Button
          onClick={getPrevPage}
          variant="outline"
          disabled={searchResults.prev == undefined}
        >
          Prev Page
        </Button>
        <Button
          onClick={getNextPage}
          variant="outline"
          disabled={searchResults.next == undefined}
        >
          Next Page
        </Button>
      </div>
      <main className="flex flex-wrap gap-6 p-6 justify-center">
        {dogs && dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}
      </main>
    </div>
  );
}
