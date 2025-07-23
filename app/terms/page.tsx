"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-8">Last updated: December 2024</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to INFIQAI ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our
                  AI-powered document analysis and PII detection platform ("Service") operated by INFIQAI Limited, a
                  company registered in England and Wales.
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                  of these terms, then you may not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p className="mb-4">
                  INFIQAI provides an AI-powered platform that analyzes documents to detect personally identifiable
                  information (PII), ensures compliance with data protection regulations, and provides insights into
                  document content and structure.
                </p>
                <p>
                  Our Service includes but is not limited to: document upload and analysis, PII detection and
                  classification, compliance reporting, data visualization, and API access for integration with
                  third-party systems.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="mb-4">
                  To access certain features of our Service, you must create an account. You are responsible for
                  maintaining the confidentiality of your account credentials and for all activities that occur under
                  your account.
                </p>
                <p>
                  You agree to provide accurate, current, and complete information during registration and to update
                  such information to keep it accurate, current, and complete.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                <p className="mb-4">You agree not to use the Service:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Processing and Privacy</h2>
                <p className="mb-4">
                  We process your data in accordance with our Privacy Policy and applicable data protection laws,
                  including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>
                <p>
                  By using our Service, you consent to the processing of your data as described in our Privacy Policy.
                  You retain ownership of all data you upload to our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Subscription and Billing</h2>
                <p className="mb-4">Our Service is offered through various subscription plans:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Starter Plan:</strong> £19 per month
                  </li>
                  <li>
                    <strong>Professional Plan:</strong> £49 per month
                  </li>
                  <li>
                    <strong>Enterprise Plan:</strong> £149 per month
                  </li>
                </ul>
                <p className="mb-4">
                  Subscription fees are billed in advance on a monthly basis. All fees are non-refundable except as
                  required by law or as specifically permitted in these Terms.
                </p>
                <p>
                  We reserve the right to change our pricing at any time. Price changes will be communicated to you at
                  least 30 days in advance and will take effect at the start of your next billing cycle.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                <p className="mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive
                  property of INFIQAI Limited and its licensors. The Service is protected by copyright, trademark, and
                  other laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                  perform, republish, download, store, or transmit any of the material on our Service without our prior
                  written consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall INFIQAI Limited, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the Service.
                </p>
                <p>
                  Our total liability to you for all claims arising out of or relating to these Terms or the Service
                  shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless INFIQAI Limited and its licensee and licensors, and
                  their employees, contractors, agents, officers and directors, from and against any and all claims,
                  damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
                  attorney's fees).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever and without limitation,
                  including but not limited to a breach of the Terms.
                </p>
                <p>
                  You may terminate your account at any time by contacting us. Upon termination, your right to use the
                  Service will cease immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of England and Wales, without regard to its
                  conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive
                  jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us:</p>
                <ul className="list-none">
                  <li>
                    <strong>Email:</strong> legal@infiqai.com
                  </li>
                  <li>
                    <strong>Address:</strong> Birmingham City Centre, United Kingdom
                  </li>
                  <li>
                    <strong>Company:</strong> INFIQAI Limited
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
