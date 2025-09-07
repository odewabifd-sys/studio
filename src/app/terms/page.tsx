import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <p>This is a placeholder for your Terms of Service. It is crucial to have a legally sound agreement that outlines the rules and expectations for using your platform. Please replace this with a formal document drafted by a legal professional.</p>

            <h2>1. Introduction</h2>
            <p>Welcome to Mendamart. These Terms of Service ("Terms") govern your use of our website, mobile application, and services (collectively, the "Services"). By using our Services, you agree to these Terms.</p>

            <h2>2. Services Description</h2>
            <p>Mendamart is a platform that connects customers with independent artisans for various services. We are not an employer of artisans and are not responsible for their conduct or the quality of their work.</p>

            <h2>3. User Accounts</h2>
            <p>You must create an account to use most features of our Services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

            <h2>4. Bookings and Payments</h2>
            <p>When you book an artisan, you agree to pay the specified amount for the service. All payments are processed through our secure payment gateway. We are not responsible for any disputes between customers and artisans.</p>
            
            <h2>5. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Mendamart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>

            <h2>6. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the Federal Republic of Nigeria.</p>

            <h2>7. Changes to Terms</h2>
            <p>We may modify these Terms at any time. We will provide notice of any changes by posting the new Terms on our website. Your continued use of the Services after any such change constitutes your acceptance of the new Terms.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
