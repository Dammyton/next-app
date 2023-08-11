'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/LoginForm.module.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/profile');
      } else {
        // Handle incorrect username/password
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles['login-container']}>
      <h1 className={styles['title']}>Login</h1>

      {error && <p className={styles['error-message']}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles['login-input']}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles['login-input']}
        />
        <button type="submit" className={styles['login-button']}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
