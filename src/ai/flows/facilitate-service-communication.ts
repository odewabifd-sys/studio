'use server';

/**
 * @fileOverview A flow that facilitates communication between customers and artisans during the booking process using an LLM.
 *
 * - facilitateServiceCommunication - A function that handles the communication process.
 * - FacilitateServiceCommunicationInput - The input type for the facilitateServiceCommunication function.
 * - FacilitateServiceCommunicationOutput - The return type for the facilitateServiceCommunication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FacilitateServiceCommunicationInputSchema = z.object({
  customerMessage: z.string().describe('The message from the customer.'),
  artisanMessage: z.string().optional().describe('The message from the artisan, if any.'),
  serviceRequirements: z.string().describe('A description of the service requirements.'),
  customerName: z.string().describe('The name of the customer.'),
  artisanName: z.string().describe('The name of the artisan.'),
});

export type FacilitateServiceCommunicationInput = z.infer<typeof FacilitateServiceCommunicationInputSchema>;

const FacilitateServiceCommunicationOutputSchema = z.object({
  response: z.string().describe('The LLM response to facilitate communication between the customer and artisan.'),
});

export type FacilitateServiceCommunicationOutput = z.infer<typeof FacilitateServiceCommunicationOutputSchema>;

export async function facilitateServiceCommunication(
  input: FacilitateServiceCommunicationInput
): Promise<FacilitateServiceCommunicationOutput> {
  return facilitateServiceCommunicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'facilitateServiceCommunicationPrompt',
  input: {schema: FacilitateServiceCommunicationInputSchema},
  output: {schema: FacilitateServiceCommunicationOutputSchema},
  prompt: `You are an AI assistant helping to facilitate communication between a customer and an artisan during a service booking.  Your goal is to ensure both parties have clear expectations and understanding of the service.

Customer Name: {{{customerName}}}
Artisan Name: {{{artisanName}}}
Service Requirements: {{{serviceRequirements}}}

Customer Message: {{{customerMessage}}}
{{~#if artisanMessage}}
Artisan Message: {{{artisanMessage}}}
{{~else}}
There is no message from the artisan.
{{~/if}}

Based on the information above, provide a response to help clarify service requirements, availability, and any other relevant details to ensure a smooth booking process. If the customer has asked a question, answer it.  If the artisan has asked a question, provide an answer from the customer's point of view. If there has been no prior communication, provide a suggested first message for the artisan to send to the customer.
`,
});

const facilitateServiceCommunicationFlow = ai.defineFlow(
  {
    name: 'facilitateServiceCommunicationFlow',
    inputSchema: FacilitateServiceCommunicationInputSchema,
    outputSchema: FacilitateServiceCommunicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
