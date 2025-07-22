# INFIQAI Setup Guide

## Prerequisites

1. Node.js 18+ installed
2. Firebase project created
3. Stripe account (for payments)
4. OpenAI API key (for document analysis)

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `infiqai-app` (or your preferred name)
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save

### 3. Create Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Create database

### 4. Enable Storage

1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore
5. Done

### 5. Get Configuration Keys

1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>)
4. Register app with name "INFIQAI Web"
5. Copy the configuration object

### 6. Create Service Account (for Admin SDK)

1. Go to "Project settings" > "Service accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Keep this file secure - it contains admin credentials

## Environment Variables Setup

Create a `.env.local` file in your project root:

\`\`\`env
# Firebase Web Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (paste the entire JSON as a single line)
FIREBASE_ADMIN_KEY={"type":"service_account","project_id":"..."}

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI API Key
OPENAI_API_KEY=sk-your_openai_api_key
\`\`\`

## Stripe Setup

### 1. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account or sign in
3. Switch to "Test mode" for development

### 2. Create Products and Prices
1. Go to "Products" in Stripe Dashboard
2. Create three products:
   - **Starter Plan**: £99/month
   - **Pro Plan**: £249/month  
   - **Enterprise Plan**: Custom pricing
3. Note down the Price IDs for each plan

### 3. Set up Webhooks
1. Go to "Developers" > "Webhooks"
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/webhook`
4. Select events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook secret

## OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account or sign in
3. Go to "API Keys"
4. Create new secret key
5. Copy the key (starts with `sk-`)

## Installation & Running

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set up environment variables (see above)
4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000)

## Seeding Test Data (Optional)

To create test users and sample data:

\`\`\`bash
npm run seed
\`\`\`

This creates:
- Admin user: `admin@infiqai.com` / `admin123`
- Demo user: `user@example.com` / `user123`
- Pro user: `pro@example.com` / `pro123`

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Vercel

Add all the environment variables from your `.env.local` file to your Vercel project settings.

## Troubleshooting

### Firebase Auth Error
- Check that all Firebase environment variables are set correctly
- Ensure Firebase project has Authentication enabled
- Verify API key is valid and not restricted

### Stripe Integration Issues
- Ensure webhook endpoint is accessible
- Check that webhook secret matches
- Verify price IDs are correct

### OpenAI API Issues
- Check API key is valid
- Ensure you have sufficient credits
- Verify model access (gpt-4o)

## Security Notes

- Never commit `.env.local` to version control
- Use Firebase Security Rules in production
- Enable Stripe webhook signature verification
- Implement proper user permissions
- Use HTTPS in production
