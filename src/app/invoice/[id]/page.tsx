'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Skeleton } from '@/components/ui/skeleton';
import { generateInvoice, GenerateInvoiceInput, GenerateInvoiceOutput } from '@/ai/flows/invoice-generator';

export default function InvoicePage({ params }: { params: { id: string } }) {
  const [invoice, setInvoice] = useState<GenerateInvoiceOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const invoiceInput: GenerateInvoiceInput = {
          invoiceId: params.id,
          customerName: 'Femi Adebayo',
          artisanName: 'John Doe',
          serviceDescription: 'Emergency plumbing service to fix kitchen sink leak.',
          items: [
            { description: 'Service Call-out Fee', quantity: 1, unitPrice: 5000, total: 5000 },
            { description: 'Pipe Replacement (2 meters)', quantity: 2, unitPrice: 2500, total: 5000 },
            { description: 'Labor (2 hours)', quantity: 2, unitPrice: 2500, total: 5000 },
          ],
          totalAmount: 15000,
          paymentMethod: 'Card (**** **** **** 1234)',
        };
        const result = await generateInvoice(invoiceInput);
        setInvoice(result);
      } catch (error) {
        console.error("Failed to generate invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [params.id]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Invoice Details</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print</Button>
              <Button><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
          </div>
          <Card className="p-8 print:shadow-none print:border-none">
            {loading || !invoice ? (
              <InvoiceSkeleton />
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <Logo />
                    <p className="text-muted-foreground text-sm mt-2">
                      123 Innovation Drive, Yaba, Lagos, Nigeria
                    </p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold">Invoice</h2>
                    <p className="text-muted-foreground">#{invoice.invoiceId}</p>
                    <p className="text-sm">Date: {new Date(invoice.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Billed To</h3>
                    <p>{invoice.customerName}</p>
                    <p className="text-muted-foreground">customer@email.com</p>
                  </div>
                  <div className="text-right sm:text-left sm:justify-self-end">
                    <h3 className="font-semibold mb-2">From</h3>
                    <p>{invoice.artisanName}</p>
                    <p className="text-muted-foreground">artisan@email.com</p>
                  </div>
                </div>
                
                <Separator />

                <div>
                   <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-body">
                    {invoice.invoiceBody}
                   </pre>
                </div>
                
                <Separator />

                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Amount</span>
                  <span>₦{invoice.totalAmount.toLocaleString()}</span>
                </div>

                <div className="text-center text-muted-foreground text-sm">
                  Thank you for your business! If you have any questions, please contact our support.
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const InvoiceSkeleton = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-start">
      <div>
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-4 w-48 mt-2" />
      </div>
      <div className="text-right space-y-1">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="space-y-1 text-right sm:text-left sm:justify-self-end">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
    <Separator />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <Separator />
    <div className="flex justify-between">
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-7 w-24" />
    </div>
  </div>
)
