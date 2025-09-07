import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <p>This is a placeholder for your Privacy Policy. It is important to have a comprehensive policy that details how you collect, use, and protect your users' data. Please replace this with your own policy drafted by a legal professional.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include personal information such as your name, email address, phone number, and location.</p>
            <p>We also collect information automatically when you use our services, such as your IP address, device type, and browsing activity.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, including to:</p>
            <ul>
                <li>Connect customers with artisans.</li>
                <li>Process transactions and send you related information, including confirmations and invoices.</li>
                <li>Communicate with you about products, services, offers, and events.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We may share your information with artisans to facilitate service bookings. We do not sell your personal information to third parties.</p>

            <h2>4. Data Security</h2>
            <p>We implement reasonable measures to help protect your information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

            <h2>5. Your Choices</h2>
            <p>You may update or correct your account information at any time by logging into your account. You may also opt out of receiving promotional communications from us by following the instructions in those communications.</p>

            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@mendamart.com.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
