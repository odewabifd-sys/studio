
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

// This is a wrapper component that will be used to provide the context to the app.
// The actual logic is in AuthProviderClient.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={{ user: null, loading: true }}>
        {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
