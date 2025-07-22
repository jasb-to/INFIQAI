// Stripe Price IDs Configuration
export const STRIPE_PRICE_IDS = {
  starter: "price_1RnjYWGXyx3VQUf7uZ4Gm9RD",
  pro: "price_1RnjZsGXyx3VQUf75bIf35Ql",
  enterprise: "price_1RnjaqGXyx3VQUf7WmXaDri4",
} as const

// Stripe Product IDs Configuration
export const STRIPE_PRODUCT_IDS = {
  starter: "prod_SjBwJGWZvnSICH",
  pro: "prod_SjBxYyWtzE6oqM",
  enterprise: "prod_SjBy8CRyQCIsEB",
} as const

// Plan configuration
export const PLAN_CONFIG = {
  free: {
    name: "Free Trial",
    scansLimit: 3,
    price: 0,
    features: ["3 document scans", "Basic PII detection", "Email support", "7-day document storage"],
  },
  starter: {
    name: "Starter",
    scansLimit: 100,
    price: 19,
    priceId: STRIPE_PRICE_IDS.starter,
    productId: STRIPE_PRODUCT_IDS.starter,
    features: [
      "Up to 100 document scans per month",
      "Basic PII detection",
      "Email support",
      "7-day document storage",
      "Standard compliance reports",
    ],
  },
  pro: {
    name: "Pro",
    scansLimit: 500,
    price: 49,
    priceId: STRIPE_PRICE_IDS.pro,
    productId: STRIPE_PRODUCT_IDS.pro,
    features: [
      "Up to 500 document scans per month",
      "Advanced PII detection & redaction",
      "Priority email & chat support",
      "30-day document storage",
      "Custom compliance templates",
      "API access",
      "Audit trail exports",
    ],
  },
  enterprise: {
    name: "Enterprise",
    scansLimit: 999999,
    price: 149,
    priceId: STRIPE_PRICE_IDS.enterprise,
    productId: STRIPE_PRODUCT_IDS.enterprise,
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
  },
} as const

export type PlanType = keyof typeof PLAN_CONFIG
