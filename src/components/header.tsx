
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Header() {
  const navItems = [
    { label: 'Find Artisans', href: '/search' },
    { label: 'Become an Artisan', href: '/signup' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <div className="grid gap-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base font-medium text-muted-foreground hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                </div>
                <div className="grid gap-2">
                  <SheetClose asChild>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
