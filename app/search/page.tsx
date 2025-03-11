'use client';

import { useState, useEffect } from 'react';
import { BreedFilterBox } from '@/components/BreedFilterBox';
import axios from 'axios';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

export default function SearchDogs() {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    const response = await axios(`${base_url}/dogs/breeds`, {
      method: 'GET',
      withCredentials: true,
    });

    if (response.data) {
      setBreeds(response.data);
    }
  };

  return (
    <div className="h-screen flex justify-evenly items-start pt-24">
      <BreedFilterBox breeds={breeds} />
    </div>
  );
}
