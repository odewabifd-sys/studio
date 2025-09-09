
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Wrench, Lightbulb, Construction, Paintbrush, Menu, Star, CheckCircle, UserPlus, FileText } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArtisanCard } from '@/components/artisan-card';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';

const featuredArtisans = [
  { id: '1', name: 'John Doe', skills: ['Plumbing', 'Pipe Fitting'], location: 'Lagos, Ikeja', rating: 4.8, imageUrl: 'https://picsum.photos/400/300' },
  { id: '2', name: 'Jane Smith', skills: ['Electrical Wiring', 'Lighting'], location: 'Abuja, Gwarimpa', rating: 4.9, imageUrl: 'https://picsum.photos/400/301' },
  { id: '3', name: 'David Lee', skills: ['Carpentry', 'Furniture'], location: 'Port Harcourt, GRA', rating: 4.7, imageUrl: 'https://picsum.photos/400/302' },
  { id: '4', name: 'Grace Ojo', skills: ['Painting', 'Decorating'], location: 'Kano, Fagge', rating: 4.8, imageUrl: 'https://picsum.photos/400/303' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <PopularCategoriesSection />
        <FeaturedArtisansSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  const router = useRouter();
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;
    router.push(`/search?category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
      <Image src="https://picsum.photos/1920/1080" alt="Artisan at work" fill className="object-cover" data-ai-hint="nigerian artisan smiling"/>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Find Skilled Artisans in Nigeria</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          From plumbing to electrical work, connect with trusted and verified professionals for your home and office needs.
        </p>
        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex flex-col md:flex-row gap-2 bg-white p-2 rounded-lg shadow-lg">
          <div className="flex-1 flex items-center" suppressHydrationWarning>
            <Search className="h-5 w-5 text-muted-foreground mx-2" />
            <Input name="category" type="text" placeholder="What service do you need? e.g. Electrician" className="border-0 focus-visible:ring-0 text-foreground" required />
          </div>
          <div className="flex-1 flex items-center" suppressHydrationWarning>
            <MapPin className="h-5 w-5 text-muted-foreground mx-2" />
            <Input name="location" type="text" placeholder="e.g. Lagos, Nigeria" className="border-0 focus-visible:ring-0 text-foreground" required />
          </div>
          <Button type="submit" size="lg" className="w-full md:w-auto" suppressHydrationWarning>
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: Search, title: "Search for an Artisan", description: "Filter by service and location to find the perfect match." },
    { icon: FileText, title: "Book and Chat", description: "View profiles, chat with artisans to clarify needs, and book your service securely." },
    { icon: CheckCircle, title: "Job Done, Pay Securely", description: "Once the job is completed, pay through our secure platform." },
    { icon: Star, title: "Rate and Review", description: "Share your experience to help others in the community." },
  ];
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-2 text-lg text-muted-foreground">Four simple steps to get your task done.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularCategoriesSection() {
  const categories = [
    { name: "Plumbers", icon: Wrench, href: "/search?category=plumber&location=" },
    { name: "Electricians", icon: Lightbulb, href: "/search?category=electrician&location=" },
    { name: "Carpenters", icon: Construction, href: "/search?category=carpenter&location=" },
    { name: "Painters", icon: Paintbrush, href: "/search?category=painter&location=" },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Popular Categories</h2>
          <p className="mt-2 text-lg text-muted-foreground">Find the right professional for your needs from our popular categories.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map(category => (
            <Link key={category.name} href={category.href}>
              <Card className="group text-center p-6 hover:bg-primary hover:text-primary-foreground transition-colors hover:-translate-y-1">
                <category.icon className="h-12 w-12 mx-auto text-primary group-hover:text-primary-foreground" />
                <h3 className="mt-4 font-semibold text-lg">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedArtisansSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Artisans</h2>
          <p className="mt-2 text-lg text-muted-foreground">Top-rated and recently active professionals.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredArtisans.map(artisan => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/search">Explore More Artisans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <UserPlus className="h-16 w-16 mx-auto" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Become an Artisan</h2>
        <p className="mt-2 text-lg max-w-2xl mx-auto">
          Join our network of skilled professionals, showcase your work, and connect with customers across Nigeria.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link href="/signup">Start Earning Today</Link>
        </Button>
      </div>
    </section>
  );
}
