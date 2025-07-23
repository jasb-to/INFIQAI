import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              INFIQAI Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our AI-powered
              document analysis service.
            </p>
            <p>
              This policy applies to all users of our service located at infiqai.com and complies with the UK General
              Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and email address (for account creation)</li>
              <li>Billing information (processed securely through Stripe)</li>
              <li>Company information (if applicable)</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Document Data</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Documents you upload for analysis</li>
              <li>Analysis results and PII detection outcomes</li>
              <li>Metadata about document processing</li>
              <li>Usage statistics and analytics</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Technical Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address and browser information</li>
              <li>Device and operating system details</li>
              <li>Usage patterns and feature interactions</li>
              <li>Error logs and performance data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We process your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Service Delivery:</strong> To provide document analysis and PII detection services
              </li>
              <li>
                <strong>Account Management:</strong> To create and maintain your user account
              </li>
              <li>
                <strong>Billing:</strong> To process payments and manage subscriptions
              </li>
              <li>
                <strong>Communication:</strong> To send service updates and support responses
              </li>
              <li>
                <strong>Improvement:</strong> To enhance our AI models and service quality
              </li>
              <li>
                <strong>Compliance:</strong> To meet legal and regulatory requirements
              </li>
              <li>
                <strong>Security:</strong> To protect against fraud and unauthorized access
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing</h2>
            <p>Under UK GDPR, we process your data based on:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Contract:</strong> To fulfill our service agreement with you
              </li>
              <li>
                <strong>Legitimate Interest:</strong> For service improvement and security
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
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Service Providers:</strong> Stripe for payment processing, cloud hosting providers
              </li>
              <li>
                <strong>AI Partners:</strong> OpenAI for document analysis (with appropriate safeguards)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In case of merger, acquisition, or sale
              </li>
            </ul>
            <p>We never sell your personal data to third parties for marketing purposes.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your data:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers and infrastructure</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p>We retain your data for as long as necessary to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p>
              Account data is typically retained for 7 years after account closure for legal compliance. Document
              analysis results are retained for 2 years unless you request earlier deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Your Rights Under UK GDPR</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate or incomplete data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")
              </li>
              <li>
                <strong>Restriction:</strong> Limit how we process your data
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a structured format
              </li>
              <li>
                <strong>Objection:</strong> Object to processing based on legitimate interests
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Where processing is based on consent
              </li>
            </ul>
            <p>To exercise these rights, contact us at privacy@infiqai.com</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p>Your data may be processed in countries outside the UK. We ensure adequate protection through:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Standard Contractual Clauses approved by the UK authorities</li>
              <li>Adequacy decisions for certain countries</li>
              <li>Appropriate safeguards and security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Maintain your login session</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Improve service performance</li>
            </ul>
            <p>You can control cookies through your browser settings.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 16. We do not knowingly collect personal information from
              children under 16. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of material changes via email or
              through our service. The updated policy will be effective when posted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p>For questions about this Privacy Policy or to exercise your rights, contact:</p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p>
                <strong>Data Protection Officer</strong>
              </p>
              <p>INFIQAI Limited</p>
              <p>123 Business District</p>
              <p>Birmingham City Centre</p>
              <p>Birmingham B1 1AA</p>
              <p>United Kingdom</p>
              <p>Email: privacy@infiqai.com</p>
            </div>
            <p>
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you
              believe your data protection rights have been violated.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
