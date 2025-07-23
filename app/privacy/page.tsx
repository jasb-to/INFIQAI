import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-GB")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              INFIQAI Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our AI-powered
              document analysis service.
            </p>
            <p>This policy applies to our website (infiqai.com) and all related services, features, and content.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and email address (for account registration)</li>
              <li>Billing information (processed securely through Stripe)</li>
              <li>Profile information and preferences</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Document Data</h3>
            <p>When you use our service, we process:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Documents you upload for analysis</li>
              <li>Extracted text and metadata from documents</li>
              <li>Analysis results and PII detection data</li>
              <li>Usage patterns and service interactions</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.3 Technical Information</h3>
            <p>We automatically collect certain technical information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our document analysis services</li>
              <li>Process your documents and detect PII</li>
              <li>Manage your account and subscriptions</li>
              <li>Send service-related communications</li>
              <li>Improve our services and develop new features</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p>Under GDPR, we process your personal data based on:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Contract:</strong> To provide our services as agreed
              </li>
              <li>
                <strong>Legitimate Interest:</strong> To improve our services and ensure security
              </li>
              <li>
                <strong>Consent:</strong> For marketing communications (where applicable)
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable laws
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with:</p>

            <h3 className="text-xl font-semibold mb-3">5.1 Service Providers</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Firebase (Google) - Authentication and database services</li>
              <li>Stripe - Payment processing</li>
              <li>Vercel - Hosting and deployment</li>
              <li>OpenAI - AI processing services</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.2 Legal Requirements</h3>
            <p>We may disclose information when required by law or to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Comply with legal processes</li>
              <li>Protect our rights and property</li>
              <li>Ensure user safety</li>
              <li>Investigate potential violations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p>We implement appropriate security measures to protect your information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers and infrastructure</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security
              but strive to use commercially acceptable means to protect your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p>We retain your information for as long as necessary to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
            <p>
              Document data is typically retained for 30 days after processing, unless you have a longer retention
              period in your subscription plan. Account data is retained until you delete your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Access:</strong> Request copies of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate personal data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Restrict Processing:</strong> Limit how we use your data
              </li>
              <li>
                <strong>Data Portability:</strong> Receive your data in a portable format
              </li>
              <li>
                <strong>Object:</strong> Object to processing based on legitimate interests
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent for processing
              </li>
            </ul>
            <p>To exercise these rights, contact us at privacy@infiqai.com</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Maintain your session and preferences</li>
              <li>Analyze usage patterns</li>
              <li>Improve our services</li>
              <li>Provide personalized experiences</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling cookies may affect the
              functionality of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Standard Contractual Clauses</li>
              <li>Adequacy decisions by the European Commission</li>
              <li>Certification schemes and codes of conduct</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              policy on this page and updating the "Last updated" date.
            </p>
            <p>For significant changes, we will provide additional notice via email or through our service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>Data Protection Officer</strong>
              </p>
              <p>INFIQAI Limited</p>
              <p>123 Business District</p>
              <p>Birmingham City Centre</p>
              <p>Birmingham B1 1AA</p>
              <p>United Kingdom</p>
              <p>Email: privacy@infiqai.com</p>
              <p>DPO Email: dpo@infiqai.com</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
