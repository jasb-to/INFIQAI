import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCards } from "@/components/pricing-cards"
import { FirebaseStatus } from "@/components/firebase-status"
import { Shield, Zap, Users, FileText, Lock, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <FirebaseStatus />

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  🚀 AI-Powered Document Analysis
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Protect Your Data with
                  <span className="text-blue-600"> INFIQAI</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Advanced AI-powered PII detection and document analysis. Secure your sensitive information and ensure
                  compliance with data protection regulations.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose INFIQAI?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
                Our advanced AI technology provides comprehensive document analysis and PII detection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Advanced PII Detection</CardTitle>
                  <CardDescription>
                    Identify and protect sensitive personal information with 99.9% accuracy using our AI models
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Lightning Fast Processing</CardTitle>
                  <CardDescription>
                    Process thousands of documents in minutes with our optimized AI infrastructure
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Work together with your team to review and manage document analysis results
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Multiple File Formats</CardTitle>
                  <CardDescription>
                    Support for PDF, Word, Excel, images, and more file formats for comprehensive analysis
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Enterprise Security</CardTitle>
                  <CardDescription>
                    Bank-level encryption and security measures to protect your sensitive documents
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>
                    Comprehensive reports and analytics to track your data protection compliance
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
                Choose the plan that fits your needs. All plans include our core PII detection features.
              </p>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Secure Your Documents?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                  Join thousands of businesses protecting their sensitive data with INFIQAI
                </p>
              </div>
              <div className="space-x-4">
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
      </main>
      <Footer />
    </div>
  )
}
