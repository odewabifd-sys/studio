'use client';
import type { FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { searchAndRankArtisans, type SearchAndRankArtisansOutput } from '@/ai/flows/service-search-and-ranking';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArtisanCard } from '@/components/artisan-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Frown } from 'lucide-react';

function SearchPageComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [artisans, setArtisans] = useState<SearchAndRankArtisansOutput>([]);
    const [loading, setLoading] = useState(true);

    const initialCategory = searchParams.get('category') || '';
    const initialLocation = searchParams.get('location') || '';

    const [category, setCategory] = useState(initialCategory);
    const [location, setLocation] = useState(initialLocation);

    useEffect(() => {
        async function fetchArtisans() {
            if (initialCategory && initialLocation) {
                setLoading(true);
                try {
                    const results = await searchAndRankArtisans({ category: initialCategory, location: initialLocation });
                    setArtisans(results);
                } catch (error) {
                    console.error("Failed to fetch artisans:", error);
                    setArtisans([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        fetchArtisans();
    }, [initialCategory, initialLocation]);
    
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/search?category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 bg-card p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Filters</h3>
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Service</Label>
                                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Plumber" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Lagos" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Rating</Label>
                                    <Slider defaultValue={[4]} max={5} step={0.5} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Sort By</Label>
                                  <Select>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Relevance" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="relevance">Relevance</SelectItem>
                                          <SelectItem value="rating">Rating</SelectItem>
                                          <SelectItem value="newest">Newest</SelectItem>
                                      </SelectContent>
                                  </Select>
                                </div>
                                <Button type="submit" className="w-full">
                                    <Search className="h-4 w-4 mr-2" />
                                    Update Search
                                </Button>
                            </form>
                        </div>
                    </aside>
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-4">
                            {initialCategory && initialLocation ? `Results for "${initialCategory}" in ${initialLocation}`: 'Search for an artisan'}
                        </h2>
                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-48 w-full" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <div className="flex gap-2 pt-2">
                                            <Skeleton className="h-6 w-16" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : artisans.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {artisans.map(artisan => (
                                    <ArtisanCard key={artisan.id} artisan={{ ...artisan, imageUrl: `https://picsum.photos/400/300?random=${artisan.id}` }} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-card rounded-lg">
                                <Frown className="h-16 w-16 mx-auto text-muted-foreground" />
                                <h3 className="mt-4 text-xl font-semibold">No Artisans Found</h3>
                                <p className="mt-2 text-muted-foreground">Try adjusting your search filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageComponent />
        </Suspense>
    );
}