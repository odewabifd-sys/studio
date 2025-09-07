import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Phone, MessageSquare, CheckBadge } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock data, replace with actual data fetching
const getArtisanData = async (id: string) => {
  return {
    id: id,
    name: 'John Doe',
    category: 'Master Plumber',
    location: 'Lagos, Ikeja',
    rating: 4.8,
    reviewsCount: 125,
    verified: true,
    availability: true,
    bio: "With over 10 years of experience in residential and commercial plumbing, I am dedicated to providing high-quality service. My expertise includes pipe fitting, drain cleaning, and water heater installation. I am committed to timely service and customer satisfaction.",
    skills: ['Pipe Fitting', 'Drain Cleaning', 'Water Heater Installation', 'Leak Detection', 'Faucet Repair', 'Toilet Installation'],
    portfolio: [
      { id: 'p1', url: 'https://picsum.photos/600/400?random=1', description: 'Modern bathroom sink installation' },
      { id: 'p2', url: 'https://picsum.photos/600/400?random=2', description: 'Water heater replacement' },
      { id: 'p3', url: 'https://picsum.photos/600/400?random=3', description: 'Kitchen plumbing overhaul' },
      { id: 'p4', url: 'https://picsum.photos/600/400?random=4', description: 'Outdoor pipe repair' },
    ],
    reviews: [
      { id: 'r1', author: 'Femi Adebayo', rating: 5, comment: 'John was professional and fixed my leak in no time. Highly recommended!', date: '2 weeks ago', authorImage: 'https://picsum.photos/40/40?random=10' },
      { id: 'r2', author: 'Ngozi Okafor', rating: 4, comment: 'Good service, but arrived a little late. The work was well done.', date: '1 month ago', authorImage: 'https://picsum.photos/40/40?random=11' },
    ],
    profilePicture: 'https://picsum.photos/200/200'
  };
};

export default async function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = await getArtisanData(params.id);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-8">
        <Card>
          <CardContent className="p-0">
            <div className="relative h-48 w-full">
              <Image src="https://picsum.photos/1200/300" alt={`${artisan.name}'s cover photo`} fill className="object-cover rounded-t-lg" data-ai-hint="tools workshop"/>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 space-y-4 sm:space-y-0">
                <Avatar className="h-32 w-32 border-4 border-card">
                  <AvatarImage src={artisan.profilePicture} alt={artisan.name} data-ai-hint="artisan portrait" />
                  <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="sm:ml-6 text-center sm:text-left">
                  <h1 className="text-3xl font-bold">{artisan.name}</h1>
                  <p className="text-muted-foreground">{artisan.category}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span>{artisan.rating} ({artisan.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{artisan.location}</span>
                    </div>
                  </div>
                </div>
                <div className="sm:ml-auto flex gap-2">
                  <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
                   <Button asChild><Link href="/checkout"><Phone className="mr-2 h-4 w-4" /> Book Now</Link></Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mx-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <Separator />

              <TabsContent value="about" className="p-6">
                <h3 className="text-xl font-bold mb-2">About Me</h3>
                <p className="text-muted-foreground mb-6">{artisan.bio}</p>
                <h3 className="text-xl font-bold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {artisan.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="p-6">
                 <h3 className="text-xl font-bold mb-4">My Work</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artisan.portfolio.map(item => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg">
                      <Image src={item.url} alt={item.description} width={600} height={400} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" data-ai-hint="plumbing work"/>
                      <div className="absolute inset-0 bg-black/50 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <h3 className="text-xl font-bold mb-4">Customer Feedback</h3>
                <div className="space-y-6">
                  {artisan.reviews.map(review => (
                    <div key={review.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={review.authorImage} alt={review.author} data-ai-hint="person portrait"/>
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.author}</h4>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                        <p className="mt-2 text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
