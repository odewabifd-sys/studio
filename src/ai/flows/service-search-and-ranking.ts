'use server';
/**
 * @fileOverview This file defines a Genkit flow for searching and ranking artisans based on category, location, relevance, availability, and customer reviews.
 *
 * - searchAndRankArtisans - A function that orchestrates the artisan search and ranking process.
 * - SearchAndRankArtisansInput - The input type for the searchAndRankArtisans function.
 * - SearchAndRankArtisansOutput - The return type for the searchAndRankArtisans function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const SearchAndRankArtisansInputSchema = z.object({
  category: z.string().describe('The category of artisan to search for (e.g., plumber, electrician).'),
  location: z.string().describe('The location to search within (e.g., Lagos, Abuja).'),
});
export type SearchAndRankArtisansInput = z.infer<typeof SearchAndRankArtisansInputSchema>;

const ArtisanSchema = z.object({
  id: z.string().describe('The unique identifier of the artisan.'),
  name: z.string().describe('The name of the artisan.'),
  skills: z.array(z.string()).describe('A list of skills the artisan possesses.'),
  location: z.string().describe('The location of the artisan.'),
  rating: z.number().describe('The average rating of the artisan (1-5).'),
  availability: z.boolean().describe('Whether the artisan is currently available for work.'),
  bio: z.string().optional().describe('A short biography of the artisan.'),
  category: z.string().optional().describe('The primary category of the artisan.'),
});

const SearchAndRankArtisansOutputSchema = z.array(ArtisanSchema).describe('A list of artisans ranked by relevance, availability, and customer reviews.');
export type SearchAndRankArtisansOutput = z.infer<typeof SearchAndRankArtisansOutputSchema>;

export async function searchAndRankArtisans(input: SearchAndRankArtisansInput): Promise<SearchAndRankArtisansOutput> {
  return searchAndRankArtisansFlow(input);
}

const artisanRankingPrompt = ai.definePrompt({
  name: 'artisanRankingPrompt',
  input: {
    schema: z.object({
      category: z.string(),
      location: z.string(),
      artisans: z.array(ArtisanSchema),
    }),
  },
  output: {
    schema: SearchAndRankArtisansOutputSchema,
  },
  prompt: `You are an expert in ranking service professionals.

  Given the following category: {{{category}}} and location: {{{location}}}, rank the following artisans based on relevance, availability, and customer reviews. Prioritize artisans who are available and have high customer reviews.

  Artisans:
  {{#each artisans}}
  - Name: {{name}}, Skills: {{skills}}, Location: {{location}}, Rating: {{rating}}, Available: {{availability}}, Bio: {{bio}}
  {{/each}}

  Return the artisans in a JSON array, ranked from most relevant to least relevant.
  Ensure that the output is a valid JSON array of Artisan objects.
  `,
});

const searchAndRankArtisansFlow = ai.defineFlow(
  {
    name: 'searchAndRankArtisansFlow',
    inputSchema: SearchAndRankArtisansInputSchema,
    outputSchema: SearchAndRankArtisansOutputSchema,
  },
  async input => {
    // Fetch artisans from Firestore
    const artisansCol = collection(db, 'users');
    const q = query(artisansCol, where("userType", "==", "artisan"));
    const artisanSnapshot = await getDocs(q);
    const artisansList = artisanSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: `${data.firstName} ${data.lastName}`,
        skills: data.skills || [], // Assuming artisans have a 'skills' field
        location: data.location || 'Unknown', // Assuming artisans have a 'location' field
        rating: data.rating || 0, // Assuming a 'rating' field
        availability: data.availability !== undefined ? data.availability : true, // Defaulting to available
        bio: data.bio || '',
        category: data.category || '',
      };
    });

    const {output} = await artisanRankingPrompt({
      ...input,
      artisans: artisansList,
    });
    return output!;
  }
);
