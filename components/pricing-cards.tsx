"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started with compliance.",
      price: isAnnual ? "£19" : "£25",
      period: isAnnual ? "/month, billed annually" : "/month",
      priceId: "price_1RnjYWGXyx3VQUf7uZ4Gm9RD", // Starter price ID
      features: [
        "Up to 100 document scans per month",
        "Basic PII detection",
        "Email support",
        "7-day document storage",
        "Standard compliance reports",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses with increasing compliance needs.",
      price: isAnnual ? "£49" : "£59",
      period: isAnnual ? "/month, billed annually" : "/month",
      priceId: "price_1RnjZsGXyx3VQUf75bIf35Ql", // Pro price ID
      features: [
        "Up to 500 document scans per month",
        "Advanced PII detection & redaction",
        "Priority email & chat support",
        "30-day document storage",
        "Custom compliance templates",
        "API access",
        "Audit trail exports",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For organizations with complex compliance requirements.",
      price: isAnnual ? "£149" : "£179",
      period: isAnnual ? "/month, billed annually" : "/month",
      priceId: "price_1RnjaqGXyx3VQUf7WmXaDri4", // Enterprise price ID
      features: [
        "Unlimited document scans",
        "Full-spectrum PII detection & management",
        "24/7 dedicated support",
        "Custom document retention policies",
        "Advanced analytics & reporting",
        "Custom AI model training",
        "On-premise deployment options",
        "Dedicated account manager",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
  ]

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (planName === "Enterprise") {
      // Redirect to contact page for enterprise
      window.location.href = "/contact"
      return
    }

    try {
      // For now, redirect to signup - in a real app, you'd handle the subscription flow
      window.location.href = `/auth/signup?plan=${planName.toLowerCase()}&priceId=${priceId}`
    } catch (error) {
      console.error("Error initiating subscription:", error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center space-x-2">
        <Label htmlFor="billing-toggle">Monthly</Label>
        <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
        <Label htmlFor="billing-toggle">
          Annual <span className="text-sm text-blue-600 font-medium">(Save 20%)</span>
        </Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.popular ? "border-blue-600 shadow-lg shadow-blue-100 dark:shadow-blue-900/20" : ""
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">Most Popular</div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.priceId, plan.name)}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
