import { Logo } from '@/components/logo';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4 items-start">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting you with the best artisans in Nigeria.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5"/></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5"/></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5"/></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="font-semibold mb-2">For Customers</h4>
              <div className="flex flex-col gap-2">
                <Link href="/search" className="text-muted-foreground hover:text-primary text-sm">Find an Artisan</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm">How it Works</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm">Safety</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Artisans</h4>
              <div className="flex flex-col gap-2">
                <Link href="/signup" className="text-muted-foreground hover:text-primary text-sm">Become an Artisan</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm">Services</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm">Help Center</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Artisan Connect. All rights reserved. 
          <Link href="#" className="ml-4 hover:text-primary">Terms of Service</Link>
          <Link href="#" className="ml-4 hover:text-primary">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
