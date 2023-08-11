'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const router = useRouter();

  // Handle Logged-in Users
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/profile');
    }
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Home;
