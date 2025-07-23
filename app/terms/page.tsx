import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  By accessing and using INFIQAI's services, you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms and Conditions ("Terms") govern your use of INFIQAI's AI-powered document analysis and PII
                  detection platform ("Service") operated by INFIQAI Limited ("us", "we", or "our").
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  INFIQAI provides an AI-powered platform for document analysis, personally identifiable information
                  (PII) detection, and compliance management. Our services include:
                </p>
                <ul>
                  <li>Automated PII detection and classification</li>
                  <li>Document analysis and processing</li>
                  <li>Compliance reporting and audit trails</li>
                  <li>Data security and encryption services</li>
                  <li>API access for integration with third-party systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Accounts and Registration</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  To access certain features of our Service, you must register for an account. When you register, you
                  agree to:
                </p>
                <ul>
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms or are inactive for
                  extended periods.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Acceptable Use Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>You agree not to use the Service to:</p>
                <ul>
                  <li>Upload, process, or analyze illegal, harmful, or malicious content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights of others</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use the Service for competitive analysis or reverse engineering</li>
                  <li>Share your account credentials with unauthorized parties</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Data Processing and Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Your privacy is important to us. Our processing of your data is governed by our Privacy Policy, which
                  forms part of these Terms. Key points include:
                </p>
                <ul>
                  <li>We process documents solely to provide our AI analysis services</li>
                  <li>We implement industry-standard security measures to protect your data</li>
                  <li>We do not use your documents to train our AI models without explicit consent</li>
                  <li>You retain ownership of all documents and data you upload</li>
                  <li>We comply with GDPR, CCPA, and other applicable data protection regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Subscription Plans and Billing</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>INFIQAI offers various subscription plans with different features and usage limits:</p>
                <ul>
                  <li>
                    <strong>Free Plan:</strong> £0/month - Limited to 3 document scans
                  </li>
                  <li>
                    <strong>Starter Plan:</strong> £19/month - Up to 50 document scans
                  </li>
                  <li>
                    <strong>Pro Plan:</strong> £49/month - Up to 200 document scans
                  </li>
                  <li>
                    <strong>Enterprise Plan:</strong> £149/month - Unlimited document scans
                  </li>
                </ul>
                <p>
                  Billing is processed monthly in advance. You may cancel your subscription at any time, but no refunds
                  will be provided for partial months. Usage limits reset monthly on your billing date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive
                  property of INFIQAI Limited and its licensors. The Service is protected by copyright, trademark, and
                  other laws. Our trademarks and trade dress may not be used without our prior written consent.
                </p>
                <p>
                  You retain all rights to the documents and data you upload to our Service. By using our Service, you
                  grant us a limited license to process your documents solely for the purpose of providing our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Service Availability and Support</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We strive to maintain high service availability but cannot guarantee uninterrupted access. We may
                  temporarily suspend the Service for maintenance, updates, or other operational reasons.
                </p>
                <p>Support is provided based on your subscription plan:</p>
                <ul>
                  <li>Free Plan: Community support only</li>
                  <li>Starter Plan: Email support during business hours</li>
                  <li>Pro Plan: Priority email support</li>
                  <li>Enterprise Plan: 24/7 phone and email support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  To the maximum extent permitted by law, INFIQAI Limited shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
                <p>
                  Our total liability to you for all claims arising from or relating to the Service shall not exceed the
                  amount you paid us in the twelve months preceding the claim.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We may terminate or suspend your account and access to the Service immediately, without prior notice,
                  for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>
                <p>
                  You may terminate your account at any time by contacting us or using the account deletion feature in
                  your dashboard. Upon termination, your right to use the Service will cease immediately, and we may
                  delete your account data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  These Terms shall be interpreted and governed by the laws of England and Wales, without regard to its
                  conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be
                  subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes
                  via email or through the Service. Your continued use of the Service after such modifications
                  constitutes acceptance of the updated Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>13. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <ul>
                  <li>Email: legal@infiqai.com</li>
                  <li>Address: Birmingham City Centre, United Kingdom</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
