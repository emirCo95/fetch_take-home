'use client';
import { useEffect, useState } from 'react';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to fetch a protected resource
        const res = await fetch(`${base_url}/dogs/breeds`, {
          credentials: 'include',
        });

        setIsAuthenticated(res.ok); // If request succeeds (200 OK), user is authenticated
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
}
