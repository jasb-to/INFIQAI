"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, CheckCircle, Calendar, Download } from "lucide-react"
import { getStripe } from "@/lib/stripe"

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("free")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const user = auth.currentUser
        if (!user) return

        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setCurrentPlan(userDoc.data().plan || "free")
        }
      } catch (error) {
        console.error("Error fetching user plan:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPlan()
  }, [])

  const handleSubscribe = async (priceId: string) => {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error("User not authenticated")
      }

      // Create checkout session on the server
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
          email: user.email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe checkout
      const stripe = await getStripe()
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error("Error subscribing:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
        <p className="text-muted-foreground">Manage your subscription and billing information</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription plan and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {currentPlan === "free"
                    ? "Free Trial"
                    : currentPlan === "starter"
                      ? "Starter Plan"
                      : currentPlan === "pro"
                        ? "Pro Plan"
                        : "Enterprise Plan"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "free"
                    ? "Limited access to basic features"
                    : currentPlan === "starter"
                      ? "Up to 100 document scans per month"
                      : currentPlan === "pro"
                        ? "Up to 500 document scans per month"
                        : "Unlimited document scans"}
                </p>
              </div>
              <Badge variant={currentPlan === "free" ? "outline" : "default"}>
                {currentPlan === "free"
                  ? "Free Trial"
                  : currentPlan === "starter"
                    ? "£19/month"
                    : currentPlan === "pro"
                      ? "£49/month"
                      : currentPlan === "enterprise"
                        ? "£149/month"
                        : "Custom"}
              </Badge>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Current Period</span>
                </div>
                <span>{currentPlan === "free" ? "Trial" : "July 22, 2025 - August 22, 2025"}</span>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Document Scans</span>
                </div>
                <span>
                  {currentPlan === "free"
                    ? "3 / 3 remaining"
                    : currentPlan === "starter"
                      ? "87 / 100 remaining"
                      : currentPlan === "pro"
                        ? "476 / 500 remaining"
                        : "Unlimited"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {currentPlan === "free" ? (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => handleSubscribe("price_1RnjYWGXyx3VQUf7uZ4Gm9RD")}
              >
                Upgrade to Starter
              </Button>
            ) : (
              <Button variant="outline" className="w-full bg-transparent">
                Manage Subscription
              </Button>
            )}
          </CardFooter>
        </Card>

        <Tabs defaultValue="plans" className="space-y-4">
          <TabsList>
            <TabsTrigger value="plans">Available Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          <TabsContent value="plans">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="mt-1 text-2xl font-bold">
                    £19<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Perfect for small businesses just getting started with compliance.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Up to 100 document scans per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Basic PII detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>7-day document storage</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      currentPlan === "starter"
                        ? "bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={currentPlan === "starter"}
                    onClick={() => handleSubscribe("price_1RnjYWGXyx3VQUf7uZ4Gm9RD")}
                  >
                    {currentPlan === "starter" ? "Current Plan" : "Subscribe"}
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-blue-600 shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
                <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">Most Popular</div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="mt-1 text-2xl font-bold">
                    £49<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Ideal for growing businesses with increasing compliance needs.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Up to 500 document scans per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Advanced PII detection & redaction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Priority email & chat support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>30-day document storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Custom compliance templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      currentPlan === "pro"
                        ? "bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={currentPlan === "pro"}
                    onClick={() => handleSubscribe("price_1RnjZsGXyx3VQUf75bIf35Ql")}
                  >
                    {currentPlan === "pro" ? "Current Plan" : "Subscribe"}
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-1 text-2xl font-bold">
                    £149<span className="text-sm font-normal text-muted-foreground"> pricing</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    For organizations with complex compliance requirements.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Unlimited document scans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full-spectrum PII detection & management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Custom document retention policies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={currentPlan === "enterprise"}
                    onClick={() => handleSubscribe("price_1RnjaqGXyx3VQUf7WmXaDri4")}
                  >
                    {currentPlan === "enterprise" ? "Current Plan" : "Contact Sales"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods and billing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentPlan === "free" ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <CreditCard className="h-12 w-12 text-muted-foreground/60" />
                    <p className="mt-4 text-center font-medium">No payment methods</p>
                    <p className="text-center text-sm text-muted-foreground">
                      You don't have any payment methods added yet.
                    </p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Add Payment Method</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-card">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Add New Payment Method
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                {currentPlan === "free" ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Download className="h-12 w-12 text-muted-foreground/60" />
                    <p className="mt-4 text-center font-medium">No invoices</p>
                    <p className="text-center text-sm text-muted-foreground">You don't have any invoices yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                          <Download className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Invoice #INV-001</p>
                          <p className="text-xs text-muted-foreground">July 22, 2025 • £49.00</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                          <Download className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Invoice #INV-002</p>
                          <p className="text-xs text-muted-foreground">June 22, 2025 • £49.00</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
