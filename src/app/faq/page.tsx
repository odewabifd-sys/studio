import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "What is Mendamart?",
    answer: "Mendamart is an online platform that connects you with skilled and vetted artisans in Nigeria for a wide range of home and office services."
  },
  {
    question: "How do I book an artisan?",
    answer: "You can book an artisan by searching for the service you need, browsing through the profiles of available artisans, selecting one that fits your requirements, and then booking them directly through our secure platform."
  },
  {
    question: "Is the payment secure?",
    answer: "Yes, all payments are processed through our secure and encrypted payment gateway to protect your financial information. We hold the payment until you confirm that the job has been completed to your satisfaction."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We strive for customer satisfaction. If you are not happy with the service provided, please contact our customer support team through the support page, and we will mediate to find a resolution, which may include a partial or full refund."
  },
  {
    question: "How are artisans vetted?",
    answer: "All artisans on our platform go through a verification process that includes identity checks and skill validation to ensure you are hiring a trusted and capable professional."
  }
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
