# Stripe Integration Setup

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```bash
# Stripe Configuration (based on official Stripe sample)
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: If you want to use a specific Stripe Price ID instead of dynamic pricing
# PRICE=price_your_stripe_price_id_here
```

## Getting Your Stripe Keys

1. **Sign up for Stripe**: Go to https://stripe.com and create an account
2. **Get API Keys**: 
   - Go to https://dashboard.stripe.com/apikeys
   - Copy your "Publishable key" (starts with `pk_test_`)
   - Copy your "Secret key" (starts with `sk_test_`)
3. **Set up Webhooks**:
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret (starts with `whsec_`)

## Current Implementation

The checkout system is now based on the official Stripe "checkout-one-time-payments" sample and includes:

- ✅ **Dynamic Pricing**: Uses `price_data` instead of hardcoded amounts
- ✅ **Session Retrieval**: Fetches checkout session details on success page
- ✅ **Metadata Storage**: Business information stored in Stripe metadata
- ✅ **Webhook Handling**: Processes payment events
- ✅ **Error Handling**: Graceful failure management

The system is currently set up with placeholder keys and will work in test mode. When you're ready to go live:

1. Replace the placeholder keys with your actual Stripe keys
2. Update the webhook URL to your production domain
3. Test the integration thoroughly
4. Switch to live keys when ready for production

## Features Implemented

- ✅ Stripe Checkout Session creation
- ✅ Secure payment processing
- ✅ Webhook handling for payment events
- ✅ Success/cancel redirect handling
- ✅ Metadata storage for business information
- ✅ Error handling and user feedback

## Testing

Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

Expiry: Any future date
CVC: Any 3-digit number
