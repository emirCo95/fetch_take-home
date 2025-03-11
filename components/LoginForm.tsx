'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

//base_url
const base_url = 'https://frontend-take-home-service.fetch.com';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //login api call
    await axios(`${base_url}/auth/login`, {
      method: 'POST',
      data: {
        name: formData.name,
        email: formData.email,
      },
      withCredentials: true,
    });

    setLoading(false);

    router.push('/');
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6 shadow-lg dark:bg-gray-500">
      <CardHeader>
        <CardTitle>Login to Your Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="py-2" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="name"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="py-2" htmlFor="password">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
