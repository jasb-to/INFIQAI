import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import admin from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature']!;
  const buf = await buffer(req);
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const priceId = session?.items?.[0]?.price?.id || session?.metadata?.price_id;

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY!)),
      });
    }

    const userRecord = await admin.auth().getUserByEmail(email!);
    let role = 'starter';

    if (priceId === 'price_1RnjZsGXyx3VQUf75bIf35Ql') role = 'pro';
    if (priceId === 'price_1RnjaqGXyx3VQUf7WmXaDri4') role = 'enterprise';

    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    console.log(`Assigned role ${role} to ${email}`);
  }

  res.status(200).end('Webhook received');
};

export default webhookHandler;
