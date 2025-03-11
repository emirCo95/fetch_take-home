'use client';

//imports
import { useEffect, useState } from 'react';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

export function useAuth() {
  //state to hold isAuthenticated value
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // attempt to fetch a protected route since no verify session route has been provided
        const res = await fetch(`${base_url}/dogs/breeds`, {
          credentials: 'include',
        });

        //if the fetch goes through, the user is authenticated
        setIsAuthenticated(res.ok);
      } catch {
        //otherwise, user is not authenticated
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  //return isAuthenticated state to be used in other components
  return { isAuthenticated };
}
