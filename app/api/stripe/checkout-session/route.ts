import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_until_real_api',
  {
    apiVersion: '2024-06-20',
  }
)

// Fetch the Checkout Session to display the JSON result on the success page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    return NextResponse.json(session)

  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve checkout session' },
      { status: 500 }
    )
  }
}
