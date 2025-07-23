"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-8">Last updated: December 2024</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  INFIQAI Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our AI-powered
                  document analysis platform ("Service").
                </p>
                <p>
                  This policy applies to all users of our Service and covers both personal data and business data
                  processed through our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
                <p className="mb-4">We collect information you provide directly to us, including:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and profile information</li>
                  <li>Payment and billing information</li>
                  <li>Communications with our support team</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">2.2 Document Data</h3>
                <p className="mb-4">
                  When you upload documents to our platform, we process the content to provide our AI analysis services.
                  This may include personally identifiable information (PII) contained within your documents.
                </p>

                <h3 className="text-xl font-semibold mb-3">2.3 Usage Information</h3>
                <p className="mb-4">We automatically collect information about how you use our Service, including:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Log data and usage patterns</li>
                  <li>Device information and IP addresses</li>
                  <li>Browser type and operating system</li>
                  <li>Performance and error data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide, maintain, and improve our Service</li>
                  <li>Process your documents and provide AI analysis</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Comply with legal obligations and protect our rights</li>
                  <li>Improve our AI models and algorithms (using anonymized data only)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing</h2>
                <p className="mb-4">Under UK GDPR, we process your personal data based on the following legal bases:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Contract:</strong> To perform our contract with you and provide our services
                  </li>
                  <li>
                    <strong>Legitimate Interest:</strong> To improve our services and communicate with you
                  </li>
                  <li>
                    <strong>Consent:</strong> Where you have given specific consent for certain processing activities
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> To comply with applicable laws and regulations
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Information Sharing and Disclosure</h2>
                <p className="mb-4">
                  We do not sell, trade, or rent your personal information. We may share information in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party service providers who assist in
                    operating our platform
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly consent to sharing
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your information against
                  unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
                <p className="mb-4">
                  We retain your personal information for as long as necessary to provide our services and fulfill the
                  purposes outlined in this Privacy Policy. Document data is typically retained for the duration of your
                  subscription plus 30 days for backup purposes.
                </p>
                <p>
                  You may request deletion of your data at any time, subject to our legal obligations and legitimate
                  business interests.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Your Rights Under UK GDPR</h2>
                <p className="mb-4">You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Right of Access:</strong> Request copies of your personal data
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Request correction of inaccurate data
                  </li>
                  <li>
                    <strong>Right to Erasure:</strong> Request deletion of your personal data
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> Request limitation of processing
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Request transfer of your data
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to processing based on legitimate interests
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent where applicable
                  </li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@infiqai.com. We will respond within one month
                  of receiving your request.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="mb-4">
                  Your data may be transferred to and processed in countries other than the UK. When we transfer data
                  internationally, we ensure appropriate safeguards are in place, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Adequacy decisions by the UK government</li>
                  <li>Standard contractual clauses approved by the UK authorities</li>
                  <li>Binding corporate rules or certification schemes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. These
                  include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the platform to function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how you use our service
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings and preferences
                  </li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling certain cookies
                  may affect the functionality of our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
                <p>
                  Our Service is not intended for children under 16 years of age. We do not knowingly collect personal
                  information from children under 16. If you become aware that a child has provided us with personal
                  information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to
                  review this Privacy Policy periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="list-none">
                  <li>
                    <strong>Data Protection Officer:</strong> privacy@infiqai.com
                  </li>
                  <li>
                    <strong>General Inquiries:</strong> support@infiqai.com
                  </li>
                  <li>
                    <strong>Address:</strong> Birmingham City Centre, United Kingdom
                  </li>
                  <li>
                    <strong>Company:</strong> INFIQAI Limited
                  </li>
                </ul>
                <p className="mt-4">
                  You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you
                  believe we have not handled your personal data in accordance with the law.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
