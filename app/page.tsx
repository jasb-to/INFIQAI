import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, FileSearch, Database, Lock, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PricingCards } from "@/components/pricing-cards"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FirebaseStatus } from "@/components/firebase-status"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Compliance & Document Intelligence
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Streamline compliance, protect sensitive data, and gain insights from your documents with our
                    AI-powered platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup" passHref>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features" passHref>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px]">
                  <img
                    src="/placeholder.svg?height=500&width=600"
                    alt="INFIQAI Dashboard Preview"
                    className="rounded-lg shadow-xl"
                    width={600}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Firebase Status (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <section className="w-full py-8 bg-gray-50">
            <div className="container px-4 md:px-6">
              <FirebaseStatus />
            </div>
          </section>
        )}

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need for document compliance
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools to help regulated businesses manage document compliance with
                  ease.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Shield className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Compliance Automation</h3>
                <p className="text-center text-gray-500">
                  Automatically scan documents for compliance issues and regulatory requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <FileSearch className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">PII Detection</h3>
                <p className="text-center text-gray-500">
                  Identify and flag personally identifiable information across all your documents.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Database className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-center text-gray-500">
                  Temporary secure storage with automatic deletion after processing.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Lock className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Audit Trails</h3>
                <p className="text-center text-gray-500">
                  Comprehensive audit logs for all document activities and compliance checks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                <p className="text-center text-gray-500">
                  Visualize compliance metrics and document intelligence insights.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <CheckCircle className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Regulatory Updates</h3>
                <p className="text-center text-gray-500">
                  Stay current with automatic updates to compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Process</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How INFIQAI Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our simple three-step process makes document compliance effortless.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Upload Documents</h3>
                <p className="text-center text-gray-500">
                  Securely upload your documents through our encrypted platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-center text-gray-500">
                  Our AI engine scans for compliance issues and identifies sensitive information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Review Results</h3>
                <p className="text-center text-gray-500">
                  Get detailed reports with actionable insights and compliance recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-8">
              <PricingCards />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Trusted by businesses in regulated industries
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers have to say about INFIQAI
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-500">
                    "INFIQAI has transformed how we handle compliance. What used to take days now takes minutes, and
                    with greater accuracy."
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Compliance Officer, Legal Firm</p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-500">
                    "The PII detection feature has saved us from potential data breaches multiple times. Worth every
                    penny."
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">CTO, Healthcare Provider</p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-500">
                    "The audit trails have made our regulatory reviews seamless. Our auditors were impressed with the
                    level of detail."
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-medium">Emma Thompson</p>
                  <p className="text-sm text-gray-500">Director, Financial Services</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to transform your document compliance?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed">
                  Join hundreds of businesses that trust INFIQAI for their compliance needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/signup" passHref>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-blue-700 bg-transparent"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
