"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name?: string;
  email?: string;
  sub?: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  error?: Error;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    // Mock auth check - in a real app, you'd fetch the user profile
    const checkSession = async () => {
      try {
        // Check if we have a session cookie
        const hasCookie = document.cookie.includes('appSession');
        if (hasCookie) {
          // Mock user data - in a real app, you'd fetch this from an API
          setUser({
            name: 'Demo User',
            email: 'user@example.com',
            sub: 'auth0|123456',
          });
        }
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);