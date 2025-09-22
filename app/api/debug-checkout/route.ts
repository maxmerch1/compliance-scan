import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate a successful checkout completion
  const mockSessionData = {
    id: 'cs_test_debug_session_12345',
    payment_status: 'paid',
    amount_total: 19700, // $197.00 in cents
    currency: 'usd',
    customer_email: 'test@example.com',
    metadata: {
      scanId: 'CCFP-DEBUG-12345-ABCDEF',
      businessName: 'Test Business',
      ownerName: 'Test Owner',
      email: 'test@example.com',
      phone: '123-456-7890'
    }
  }

  // Redirect to confirmation page with mock data
  const confirmationUrl = `http://localhost:3000/confirmation?scanId=${mockSessionData.metadata.scanId}&session_id=${mockSessionData.id}`
  
  return NextResponse.redirect(confirmationUrl)
}
