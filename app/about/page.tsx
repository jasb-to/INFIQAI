import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About INFIQAI</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're revolutionizing document security and compliance through advanced AI-powered PII detection and
              intelligent document analysis.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To empower organizations with cutting-edge AI technology that ensures data privacy, regulatory
                compliance, and operational excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Protecting Your Most Sensitive Data</h3>
                <p className="text-gray-600 mb-6">
                  In today's digital landscape, protecting personally identifiable information (PII) is not just a
                  regulatory requirement—it's a fundamental responsibility. INFIQAI was founded with the vision of
                  making advanced data protection accessible to organizations of all sizes.
                </p>
                <p className="text-gray-600 mb-6">
                  Our AI-powered platform automatically detects, classifies, and helps you manage sensitive information
                  across all your documents, ensuring compliance with GDPR, CCPA, HIPAA, and other privacy regulations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">99.9% accuracy in PII detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Real-time compliance monitoring</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
                    <div className="text-gray-600">Documents Analyzed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">Enterprise Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                    <div className="text-gray-600">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-lg text-gray-600">
                INFIQAI provides comprehensive AI-powered solutions for document security and compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>PII Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Advanced AI algorithms automatically identify and classify personally identifiable information
                    across all document types with industry-leading accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Real-time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Process documents instantly with our high-performance AI engine, providing immediate insights and
                    compliance reports for your entire document workflow.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Enable secure collaboration with role-based access controls, audit trails, and team management
                    features designed for enterprise environments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Compliance Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Generate comprehensive compliance reports for GDPR, CCPA, HIPAA, and other regulations with detailed
                    audit trails and remediation recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
              <p className="text-lg text-gray-600">
                INFIQAI is trusted by organizations across various industries to protect sensitive data
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
                <p className="text-gray-600">
                  HIPAA compliance, patient data protection, and medical record security for healthcare providers.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Financial Services</h3>
                <p className="text-gray-600">
                  Banking regulations, customer data protection, and financial document compliance.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Legal & Professional</h3>
                <p className="text-gray-600">
                  Attorney-client privilege, confidential documents, and legal compliance management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Documents?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of organizations that trust INFIQAI to protect their sensitive data. Start your free trial
              today and experience the power of AI-driven document security.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
