# INFIQAI Deployment Guide

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Push your code to GitHub
3. **Firebase Project** - Set up as per SETUP.md
4. **Stripe Account** - Configure products and webhooks
5. **OpenAI API Key** - For document analysis

## Environment Variables

Set these in your Vercel project settings:

### Firebase Configuration
\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB96Ac3UtBitrWHZWRKCgL_bz4TJKcidPo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
\`\`\`

### Firebase Admin (Server-side)
\`\`\`
FIREBASE_ADMIN_KEY={"type":"service_account","project_id":"..."}
\`\`\`

### Stripe Configuration
\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
\`\`\`

### OpenAI Configuration
\`\`\`
OPENAI_API_KEY=sk-your_openai_api_key
\`\`\`

## Deployment Steps

### 1. Push to GitHub
\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

### 2. Deploy to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. Add Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all the environment variables listed above
3. Make sure to use **Production** environment for live keys

### 4. Configure Stripe Webhooks
1. In Stripe Dashboard, go to Developers → Webhooks
2. Update webhook URL to: `https://your-domain.vercel.app/api/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 5. Update Firebase Security Rules

**Firestore Rules:**
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own scans
    match /scans/{scanId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Admin users can read all data
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.email.matches('.*@infiqai\\.com$');
    }
  }
}
\`\`\`

**Storage Rules:**
\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

### 6. Test Deployment
1. Visit your deployed URL
2. Test user registration
3. Test document upload
4. Test subscription flow
5. Verify webhook functionality

## Post-Deployment Configuration

### 1. Create Admin User
\`\`\`bash
# Run this in your local environment connected to production Firebase
npm run seed
\`\`\`

Or manually create admin user with email ending in `@infiqai.com`

### 2. Monitor Logs
- Check Vercel Function logs for API errors
- Monitor Stripe webhook delivery
- Check Firebase console for database activity

### 3. Set up Monitoring
- Enable Vercel Analytics
- Set up Stripe monitoring
- Configure Firebase monitoring

## Production Checklist

- [ ] All environment variables set correctly
- [ ] Firebase security rules updated
- [ ] Stripe webhooks configured with production URL
- [ ] OpenAI API key has sufficient credits
- [ ] Admin user created
- [ ] Test complete user flow
- [ ] Monitor error logs
- [ ] Set up backup strategy
- [ ] Configure domain (if custom)
- [ ] Enable HTTPS (automatic with Vercel)

## Troubleshooting

### Common Issues:

1. **Webhook Failures**
   - Check webhook URL is correct
   - Verify webhook secret matches
   - Check Vercel function logs

2. **Firebase Connection Issues**
   - Verify all environment variables
   - Check Firebase project settings
   - Ensure security rules allow access

3. **Stripe Integration Problems**
   - Confirm price IDs match your Stripe products
   - Check webhook event selection
   - Verify API keys are for correct environment

4. **Build Failures**
   - Check package.json dependencies
   - Verify TypeScript configuration
   - Review build logs in Vercel

## Scaling Considerations

- **Database**: Firebase scales automatically
- **Storage**: Firebase Storage handles file uploads
- **Functions**: Vercel functions scale automatically
- **Monitoring**: Set up alerts for high usage
- **Costs**: Monitor Firebase, Stripe, and OpenAI usage

Your INFIQAI app should now be fully deployed and ready for production use!
