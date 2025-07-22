import { NextResponse } from "next/server"
import Stripe from "stripe"
import { auth } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { priceId, userId, email } = await req.json()

    if (!priceId || !userId || !email) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Verify the user is authenticated
    try {
      await auth.getUser(userId)
    } catch (error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create a customer if they don't exist
    let customerId: string
    const customers = await stripe.customers.list({ email })

    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    } else {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          userId,
        },
      })
      customerId = customer.id
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: `${req.headers.get("origin")}/dashboard/billing?success=true`,
      cancel_url: `${req.headers.get("origin")}/dashboard/billing?canceled=true`,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
