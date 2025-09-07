'use server';
/**
 * @fileOverview A Genkit flow for generating invoices.
 *
 * - generateInvoice - A function that generates an invoice for a completed service.
 * - GenerateInvoiceInput - The input type for the generateInvoice function.
 * - GenerateInvoiceOutput - The return type for the generateInvoice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceItemSchema = z.object({
  description: z.string().describe('Description of the item or service.'),
  quantity: z.number().describe('Quantity of the item.'),
  unitPrice: z.number().describe('Price per unit of the item.'),
  total: z.number().describe('Total price for this line item (quantity * unitPrice).'),
});

export const GenerateInvoiceInputSchema = z.object({
  invoiceId: z.string().describe('The unique identifier for the invoice.'),
  customerName: z.string().describe('The name of the customer.'),
  artisanName: z.string().describe('The name of the artisan.'),
  serviceDescription: z.string().describe('A brief description of the service provided.'),
  items: z.array(InvoiceItemSchema).describe('An array of line items for the invoice.'),
  totalAmount: z.number().describe('The total amount of the invoice.'),
  paymentMethod: z.string().describe('The method of payment used.'),
});
export type GenerateInvoiceInput = z.infer<typeof GenerateInvoiceInputSchema>;

export const GenerateInvoiceOutputSchema = z.object({
  invoiceId: z.string(),
  date: z.string().describe('The date the invoice was generated, in ISO 8601 format.'),
  customerName: z.string(),
  artisanName: z.string(),
  invoiceBody: z.string().describe('The formatted body of the invoice, including a table of items, quantities, and prices. This should be a plain string with newlines for formatting.'),
  totalAmount: z.number(),
});
export type GenerateInvoiceOutput = z.infer<typeof GenerateInvoiceOutputSchema>;

export async function generateInvoice(input: GenerateInvoiceInput): Promise<GenerateInvoiceOutput> {
  return generateInvoiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'invoiceGeneratorPrompt',
  input: {schema: GenerateInvoiceInputSchema},
  output: {schema: GenerateInvoiceOutputSchema},
  prompt: `You are an invoicing assistant for Mendamart. Your task is to generate a professional invoice body based on the provided details.

  The invoice body should be a simple, well-formatted text string. Start with a brief summary of the service, then present a clean, aligned table of the line items with columns for Description, Qty, Unit Price, and Total. Do not use markdown tables. Use spaces to align the columns. Finally, confirm the payment method.
  
  Details:
  - Service: {{{serviceDescription}}}
  - Customer: {{{customerName}}}
  - Artisan: {{{artisanName}}}
  - Payment Method: {{{paymentMethod}}}
  
  Line Items:
  {{#each items}}
  - {{description}}: {{quantity}} @ ₦{{unitPrice}} = ₦{{total}}
  {{/each}}
  
  Total Amount: ₦{{totalAmount}}
  
  Set the 'date' field in the output to the current date.
  Generate the 'invoiceBody' field.
  `,
});

const generateInvoiceFlow = ai.defineFlow(
  {
    name: 'generateInvoiceFlow',
    inputSchema: GenerateInvoiceInputSchema,
    outputSchema: GenerateInvoiceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate invoice');
    }
    // Augment the output with data from the input that the LLM doesn't need to generate
    return {
      ...output,
      invoiceId: input.invoiceId,
      date: new Date().toISOString(),
      customerName: input.customerName,
      artisanName: input.artisanName,
      totalAmount: input.totalAmount,
    };
  }
);
