
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from '@/components/ui/skeleton';

type AppUser = User & {
    userType?: 'customer' | 'artisan';
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // auth and db can be null if firebase fails to initialize or on the server
    if (!auth || !db) {
      setLoading(false); // Stop loading if Firebase is not available
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ ...user, userType: userData.userType });
          } else {
            setUser(user); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(user); // Set basic user info even if firestore fails
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const AuthLoader = ({ children }: { children: ReactNode }) => {
    const { loading } = useAuth();
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="flex h-16 items-center container border-b">
                    <Skeleton className="h-7 w-24" />
                    <div className="ml-10 hidden md:flex items-center gap-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="ml-auto hidden md:flex items-center gap-2">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-20" />
                    </div>
                </div>
                <main className="flex-grow flex items-center justify-center">
                    <Skeleton className="h-96 w-full max-w-lg" />
                </main>
            </div>
        );
    }
    return children;
}
