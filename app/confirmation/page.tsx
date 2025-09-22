'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Download, 
  FileText, 
  Shield,
  ArrowRight
} from 'lucide-react'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const scanId = searchParams.get('scanId')
  const [isDownloading, setIsDownloading] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [sessionData, setSessionData] = useState<any>(null)

  useEffect(() => {
    // Get the lead data from localStorage
    const storedData = localStorage.getItem('complianceReportData')
    if (storedData) {
      try {
        const { leadData } = JSON.parse(storedData)
        setBusinessName(leadData.businessName || 'Your Business')
        setOwnerName(leadData.ownerName || 'Business Owner')
      } catch (error) {
        console.error('Error parsing stored data:', error)
        setBusinessName('Your Business')
        setOwnerName('Business Owner')
      }
    } else {
      setBusinessName('Your Business')
      setOwnerName('Business Owner')
    }

    // Get session data from URL params (like the official Stripe sample)
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    
    if (sessionId) {
      fetch(`/api/stripe/checkout-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSessionData(data)
          console.log('Checkout session data:', data)
        })
        .catch(error => {
          console.error('Error fetching session data:', error)
        })
    }
  }, [])

  const handleDownload = async () => {
    if (!scanId) return
    
    setIsDownloading(true)
    try {
      // Get the lead data from localStorage
      const storedData = localStorage.getItem('complianceReportData')
      let leadData = null
      
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          leadData = parsed.leadData
        } catch (error) {
          console.error('Error parsing stored data:', error)
        }
      }

      // Send lead data in the request body
      const response = await fetch(`/api/reports/${scanId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: leadData ? JSON.stringify(leadData) : '{}'
      })
      
      if (!response.ok) {
        throw new Error('Failed to download report')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `compliance-report-${scanId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download report. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  if (!scanId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Scan ID</h1>
          <p className="text-gray-600">Please check your confirmation link.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Your compliance report is ready for download
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border max-w-md mx-auto">
            <div className="text-sm text-gray-600 mb-2">Business</div>
            <div className="font-semibold text-gray-900 mb-2">{businessName}</div>
            <div className="text-sm text-gray-600 mb-2">Contact</div>
            <div className="font-semibold text-gray-900 mb-2">{ownerName}</div>
            <div className="text-sm text-gray-600 mb-2">Scan ID</div>
            <div className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">{scanId}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Compliance Report
            </h2>
            <p className="text-gray-600">
              Detailed analysis of your website's compliance with California's SB-478 and FTC regulations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Violations Detected</h3>
              <p className="text-sm text-gray-600">Detailed list of compliance issues found</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Legal Citations</h3>
              <p className="text-sm text-gray-600">References to specific laws and regulations</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Next Steps</h3>
              <p className="text-sm text-gray-600">Actionable recommendations for compliance</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Report...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Your Compliance Report
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        >
          <h3 className="font-semibold text-green-800 mb-2">
            What's Next?
          </h3>
          <p className="text-green-700 text-sm">
            Your compliance report includes detailed violation analysis, legal citations, and step-by-step remediation guidance. 
            For legal representation, consult a qualified attorney familiar with SB-478 and FTC regulations.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
