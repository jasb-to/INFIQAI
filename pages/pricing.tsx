import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const handleSubscribe = async (priceId: string) => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });

  const data = await res.json();

  const stripe = await stripePromise;
  if (data.sessionId) {
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
  } else {
    console.error("Stripe session error:", data.error?.message);
    alert("There was a problem creating the checkout session.");
  }
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">INFIQAI Pricing</h1>
        <p className="mb-10 text-lg text-gray-600">
          Choose a plan to unlock powerful AI document scanning & compliance features.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Starter</h2>
            <p className="text-3xl font-bold mb-4">£9/mo</p>
            <ul className="text-sm mb-6 text-left list-disc list-inside">
              <li>Up to 20 file scans/month</li>
              <li>Basic compliance flags</li>
              <li>Email support</li>
            </ul>
            <button
              onClick={() =>
                handleSubscribe("price_1RnjYWGXyx3VQUf7uZ4Gm9RD")
              }
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-900"
            >
              Subscribe
            </button>
          </div>

          {/* Pro */}
          <div className="border-2 border-black rounded-xl p-6 shadow-lg bg-gray-50">
            <h2 className="text-2xl font-semibold mb-2">Pro</h2>
            <p className="text-3xl font-bold mb-4">£29/mo</p>
            <ul className="text-sm mb-6 text-left list-disc list-inside">
              <li>Up to 150 file scans/month</li>
              <li>PII & sensitive info detection</li>
              <li>Audit trails + summaries</li>
              <li>Priority support</li>
            </ul>
            <button
              onClick={() =>
                handleSubscribe("price_1RnjZsGXyx3VQUf75bIf35Ql")
              }
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-900"
            >
              Subscribe
            </button>
          </div>

          {/* Enterprise */}
          <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
            <p className="text-3xl font-bold mb-4">£99/mo</p>
            <ul className="text-sm mb-6 text-left list-disc list-inside">
              <li>Unlimited scans</li>
              <li>Advanced redaction tools</li>
              <li>Multi-user access</li>
              <li>Premium support</li>
            </ul>
            <button
              onClick={() =>
                handleSubscribe("price_1RnjaqGXyx3VQUf7WmXaDri4")
              }
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-900"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
