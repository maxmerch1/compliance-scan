import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_until_real_api',
  {
    apiVersion: '2024-06-20',
  }
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder_until_real_webhook'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Store the successful payment data
        const metadata = session.metadata
        if (metadata) {
          console.log('Payment successful for:', {
            scanId: metadata.scanId,
            businessName: metadata.businessName,
            ownerName: metadata.ownerName,
            email: metadata.email,
            amount: session.amount_total,
            paymentStatus: session.payment_status
          })
          
          // In a real app, you'd save this to your database
          // For now, we'll just log it
        }
        break

      case 'payment_intent.succeeded':
        console.log('PaymentIntent succeeded:', event.data.object.id)
        break

      case 'payment_intent.payment_failed':
        console.log('PaymentIntent failed:', event.data.object.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
