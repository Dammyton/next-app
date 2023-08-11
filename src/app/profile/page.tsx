'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Profile.module.css';

const Profile: React.FC = () => {
  const router = useRouter();

  const [profile, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // Handle invalid token
          router.push('/');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, []);

  //  Logout Implementation
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className={styles['profile-container']}>
      <button className={styles['logout-button']} onClick={handleLogout}>
        Logout
      </button>

      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p className={styles['loading']}>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
