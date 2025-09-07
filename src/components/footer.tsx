import { Logo } from '@/components/logo';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.15-4.24-1.72-6.59.35-1.88 1.31-3.54 2.7-4.71 1.39-1.16 3.19-1.84 5-1.95.02 1.52.01 3.04.01 4.57-.45.06-.89.15-1.33.28-.93.28-1.82.69-2.61 1.25-.47.33-.9.73-1.28 1.18-.88 1.05-1.25 2.51-1.04 3.97.21 1.46 1.12 2.86 2.56 3.66 1.44.8 3.26.93 4.9.43.83-.25 1.6-.66 2.25-1.25.65-.59 1.12-1.33 1.34-2.18.04-.15.06-.3.07-.46.01-2.92.01-5.84.01-8.75Z" />
    </svg>
  );

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
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5"/></Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5"/></Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5"/></Link>
              <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-5 w-5"/></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:col-span-2">
            <div>
              <h4 className="font-semibold mb-2">For Customers</h4>
              <div className="flex flex-col gap-2">
                <Link href="/search" className="text-muted-foreground hover:text-primary text-sm">Find an Artisan</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary text-sm">How it Works</Link>
                <Link href="/support" className="text-muted-foreground hover:text-primary text-sm">Customer Support</Link>
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
          © {new Date().getFullYear()} Menda. All rights reserved. 
          <Link href="/terms" className="ml-4 hover:text-primary">Terms of Service</Link>
          <Link href="/privacy" className="ml-4 hover:text-primary">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
