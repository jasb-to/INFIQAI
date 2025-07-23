import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

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
              INFIQAI provides an AI-powered platform that analyzes documents for personally identifiable information
              (PII), compliance risks, and data protection concerns. Our Service includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Document upload and analysis capabilities</li>
              <li>PII detection and classification</li>
              <li>Compliance reporting and recommendations</li>
              <li>Data protection insights and analytics</li>
              <li>User dashboard and management tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>To access certain features of the Service, you must register for an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Upload or analyze documents containing illegal content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit malicious code or attempt to gain unauthorized access</li>
              <li>Use the Service for any unlawful or prohibited purpose</li>
              <li>Reverse engineer or attempt to extract our algorithms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Processing and Privacy</h2>
            <p>
              Your privacy is important to us. Our processing of your personal data is governed by our Privacy Policy,
              which forms part of these Terms. By using our Service, you consent to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The collection and processing of your data as described in our Privacy Policy</li>
              <li>The analysis of documents you upload for PII detection purposes</li>
              <li>The storage of analysis results and metadata</li>
              <li>The use of aggregated, anonymized data for service improvement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Subscription Plans and Billing</h2>
            <p>INFIQAI offers multiple subscription tiers:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Starter Plan:</strong> £19/month - Up to 100 document scans
              </li>
              <li>
                <strong>Professional Plan:</strong> £49/month - Up to 500 document scans
              </li>
              <li>
                <strong>Enterprise Plan:</strong> £149/month - Unlimited scans with advanced features
              </li>
            </ul>
            <p>Billing terms:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Subscriptions are billed monthly in advance</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We may change pricing with 30 days' notice</li>
              <li>Accounts may be suspended for non-payment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features, and functionality are owned by INFIQAI Limited and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
            <p>
              You retain ownership of documents you upload, but grant us a limited license to process them for service
              delivery.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, INFIQAI Limited shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
            <p>
              Our total liability shall not exceed the amount paid by you for the Service in the 12 months preceding the
              claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind. We do not warrant that
              the Service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for
              conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            <p>You may terminate your account at any time by contacting us or through your account settings.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email
              or through the Service. Continued use after changes constitutes acceptance of the new Terms.
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
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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
