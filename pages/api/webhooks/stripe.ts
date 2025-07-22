import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firebase Admin Setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

// Stripe Setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const sig = req.headers["stripe-signature"]!;
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const data = event.data.object as any;

  switch (event.type) {
    case "checkout.session.completed": {
      const customerId = data.customer;
      const email = data.customer_email;
      const priceId = data.metadata.priceId || data.metadata.plan;

      let tier = "starter";
      if (priceId === "price_1RnjZsGXyx3VQUf75bIf35Ql") tier = "pro";
      if (priceId === "price_1RnjaqGXyx3VQUf7WmXaDri4") tier = "enterprise";

      // Match to Firebase Auth user by email
      const usersRef = db.collection("users");
      const query = usersRef.where("email", "==", email);
      const snapshot = await query.get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        await doc.ref.update({
          stripeCustomerId: customerId,
          subscriptionStatus: "active",
          subscriptionTier: tier,
        });
      }

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
