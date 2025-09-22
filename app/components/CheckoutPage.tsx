'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contentConfig } from '../config/content'
import { 
  Shield, 
  CheckCircle, 
  Clock,
  DollarSign,
  ArrowRight,
  X,
  FileText,
  Monitor,
  Headphones,
  Star,
  Lock
} from 'lucide-react'

interface CheckoutPageProps {
  onClose: () => void
  onComplete: (scanId: string, leadData: { email: string, businessName: string, ownerName: string, phone: string }) => void
  leadData: { email: string, businessName: string, ownerName: string, phone: string }
}

// Testimonials Carousel Component
function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = contentConfig.testimonials

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-sm text-gray-600">4.9/5 from 200+ businesses</span>
        </div>
      </div>
      
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm text-gray-600 italic mb-2">
          "{testimonials[currentIndex].quote}"
        </p>
        <p className="text-xs text-gray-500 font-medium">
          — {testimonials[currentIndex].author}, {testimonials[currentIndex].role}
        </p>
        <p className="text-xs text-gray-400">
          {testimonials[currentIndex].location}
        </p>
      </motion.div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function CheckoutPage({ onClose, onComplete, leadData }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Generate unique scan ID
      const scanId = `CCFP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData,
          scanId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Checkout API error:', errorData)
        throw new Error(errorData.details || 'Failed to create checkout session')
      }
      
      const { url } = await response.json()
      
      if (url) {
        // Redirect to Stripe checkout
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
      
    } catch (error) {
      console.error('Checkout error:', error)
      
      // Show more helpful error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to process payment'
      
      if (errorMessage.includes('Stripe configuration required')) {
        alert('Stripe is not configured yet. Please set up your Stripe keys in .env.local. See STRIPE_SETUP.md for instructions.')
      } else {
        alert(`Payment error: ${errorMessage}`)
      }
      
      setIsProcessing(false)
    }
  }

  const packageItems = [
    {
      icon: FileText,
      title: "Full Violation Report",
      description: "Detailed PDF with screenshots and legal citations"
    },
    {
      icon: CheckCircle,
      title: "Cleanup Checklist & Templates",
      description: "Step-by-step guide to fix all violations"
    },
    {
      icon: Shield,
      title: "Verified Badge for Your Site",
      description: "Display compliance badge to build customer trust"
    },
    {
      icon: Monitor,
      title: "12 Months of Monitoring",
      description: "Ongoing scans to catch new compliance issues"
    },
    {
      icon: Headphones,
      title: "Priority Support",
      description: "Direct access to compliance experts"
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Cleanup & Verification Package</h2>
                <p className="text-green-100">Complete cleanup package with ongoing protection</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Package Details */}
            <div>
              <h3 className="text-xl font-bold mb-4">Cleanup & Verification Package</h3>
              
              <div className="space-y-4 mb-6">
                {packageItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk Reversal */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">100% Money-Back Guarantee — No Questions Asked</span>
                </div>
                <p className="text-sm text-green-700">
                  If we don't detect any violations in your scan, your payment is refunded. No questions asked.
                </p>
              </div>

              {/* Scarcity */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Limited Availability</span>
                </div>
                <p className="text-sm text-orange-700">
                  We onboard only 10 new businesses per week for compliance cleanup. 
                  Reserve your spot today.
                </p>
              </div>
            </div>

            {/* Checkout Section */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Package Includes</h3>
                  <p className="text-gray-600">Everything you need to get compliant and stay protected</p>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <div>✓ Full violation report</div>
                  <div>✓ Cleanup implementation guide</div>
                  <div>✓ Verified Badge certification</div>
                  <div>✓ 12 months monitoring</div>
                </div>

                <div className="text-center text-xs text-gray-500">
                  Your contribution helps us protect your business and thousands of others across California.
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Secure Checkout</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    You'll be redirected to Stripe's secure checkout page to complete your order. 
                    Your information is encrypted and never stored on our servers.
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="mb-4">
                  <div className="text-center text-sm text-gray-600 mb-3">Choose your payment method:</div>
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-black font-bold text-xs">🍎</span>
                      </div>
                      Apple Pay
                    </div>
                    <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">G</span>
                      </div>
                      Google Pay
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Secure Checkout...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Complete My Compliance Package
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Secure 256-bit SSL Encrypted Checkout • Powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="mt-8">
            <TestimonialsCarousel />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
