import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  INFIQAI Limited ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our AI-powered
                  document analysis and PII detection platform ("Service").
                </p>
                <p>
                  This policy applies to all users of our Service, including visitors to our website, registered users,
                  and enterprise customers. By using our Service, you consent to the data practices described in this
                  policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4 className="font-semibold">Personal Information</h4>
                <p>We collect personal information that you voluntarily provide to us, including:</p>
                <ul>
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Billing information (credit card details, billing address)</li>
                  <li>Company information (organization name, job title)</li>
                  <li>Communication preferences and support inquiries</li>
                </ul>

                <h4 className="font-semibold">Document Data</h4>
                <p>When you use our Service, we process the documents you upload for analysis. This may include:</p>
                <ul>
                  <li>Document content and metadata</li>
                  <li>Identified PII and sensitive information</li>
                  <li>Analysis results and compliance reports</li>
                  <li>Usage patterns and processing history</li>
                </ul>

                <h4 className="font-semibold">Technical Information</h4>
                <p>We automatically collect certain technical information, including:</p>
                <ul>
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Usage analytics and performance metrics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We use the collected information for the following purposes:</p>
                <ul>
                  <li>
                    <strong>Service Provision:</strong> To provide, maintain, and improve our AI analysis services
                  </li>
                  <li>
                    <strong>Account Management:</strong> To create and manage your account, process payments, and
                    provide support
                  </li>
                  <li>
                    <strong>Communication:</strong> To send service updates, security alerts, and respond to inquiries
                  </li>
                  <li>
                    <strong>Analytics:</strong> To understand usage patterns and improve our Service performance
                  </li>
                  <li>
                    <strong>Compliance:</strong> To comply with legal obligations and enforce our Terms of Service
                  </li>
                  <li>
                    <strong>Security:</strong> To detect, prevent, and address technical issues and security threats
                  </li>
                </ul>
                <p>
                  <strong>Important:</strong> We do not use your uploaded documents to train our AI models unless you
                  explicitly opt-in to our data contribution program.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Processing and Storage</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4 className="font-semibold">Processing Location</h4>
                <p>
                  Your data is processed and stored in secure data centers located in the European Union and United
                  Kingdom. We ensure that all data transfers comply with applicable data protection laws.
                </p>

                <h4 className="font-semibold">Data Retention</h4>
                <p>We retain your information for the following periods:</p>
                <ul>
                  <li>Account information: Until account deletion or 3 years after last activity</li>
                  <li>Document data: 30 days after processing (unless longer retention is requested)</li>
                  <li>Billing information: 7 years for tax and accounting purposes</li>
                  <li>Support communications: 2 years after resolution</li>
                </ul>

                <h4 className="font-semibold">Data Security</h4>
                <p>We implement industry-standard security measures, including:</p>
                <ul>
                  <li>End-to-end encryption for data in transit and at rest</li>
                  <li>Multi-factor authentication and access controls</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>SOC 2 Type II compliance and ISO 27001 certification</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share information in
                  the following circumstances:
                </p>

                <h4 className="font-semibold">Service Providers</h4>
                <p>
                  We may share information with trusted third-party service providers who assist us in operating our
                  Service, including cloud hosting, payment processing, and customer support. These providers are bound
                  by confidentiality agreements and data protection requirements.
                </p>

                <h4 className="font-semibold">Legal Requirements</h4>
                <p>We may disclose information when required by law or to:</p>
                <ul>
                  <li>Comply with legal processes or government requests</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Prevent fraud or security threats</li>
                  <li>Enforce our Terms of Service</li>
                </ul>

                <h4 className="font-semibold">Business Transfers</h4>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the
                  new entity, subject to the same privacy protections.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Under GDPR and other applicable laws, you have the following rights:</p>
                <ul>
                  <li>
                    <strong>Access:</strong> Request a copy of your personal information
                  </li>
                  <li>
                    <strong>Rectification:</strong> Correct inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Erasure:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> Receive your data in a structured, machine-readable format
                  </li>
                  <li>
                    <strong>Restriction:</strong> Limit how we process your information
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing based on legitimate interests
                  </li>
                  <li>
                    <strong>Withdraw Consent:</strong> Withdraw consent for processing where applicable
                  </li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@infiqai.com. We will respond to your request
                  within 30 days and may require identity verification.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We use cookies and similar technologies to:</p>
                <ul>
                  <li>Maintain your login session and preferences</li>
                  <li>Analyze website usage and performance</li>
                  <li>Provide personalized content and features</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling certain cookies
                  may affect the functionality of our Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  While we primarily process data within the EU/UK, some service providers may be located in other
                  countries. When we transfer data internationally, we ensure adequate protection through:
                </p>
                <ul>
                  <li>EU Standard Contractual Clauses</li>
                  <li>Adequacy decisions by the European Commission</li>
                  <li>Binding Corporate Rules</li>
                  <li>Other approved transfer mechanisms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Our Service is not intended for children under 16 years of age. We do not knowingly collect personal
                  information from children under 16. If we become aware that we have collected personal information
                  from a child under 16, we will take steps to delete such information promptly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
                  laws. We will notify you of significant changes by email or through our Service. The updated policy
                  will be effective when posted, and your continued use constitutes acceptance of the changes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <ul>
                  <li>
                    <strong>Email:</strong> privacy@infiqai.com
                  </li>
                  <li>
                    <strong>Data Protection Officer:</strong> dpo@infiqai.com
                  </li>
                  <li>
                    <strong>Address:</strong> Birmingham City Centre, United Kingdom
                  </li>
                </ul>
                <p>
                  You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you
                  believe we have not handled your personal information appropriately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
