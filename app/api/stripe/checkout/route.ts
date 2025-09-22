import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with environment keys
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// Check if we have valid Stripe keys
const isUsingPlaceholderKey = !stripeSecretKey || stripeSecretKey.includes('placeholder')

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-08-27.basil',
  appInfo: {
    name: "california-compliance-framework",
    version: "1.0.0",
  }
})

export async function POST(request: NextRequest) {
  try {
    console.log('Creating Stripe checkout session...')
    
    const { leadData, scanId, quantity = 1 } = await request.json()
    console.log('Request data:', { leadData, scanId, quantity })

    if (!leadData || !scanId) {
      console.error('Missing required data:', { leadData, scanId })
      return NextResponse.json(
        { error: 'Lead data and scan ID are required' },
        { status: 400 }
      )
    }

    const domainURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    console.log('Domain URL:', domainURL)
    console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY)
    console.log('Using placeholder key:', isUsingPlaceholderKey)

    // Check if we're using placeholder keys
    if (isUsingPlaceholderKey) {
      console.error('Using placeholder Stripe key - checkout will fail')
      return NextResponse.json(
        { 
          error: 'Stripe configuration required',
          details: 'Please set up your Stripe keys in .env.local. See STRIPE_SETUP.md for instructions.',
          type: 'STRIPE_CONFIG_ERROR'
        },
        { status: 400 }
      )
    }

    // Create a Stripe checkout session following the official sample pattern
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          // Use price_data for dynamic pricing (like the sample)
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Cleanup & Verification Package',
              description: 'Complete compliance cleanup package with ongoing protection',
              images: [], // Add product images if available
            },
            unit_amount: 19700, // $197.00 in cents
          },
          quantity: quantity
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/confirmation?scanId=${scanId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/checkout-cancelled`,
      // Store business information in metadata
      metadata: {
        scanId,
        businessName: leadData.businessName,
        ownerName: leadData.ownerName,
        email: leadData.email,
        phone: leadData.phone || '',
      },
      customer_email: leadData.email,
      billing_address_collection: 'required',
      // Optional: Enable automatic tax calculation
      // automatic_tax: { enabled: true },
    })

    console.log('Stripe session created successfully:', session.id)
    console.log('Session URL:', session.url)

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    
    // Return more detailed error information for debugging
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: 'STRIPE_CHECKOUT_ERROR'
      },
      { status: 500 }
    )
  }
}

// Handle webhook events (for production)
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Stripe checkout API is running',
    status: 'ok'
  })
}
