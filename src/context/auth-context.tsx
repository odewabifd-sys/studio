
'use client';
import { createContext, useContext, ReactNode } from 'react';
import type { User } from 'firebase/auth';

export type AppUser = User & {
    userType?: 'customer' | 'artisan';
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // This is a placeholder provider that does nothing.
  // The actual logic is in AuthProviderClient.
  return (
    <AuthContext.Provider value={{ user: null, loading: true }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
