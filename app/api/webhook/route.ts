import { NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const payload = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`)
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  try {
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) return

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
  const priceId = subscription.items.data[0].price.id

  // Map price IDs to plans
  let plan = "free"
  let scansRemaining = 3

  switch (priceId) {
    case "price_1RnjYWGXyx3VQUf7uZ4Gm9RD": // Starter
      plan = "starter"
      scansRemaining = 100
      break
    case "price_1RnjZsGXyx3VQUf75bIf35Ql": // Pro
      plan = "pro"
      scansRemaining = 500
      break
    case "price_1RnjaqGXyx3VQUf7WmXaDri4": // Enterprise
      plan = "enterprise"
      scansRemaining = 999999
      break
  }

  // Update user in Firestore
  const userRef = db.collection("users").doc(userId)

  await userRef.update({
    plan,
    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
    scansRemaining,
    updatedAt: new Date(),
  })

  console.log(`Updated user ${userId} to ${plan} plan`)
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)

  const customerId = invoice.customer as string
  const customer = await stripe.customers.retrieve(customerId)

  if (customer.deleted) return

  const userId = customer.metadata.userId
  if (!userId) return

  // Update user's subscription period end
  const userRef = db.collection("users").doc(userId)

  await userRef.update({
    subscriptionStatus: subscription.status,
    subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
    updatedAt: new Date(),
  })

  console.log(`Updated subscription period for user ${userId}`)
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const customer = await stripe.customers.retrieve(customerId)

  if (customer.deleted) return

  const userId = customer.metadata.userId
  if (!userId) return

  // Update user's subscription status
  const userRef = db.collection("users").doc(userId)

  await userRef.update({
    subscriptionStatus: "past_due",
    updatedAt: new Date(),
  })

  console.log(`Marked subscription as past_due for user ${userId}`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const customer = await stripe.customers.retrieve(customerId)

  if (customer.deleted) return

  const userId = customer.metadata.userId
  if (!userId) return

  // Get price ID to determine plan
  const priceId = subscription.items.data[0].price.id

  // Map price IDs to plans
  let plan = "free"
  let scansRemaining = 3

  switch (priceId) {
    case "price_1RnjYWGXyx3VQUf7uZ4Gm9RD": // Starter
      plan = "starter"
      scansRemaining = 100
      break
    case "price_1RnjZsGXyx3VQUf75bIf35Ql": // Pro
      plan = "pro"
      scansRemaining = 500
      break
    case "price_1RnjaqGXyx3VQUf7WmXaDri4": // Enterprise
      plan = "enterprise"
      scansRemaining = 999999
      break
  }

  // Update user in Firestore
  const userRef = db.collection("users").doc(userId)

  await userRef.update({
    plan,
    subscriptionStatus: subscription.status,
    subscriptionPeriodEnd: new Date(subscription.current_period_end * 1000),
    scansRemaining,
    updatedAt: new Date(),
  })

  console.log(`Updated user ${userId} subscription to ${plan} plan`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const customer = await stripe.customers.retrieve(customerId)

  if (customer.deleted) return

  const userId = customer.metadata.userId
  if (!userId) return

  // Update user in Firestore
  const userRef = db.collection("users").doc(userId)

  await userRef.update({
    plan: "free",
    subscriptionStatus: "canceled",
    scansRemaining: 3,
    updatedAt: new Date(),
  })

  console.log(`Canceled subscription for user ${userId}`)
}
