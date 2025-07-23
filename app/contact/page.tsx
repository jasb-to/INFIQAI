"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Mail, Clock, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  // Pre-fill form for sales inquiries
  const handleSalesInquiry = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "Enterprise Sales Inquiry",
      message:
        "Hi, I'm interested in learning more about INFIQAI's enterprise solutions. Could you please provide more information about pricing, features, and implementation support?",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about INFIQAI? We're here to help. Reach out to our team for support, sales inquiries, or
                partnership opportunities.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Thank you for your message! We'll get back to you within 24 hours.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your.email@company.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            placeholder="What can we help you with?"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us more about your inquiry..."
                            className="min-h-[120px]"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button type="submit" disabled={isSubmitting} className="flex-1">
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                          <Button type="button" variant="outline" onClick={handleSalesInquiry} disabled={isSubmitting}>
                            Sales Inquiry
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Office Address</h3>
                        <p className="text-gray-600 mt-1">
                          123 Innovation Drive
                          <br />
                          Birmingham, B1 1AA
                          <br />
                          United Kingdom
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600 mt-1">
                          General: hello@infiqai.com
                          <br />
                          Support: support@infiqai.com
                          <br />
                          Sales: sales@infiqai.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Business Hours</h3>
                        <p className="text-gray-600 mt-1">
                          Monday - Friday: 9:00 AM - 6:00 PM GMT
                          <br />
                          Saturday: 10:00 AM - 2:00 PM GMT
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">For Customers</h4>
                      <p className="text-sm text-gray-600">
                        Need help with your account? Visit our{" "}
                        <a href="/support" className="text-blue-600 hover:underline">
                          Support Center
                        </a>{" "}
                        or check our{" "}
                        <a href="/docs" className="text-blue-600 hover:underline">
                          Documentation
                        </a>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">For Partners</h4>
                      <p className="text-sm text-gray-600">
                        Interested in partnering with us? Learn about our{" "}
                        <a href="/partners" className="text-blue-600 hover:underline">
                          Partner Program
                        </a>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">For Media</h4>
                      <p className="text-sm text-gray-600">
                        Press inquiries and media resources available in our{" "}
                        <a href="/press" className="text-blue-600 hover:underline">
                          Press Kit
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
