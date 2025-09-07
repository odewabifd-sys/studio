'use server';
/**
 * @fileOverview A customer support chatbot flow.
 *
 * - customerSupport - A function that handles the customer support conversation.
 * - CustomerSupportInput - The input type for the customerSupport function.
 * - CustomerSupportOutput - The return type for the customerSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const CustomerSupportInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest message from the user.'),
});
export type CustomerSupportInput = z.infer<typeof CustomerSupportInputSchema>;

const CustomerSupportOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type CustomerSupportOutput = z.infer<typeof CustomerSupportOutputSchema>;

export async function customerSupport(input: CustomerSupportInput): Promise<CustomerSupportOutput> {
  return customerSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSupportPrompt',
  input: {schema: CustomerSupportInputSchema},
  output: {schema: CustomerSupportOutputSchema},
  prompt: `You are a helpful customer support agent for Mendamart, a platform that connects customers with skilled artisans in Nigeria. Your goal is to assist users with their questions and issues.

  Conversation History:
  {{#each history}}
  {{role}}: {{{content}}}
  {{/each}}
  
  New User Message: {{{message}}}
  
  Based on the conversation history and the new message, provide a helpful and friendly response to the user.
  If you don't know the answer, say that you will connect them with a human agent.`,
});

const customerSupportFlow = ai.defineFlow(
  {
    name: 'customerSupportFlow',
    inputSchema: CustomerSupportInputSchema,
    outputSchema: CustomerSupportOutputSchema,
  },
  async input => {
    const history = [...input.history, {role: 'user', content: input.message}];
    const {output} = await prompt({history, message: input.message});
    return output!;
  }
);
