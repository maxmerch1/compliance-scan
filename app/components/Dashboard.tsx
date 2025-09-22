'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Shield, 
  CheckCircle,
  FileText,
  Monitor,
  Clock,
  ArrowRight,
  X
} from 'lucide-react'

interface DashboardProps {
  url: string
  onClose: () => void
}

export default function Dashboard({ url, onClose }: DashboardProps) {
  const [reportDownloaded, setReportDownloaded] = useState(false)

  const handleDownloadReport = () => {
    setReportDownloaded(true)
    // In a real app, this would trigger an actual download
    setTimeout(() => setReportDownloaded(false), 3000)
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
        <div className="bg-green-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Welcome to Your CCFP Compliance Dashboard</h2>
                <p className="text-green-100">Your business is now protected with ongoing monitoring by the California Compliance Framework Platform</p>
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
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Payment Successful!</span>
            </div>
            <p className="text-green-700 text-sm">
              Your compliance package is now active. You have instant access to all tools and resources.
            </p>
          </div>

          {/* Website Screenshot */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Your Business Analysis</h3>
            <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-600 font-mono truncate">{url}</div>
              </div>
              <div className="bg-white rounded border h-48 overflow-hidden relative">
                <div className="h-full bg-gradient-to-b from-blue-50 to-white p-4">
                  <div className="h-8 bg-gray-200 rounded mb-4 flex items-center px-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <div className="text-xs text-gray-600 font-mono truncate">{url}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                  
                  <div className="mt-6 flex gap-2">
                    <div className="h-8 bg-blue-500 rounded w-20 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">Menu</span>
                    </div>
                    <div className="h-8 bg-gray-300 rounded w-16 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">About</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Download Report */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Compliance Report</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Download your detailed violation analysis with screenshots and legal citations.
              </p>
              <button
                onClick={handleDownloadReport}
                disabled={reportDownloaded}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {reportDownloaded ? 'Downloaded!' : 'Download PDF Report'}
              </button>
            </div>

            {/* Verified Badge */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Verified Badge</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Display your compliance badge to build customer trust and show transparency.
              </p>
              <div className="bg-green-100 rounded p-3 mb-3 flex items-center justify-center">
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-semibold">SB-478 Verified</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                Get Badge Code
              </button>
            </div>
          </div>

          {/* Monitoring Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Ongoing Monitoring Active</span>
            </div>
            <p className="text-blue-700 text-sm mb-2">
              We're continuously monitoring your website for new compliance issues. 
              You'll receive alerts if any problems are detected.
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Clock className="w-4 h-4" />
              <span>Next scan: Tomorrow at 9:00 AM</span>
            </div>
          </div>

          {/* Success Stats */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">34</div>
              <div className="text-sm text-gray-600">lawsuits avoided today by verified businesses</div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 mx-auto"
            >
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
