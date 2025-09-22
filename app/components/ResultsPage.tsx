'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Shield, 
  FileText,
  Clock,
  DollarSign,
  ArrowRight,
  X
} from 'lucide-react'

interface ResultsPageProps {
  url: string
  onClose: () => void
  onProceedToCheckout: () => void
}

export default function ResultsPage({ url, onClose, onProceedToCheckout }: ResultsPageProps) {
  const [showWatermarkedReport, setShowWatermarkedReport] = useState(false)

  const violations = [
    {
      id: 1,
      type: "Hidden Service Fee",
      location: "Checkout Process",
      description: "Service fee of $9.95 added at checkout without upfront disclosure",
      penalty: "$5,000 per violation",
      severity: "High"
    },
    {
      id: 2,
      type: "Processing Fee Not Disclosed",
      location: "Payment Page",
      description: "Credit card processing fee not included in advertised price",
      penalty: "$5,000 per violation",
      severity: "High"
    }
  ]

  const estimatedPenalty = {
    min: 25000,
    max: 60000,
    monthlyTransactions: 1000,
    violationRate: 0.3
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Violations Detected — Official Report Issued by the California Compliance Framework Platform</h2>
                <p className="text-red-100">We found {violations.length} compliance issues that could result in fines or lawsuits</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Panel */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{violations.length}</div>
                <div className="text-sm text-gray-600">Violations Found</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  ${estimatedPenalty.min.toLocaleString()}–${estimatedPenalty.max.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Annual Penalty Exposure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">High</div>
                <div className="text-sm text-gray-600">Risk Level</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Based on {estimatedPenalty.monthlyTransactions.toLocaleString()} monthly transactions with {Math.round(estimatedPenalty.violationRate * 100)}% violation rate
              </p>
            </div>
          </div>

          {/* Violations List */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Detected Violations</h3>
            <div className="space-y-4">
              {violations.map((violation) => (
                <div key={violation.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">{violation.type}</span>
                        <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">
                          {violation.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{violation.description}</p>
                      <div className="text-sm text-gray-600">
                        <strong>Location:</strong> {violation.location} • 
                        <strong className="ml-2">Penalty:</strong> {violation.penalty}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Preview */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">What You'll Get</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Report Preview */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Compliance Report</span>
                </div>
                <div className="bg-gray-100 rounded p-4 mb-3">
                  <div className="text-sm text-gray-600 mb-2">All-In Price Compliance Report</div>
                  <div className="text-xs text-gray-500 mb-2">Generated: {new Date().toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mb-4">Site: {url}</div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                  </div>
                  {showWatermarkedReport && (
                    <div className="mt-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
                      DEMO VERSION - WATERMARKED
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowWatermarkedReport(!showWatermarkedReport)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {showWatermarkedReport ? 'Hide' : 'Preview'} Report
                </button>
              </div>

              {/* Verified Badge Preview */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Verified Badge</span>
                </div>
                <div className="bg-gray-100 rounded p-4 mb-3 flex items-center justify-center">
                  <div className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 opacity-50">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-semibold">SB-478 Verified</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  Available after cleanup package purchase
                </div>
              </div>
            </div>
          </div>

          {/* Legal Citations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Legal References</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• California Senate Bill 478 (SB-478) - All-In Pricing Requirements</div>
              <div>• FTC Junk Fee Rule - 16 CFR Part 464</div>
              <div>• California Business & Professions Code § 17200</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Protect Your Business Now</h3>
            <p className="text-red-100 mb-4">
              Your scan shows compliance risks that could result in penalties. 
              The Foundation provides a Cleanup & Verification Package to help you get compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onProceedToCheckout}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Secure My Compliance
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="text-sm text-red-100">
                <div>✓ 100% Money-Back Guarantee</div>
                <div>✓ Instant Access to Report</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
