'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'

export default function DebugCheckoutPage() {
  useEffect(() => {
    // Simulate a checkout completion after 2 seconds
    const timer = setTimeout(() => {
      // Set mock data in localStorage for the confirmation page
      const mockLeadData = {
        businessName: 'Merchfly Inc.',
        ownerName: 'Max Hanson',
        email: 'max@merchfly.org',
        phone: '860-970-6827'
      }
      
      localStorage.setItem('complianceReportData', JSON.stringify({
        leadData: mockLeadData,
        scanId: 'CCFP-DEBUG-12345-ABCDEF'
      }))
      
      // Redirect to confirmation page with mock session data
      window.location.href = '/confirmation?scanId=CCFP-DEBUG-12345-ABCDEF&session_id=cs_test_debug_session_12345'
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Debug Checkout Simulation
          </h1>
          
          <p className="text-gray-600 mb-6">
            Simulating successful checkout completion...
          </p>
          
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Payment processed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Session data created</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span>Redirecting to confirmation...</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
