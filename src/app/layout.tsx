
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>Mendamart</title>
        <meta name="description" content="Connect with skilled artisans in Nigeria for your service needs." />
        <meta name="keywords" content="artisans, Nigeria, plumber, electrician, carpenter, services marketplace" />
      </head>
      <body className={cn("font-body antialiased")}>
        {isClient ? (
          <AuthProvider>
            {children}
          </AuthProvider>
        ) : (
          <div className="flex flex-col min-h-screen">
              <div className="flex h-16 items-center container">
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
                  <Skeleton className="h-96 w-full max-w-4xl" />
              </main>
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}
