
'use client';
import { createContext, useContext, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import AuthProviderClient from './auth-provider-client';

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
  return (
    <AuthProviderClient>
        {children}
    </AuthProviderClient>
  );
};

export const useAuth = () => useContext(AuthContext);
