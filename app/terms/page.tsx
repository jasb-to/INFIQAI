import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          <p className="text-lg text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to INFIQAI ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our
              AI-powered document analysis and PII detection service located at infiqai.com (the "Service") operated by
              INFIQAI Limited.
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of
              these terms, then you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p>
              INFIQAI provides an AI-powered platform that analyzes documents to detect, identify, and help manage
              Personally Identifiable Information (PII) and other sensitive data. Our service includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Document upload and analysis</li>
              <li>PII detection and classification</li>
              <li>Compliance reporting and recommendations</li>
              <li>Data redaction and anonymization tools</li>
              <li>Analytics and audit trails</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>To access certain features of the Service, you must register for an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Upload illegal, harmful, or malicious content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use the Service for competitive analysis or reverse engineering</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Processing and Privacy</h2>
            <p>
              We process your data in accordance with our Privacy Policy and applicable data protection laws, including
              GDPR. By using our Service, you consent to such processing and warrant that all data provided is accurate.
            </p>
            <p>
              You retain ownership of your documents and data. We process this data solely to provide our services and
              will not use it for any other purpose without your explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Subscription Plans and Billing</h2>
            <p>Our Service offers several subscription plans:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Free Plan:</strong> £0 - 3 document scans, basic features
              </li>
              <li>
                <strong>Starter Plan:</strong> £19/month - 100 scans, advanced features
              </li>
              <li>
                <strong>Pro Plan:</strong> £49/month - 500 scans, premium features
              </li>
              <li>
                <strong>Enterprise Plan:</strong> £149/month - Unlimited scans, enterprise features
              </li>
            </ul>
            <p>
              Subscription fees are billed monthly in advance. You may cancel your subscription at any time, but no
              refunds will be provided for partial months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by INFIQAI and are protected
              by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You retain all rights to your uploaded documents and data. By uploading content, you grant us a limited
              license to process and analyze it solely for providing our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, INFIQAI shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including loss of profits, data, or other intangible losses.
            </p>
            <p>
              Our total liability shall not exceed the amount paid by you for the Service in the 12 months preceding the
              claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Service Availability</h2>
            <p>
              We strive to maintain high service availability but do not guarantee uninterrupted access. We may suspend
              or terminate the Service for maintenance, updates, or other operational reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for
              conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately, and we may delete your account and
              data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes via
              email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>INFIQAI Limited</strong>
              </p>
              <p>123 Business District</p>
              <p>Birmingham City Centre</p>
              <p>Birmingham B1 1AA</p>
              <p>United Kingdom</p>
              <p>Email: legal@infiqai.com</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
