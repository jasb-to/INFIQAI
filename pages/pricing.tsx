/// --- /pages/pricing.tsx ---

import { useRouter } from 'next/router';

const plans = [
  {
    name: 'Starter',
    price: '£19/mo',
    features: ['20 scans/month', 'Basic PII detection', 'PDF support'],
    priceId: 'price_1RnjYWGXyx3VQUf7uZ4Gm9RD',
  },
  {
    name: 'Pro',
    price: '£49/mo',
    features: ['100 scans/month', 'Advanced detection', 'PDF + DOCX'],
    priceId: 'price_1RnjZsGXyx3VQUf75bIf35Ql',
  },
  {
    name: 'Enterprise',
    price: '£149/mo',
    features: ['Unlimited scans', 'Audit logs', 'Team access'],
    priceId: 'price_1RnjaqGXyx3VQUf7WmXaDri4',
  },
];

export default function Pricing() {
  const router = useRouter();
  const checkout = async (priceId: string) => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await res.json();
    router.push(url);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">INFIQAI Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-lg mb-4">{plan.price}</p>
            <ul className="mb-4 list-disc list-inside text-sm">
              {plan.features.map((f) => (<li key={f}>{f}</li>))}
            </ul>
            <button onClick={() => checkout(plan.priceId)} className="bg-black text-white px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


/// --- /pages/api/create-checkout-session.ts ---

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { priceId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.status(200).json({ url: session.url });
}


/// --- /pages/success.tsx ---
export default function Success() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">✅ Subscription successful!</h1>
      <p className="mt-4">You can now scan documents based on your plan.</p>
    </div>
  );
}

/// --- /pages/cancel.tsx ---
export default function Cancel() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">❌ Subscription cancelled</h1>
      <p className="mt-4">You have not been charged.</p>
    </div>
  );
}
