"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Perfect for trying out our service",
    features: ["3 document scans", "Basic PII detection", "Email support", "Standard processing speed"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Starter",
    price: "£19",
    period: "per month",
    description: "Great for small businesses and individuals",
    features: [
      "50 document scans per month",
      "Advanced PII detection",
      "Priority email support",
      "Fast processing speed",
      "Export reports (PDF, CSV)",
      "Basic analytics dashboard",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "£49",
    period: "per month",
    description: "Perfect for growing businesses",
    features: [
      "200 document scans per month",
      "Advanced PII detection + compliance",
      "Priority support + phone support",
      "Fastest processing speed",
      "Advanced export options",
      "Detailed analytics & insights",
      "API access",
      "Custom compliance rules",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "£149",
    period: "per month",
    description: "For large organizations with high volume needs",
    features: [
      "Unlimited document scans",
      "Enterprise-grade PII detection",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced API access",
      "Custom compliance frameworks",
      "SSO integration",
      "On-premise deployment options",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
]

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {plans.map((plan, index) => (
        <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
          {plan.popular && (
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
          )}
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-600 ml-1">/{plan.period}</span>
            </div>
            <CardDescription className="mt-2">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${plan.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
