"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Users, Award, Target, Heart, Globe, Lightbulb } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const milestones = [
  {
    year: "2023",
    title: "Company Founded",
    description: "INFIQAI was founded with a mission to democratize AI-powered compliance tools.",
  },
  {
    year: "2023",
    title: "First Product Launch",
    description: "Launched our core PII detection and document analysis platform.",
  },
  {
    year: "2024",
    title: "Series A Funding",
    description: "Raised £5M Series A to expand our AI capabilities and team.",
  },
  {
    year: "2024",
    title: "Enterprise Expansion",
    description: "Launched enterprise features and gained 100+ business customers.",
  },
]

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "We believe privacy is a fundamental right and build our products with privacy by design principles.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously push the boundaries of what's possible with AI and machine learning technologies.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Our customers' success is our success. We're committed to delivering exceptional value and support.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical practices in everything we do.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 bg-white">
                About INFIQAI
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Empowering Organizations with AI-Driven Compliance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're on a mission to make data privacy and compliance accessible to every organization, regardless of
                size or technical expertise. Our AI-powered platform helps businesses identify, manage, and protect
                sensitive information automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">
                    Try Our Platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To democratize data privacy and compliance by providing intelligent, automated tools that make it
                    easy for any organization to protect sensitive information and meet regulatory requirements.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-8 w-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A world where every organization can confidently handle sensitive data, knowing they have the tools
                    and knowledge to protect privacy and maintain compliance automatically.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Mission+Vision"
                  alt="Mission and Vision"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                INFIQAI provides comprehensive AI-powered solutions for data privacy, compliance, and document analysis
                across various industries and use cases.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>PII Detection & Classification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically identify and classify personally identifiable information (PII) in documents,
                    databases, and digital assets using advanced AI algorithms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Compliance Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monitor compliance with GDPR, CCPA, HIPAA, and other privacy regulations through continuous scanning
                    and automated reporting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Assess privacy risks and vulnerabilities in your data handling processes with intelligent risk
                    scoring and remediation recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Data Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Create comprehensive data maps showing where sensitive information flows through your organization
                    and how it's being processed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Automated Remediation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically redact, encrypt, or quarantine sensitive data based on your organization's policies
                    and compliance requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Global Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Support for international privacy laws and regulations, helping multinational organizations maintain
                    compliance across jurisdictions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do and shape how we build products, serve customers, and grow as a
                company.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small startup to a growing company serving hundreds of organizations worldwide.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{milestone.year}</Badge>
                          <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of organizations that trust INFIQAI to protect their sensitive data and maintain compliance
              automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
