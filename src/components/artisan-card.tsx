import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Artisan {
  id: string;
  name: string;
  skills: string[];
  location: string;
  rating: number;
  imageUrl: string;
  bio?: string;
  availability?: boolean;
}

export function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <Link href={`/artisans/${artisan.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <div className="relative w-full h-48">
          <Image src={artisan.imageUrl} alt={artisan.name} fill className="object-cover" data-ai-hint="artisan portrait"/>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg leading-tight">{artisan.name}</h3>
            <div className="flex items-center gap-1 text-primary shrink-0">
              <Star className="w-4 h-4 fill-primary" />
              <span className="font-semibold">{artisan.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            <span>{artisan.location}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {artisan.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
