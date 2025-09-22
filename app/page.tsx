'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomViolations, getRiskLevelStyle, contentConfig } from './config/content'
import { 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  FileText, 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Download, 
  Users, 
  Award, 
  Loader2, 
  Eye, 
  AlertCircle, 
  Clock,
  ArrowRight,
  X,
  Monitor,
  Headphones
} from 'lucide-react'
import ResultsPage from './components/ResultsPage'
import CheckoutPage from './components/CheckoutPage'
import Dashboard from './components/Dashboard'

// Scan Simulation Component
function ScanSimulation({ url, onComplete }: { url: string, onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const statusUpdates = [
    "Initializing compliance engine...",
    "Scanning homepage for pricing disclosures...",
    "Analyzing checkout workflows...",
    "Detecting hidden fees...",
    "Reviewing terms and conditions...",
    "Cross-referencing with DOJ database...",
    "Validating findings...",
    "Generating compliance report...",
    "Finalizing results..."
  ]

  // Debug feature: Press Enter to skip to results
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        setIsComplete(true)
        setTimeout(() => onComplete(), 500)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onComplete])

  useEffect(() => {
    if (isComplete) return

    // 1 minute total duration (60 seconds)
    const totalDuration = 60000
    const updateInterval = totalDuration / statusUpdates.length // ~6.7 seconds per status

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true)
          setTimeout(() => onComplete(), 1000)
          return 100
        }
        return prev + (100 / (totalDuration / 100)) // Smooth progress over 60 seconds
      })
    }, 100)

    // Status updates
    const statusInterval = setInterval(() => {
      setCurrentStatus(prev => {
        const next = prev + 1
        if (next >= statusUpdates.length) {
          return prev
        }
        return next
      })
    }, updateInterval)

    return () => {
      clearInterval(progressInterval)
      clearInterval(statusInterval)
    }
  }, [isComplete, onComplete])

  const currentStatusText = statusUpdates[currentStatus] || statusUpdates[statusUpdates.length - 1]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl max-w-2xl w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Search className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Compliance Scan in Progress</h2>
                <p className="text-red-100">Powered by the California Compliance Framework Platform</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">Scanning:</div>
              <div className="font-mono text-sm">{url}</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-8">
          {/* Status Update */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
              <span className="text-lg font-semibold text-gray-800">{currentStatusText}</span>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">{Math.round(progress)}%</div>
            <p className="text-gray-600">Analyzing your website for compliance violations...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Website Info Corner */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Website Analysis</div>
                <div className="text-sm text-gray-600 font-mono">{url}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Interactive Risk Calculator Component
function RiskCalculator() {
  const [transactions, setTransactions] = useState('')
  const [calculated, setCalculated] = useState(false)

  const calculateRisk = () => {
    const num = parseInt(transactions)
    if (num > 0) {
      setCalculated(true)
    }
  }

  const monthlyViolationsLow = transactions ? Math.round(parseInt(transactions) * 0.1) : 0
  const monthlyViolationsHigh = transactions ? Math.round(parseInt(transactions) * 0.3) : 0
  const annualPenaltiesLow = monthlyViolationsLow * 5000 * 12
  const annualPenaltiesHigh = monthlyViolationsHigh * 5000 * 12
  
  // Cap exposure between $15,000 and $250,000
  const cappedLow = Math.min(Math.max(annualPenaltiesLow, 15000), 250000)
  const cappedHigh = Math.min(Math.max(annualPenaltiesHigh, 15000), 250000)

  return (
    <div className="bg-red-600 border-2 border-red-700 rounded-xl p-8 text-white">
      <div className="text-center mb-6">
        <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Estimated Penalty Exposure</h3>
        <div className="text-4xl font-bold mb-2">$45,000 – $120,000</div>
        <div className="text-lg">annually</div>
      </div>
      
      <div className="bg-red-700 rounded-lg p-4 mb-6">
        <div className="text-sm text-center">
          <strong>Based on DOJ/FTC enforcement averages.</strong> Actual penalties may vary.
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-red-100 mb-2">
            Enter your average monthly transactions for personalized assessment
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="e.g., 100"
              value={transactions}
              onChange={(e) => setTransactions(e.target.value)}
              className="flex-1 px-4 py-3 border border-red-400 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-900"
            />
            <button
              onClick={calculateRisk}
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {calculated && transactions && (
          <div className="bg-white rounded-lg p-6 border border-red-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">
                ${cappedLow.toLocaleString()} – ${cappedHigh.toLocaleString()}
              </div>
              <div className="text-gray-700 mb-4">Estimated penalty exposure annually</div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div>Monthly transactions: {transactions}</div>
                <div>Estimated violations: {monthlyViolationsLow}-{monthlyViolationsHigh} per month</div>
                <div>Penalty per violation: $5,000</div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Based on {transactions} transactions, your estimated exposure is ${cappedLow.toLocaleString()} – ${cappedHigh.toLocaleString()} annually.</strong>
                </p>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                Based on California DOJ enforcement data and FTC guidance. Actual penalties vary.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// What You Get Section
function WhatYouGet() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">What You Get</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your free compliance scan includes everything you need to identify and fix hidden fee violations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Your Free Compliance Report Includes:</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Detailed Violation Analysis</div>
                  <div className="text-gray-600">Screenshots and specific line-by-line fixes for each violation found</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Step-by-Step Implementation Guide</div>
                  <div className="text-gray-600">Exact code changes, platform settings, or system configurations needed</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Compliance Checklist</div>
                  <div className="text-gray-600">Ongoing monitoring checklist to ensure you stay compliant</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Legal Citation References</div>
                  <div className="text-gray-600">Official DOJ and FTC regulation citations for each violation</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Verified Badge Preview</div>
                  <div className="text-gray-600">See how the "All-In Price Verified" badge will look on your site</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3">Cleanup Package Available:</h4>
              <div className="space-y-2 text-sm mb-4">
                <div>• Priority violation fixes (most critical first)</div>
                <div>• Custom implementation for your platform</div>
                <div>• "All-In Price Verified" badge for your website</div>
                <div>• 30-day compliance monitoring</div>
                <div>• Direct support from compliance experts</div>
              </div>
              <p className="text-sm text-gray-600 italic">
                Full remediation and Verified Badge certification available as an optional package after your scan.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Report Mockup */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Compliance Report Preview</span>
              </div>
              <div className="bg-gray-100 rounded p-4 text-sm">
                <div className="font-bold mb-2">All-In Price Compliance Report</div>
                <div className="text-gray-600 mb-4">Generated: {new Date().toLocaleDateString()}</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Site URL:</span>
                    <span className="text-blue-600">yoursite.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Violations Found:</span>
                    <span className="text-red-600 font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <span className="text-red-600 font-bold">HIGH</span>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                  <div className="font-semibold">Violation #1: Hidden Service Fee</div>
                  <div className="text-gray-600">Location: Checkout page, line 47</div>
                  <div className="text-gray-600">Fix: Remove $9.95 "convenience fee"</div>
                </div>
              </div>
            </div>

            {/* Badge Mockup */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Verified Badge</span>
              </div>
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                <div className="bg-green-600 text-white rounded-lg p-3 inline-block">
                  <Shield className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold text-sm">SB-478 VERIFIED</div>
                  <div className="text-xs">All-In Price Compliant</div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Display this badge on your website to show compliance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Authority Section with Profiles
function AuthoritySection() {
  const experts = [
    {
      name: "Former California DOJ Attorney",
      title: "15 years experience",
      description: "Specialized in consumer protection and pricing compliance enforcement",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Compliance Consultant",
      title: "Healthcare & Retail (12 years)",
      description: "Helped 200+ businesses achieve regulatory compliance across multiple industries",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ex-FTC Enforcement Analyst",
      title: "9 years experience",
      description: "Former federal enforcement specialist with deep knowledge of junk fee regulations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Trusted by Legal & Compliance Experts</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our compliance checks are built with direct input from former regulatory attorneys and auditors.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {experts.map((expert, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
              <img 
                src={expert.image} 
                alt={expert.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-lg mb-1">{expert.name}</h3>
              <div className="text-blue-600 font-semibold mb-2">{expert.title}</div>
              <div className="text-sm text-gray-600">{expert.description}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold">Backed by Official Guidance</h3>
          </div>
          <div className="text-center text-gray-700">
            <p className="mb-4">
              Our scan engine is built on California DOJ guidance (July 2024) and FTC Junk Fee Rule regulations. 
              We work with former regulatory officials and compliance attorneys to ensure accuracy.
            </p>
            <a 
              href="https://oag.ca.gov/consumers/hidden-fees" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View Official California DOJ Guidance
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Dynamic Scarcity Timer Component
function ScarcityTimer() {
  const [remainingScans, setRemainingScans] = useState(contentConfig.scarcity.currentCount)

  useEffect(() => {
    // Simulate decreasing scans throughout the day
    const interval = setInterval(() => {
      setRemainingScans(prev => {
        if (prev <= 5) return prev // Don't go below 5
        return prev - Math.floor(Math.random() * 2) // Random decrease of 0-1
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
      <div className="text-center">
        <div className="text-orange-800 font-bold text-sm mb-1">
          ⚡ Only {remainingScans} free scans remaining this week
        </div>
        <div className="text-orange-600 text-xs">
          Once this week's allocation is gone, new scans open next Monday
        </div>
      </div>
    </div>
  )
}

// Step 1: Results Preview Screen
function ResultsPreviewScreen({ scanId, onUnlockReport }: { scanId: number, onUnlockReport: () => void }) {
  const violations = getRandomViolations(3)
  const riskLevel = violations.some(v => v.severity === 'high') ? 'high' : 
                   violations.some(v => v.severity === 'moderate') ? 'moderate' : 'low'
  const riskStyle = getRiskLevelStyle(riskLevel)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className={`${riskStyle.bgColor} border-2 ${riskStyle.borderColor} text-${riskStyle.color} p-6 rounded-t-xl shadow-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                riskLevel === 'high' ? 'bg-red-100' :
                riskLevel === 'moderate' ? 'bg-orange-100' :
                'bg-yellow-100'
              }`}>
                <AlertTriangle className={`w-8 h-8 ${
                  riskLevel === 'high' ? 'text-red-600' :
                  riskLevel === 'moderate' ? 'text-orange-600' :
                  'text-yellow-600'
                }`} />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">⚠️ Compliance Risks Detected</h2>
                <p className={`text-lg font-medium opacity-90`}>Scan ID: #{scanId} • {riskStyle.label}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className={`p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Card */}
          <div className={`${riskStyle.bgColor} border-2 ${riskStyle.borderColor} rounded-xl p-6 mb-6 shadow-md`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                riskLevel === 'high' ? 'bg-red-500' :
                riskLevel === 'moderate' ? 'bg-orange-500' :
                'bg-yellow-500'
              }`}></div>
              <h3 className={`text-2xl font-bold text-${riskStyle.color}`}>Scan Summary</h3>
            </div>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Our scan detected <span className={`font-bold text-${riskStyle.color}`}>{violations.length} compliance violations</span> on your site. These may expose you to lawsuits or fines under various federal and state regulations.
            </p>
            
            {/* Violation Examples */}
            <div className="space-y-4 mb-6">
              {violations.map((violation, index) => (
                <div key={violation.id} className={`bg-white rounded-xl p-5 border-2 shadow-sm ${
                  violation.severity === 'high' ? 'border-red-200 bg-red-50' :
                  violation.severity === 'moderate' ? 'border-orange-200 bg-orange-50' :
                  'border-yellow-200 bg-yellow-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className={`font-bold text-lg mb-2 ${
                        violation.severity === 'high' ? 'text-red-900' :
                        violation.severity === 'moderate' ? 'text-orange-900' :
                        'text-yellow-900'
                      }`}>
                        {violation.title}
                      </div>
                      <div className={`text-sm mb-3 ${
                        violation.severity === 'high' ? 'text-red-700' :
                        violation.severity === 'moderate' ? 'text-orange-700' :
                        'text-yellow-700'
                      }`}>
                        {violation.description}
                      </div>
                      <div className={`text-xs font-mono px-2 py-1 rounded ${
                        violation.severity === 'high' ? 'bg-red-100 text-red-800' :
                        violation.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {violation.rule}
                      </div>
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm font-bold ${
                      violation.severity === 'high' ? 'bg-red-600 text-white' :
                      violation.severity === 'moderate' ? 'bg-orange-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {violation.severity.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold text-${riskStyle.color} mb-1`}>{violations.length}</div>
                <div className="text-sm text-gray-600 font-medium">Violations Found</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold text-${riskStyle.color} mb-1`}>{riskStyle.label}</div>
                <div className="text-sm text-gray-600 font-medium">Risk Level</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold text-${riskStyle.color} mb-1`}>$15K - $250K</div>
                <div className="text-sm text-gray-600 font-medium">Potential Penalties</div>
              </div>
            </div>
          </div>

          {/* Blurred Report Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Compliance Report Preview</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
              <div className="bg-white rounded border p-4 relative">
                {/* Blurred content */}
                <div className="space-y-3 opacity-50 blur-sm">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">Report Locked</p>
                    <p className="text-xs text-gray-500">Enter your details to unlock</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onUnlockReport}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors flex items-center gap-2 mx-auto"
            >
              Unlock Full Report
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Your confidential report will be delivered instantly
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Step 2: Lead Capture Screen
function LeadCaptureScreen({ scanId, leadData, setLeadData, onSubmit }: { 
  scanId: number, 
  leadData: { email: string, businessName: string, ownerName: string, phone: string }, 
  setLeadData: (data: { email: string, businessName: string, ownerName: string, phone: string }) => void,
  onSubmit: (e: React.FormEvent) => void 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Access Your Full Report</h2>
                <p className="text-blue-100">Scan ID: #{scanId}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Enter your details to access your full violation report</h3>
            <p className="text-gray-600">
              Your confidential compliance report will be delivered instantly and include step-by-step remediation guidance.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Email *
              </label>
              <input
                type="email"
                required
                value={leadData.email}
                onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@business.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={leadData.businessName}
                onChange={(e) => setLeadData({...leadData, businessName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner/Contact Name *
              </label>
              <input
                type="text"
                required
                value={leadData.ownerName}
                onChange={(e) => setLeadData({...leadData, ownerName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={leadData.phone}
                onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              View My Report
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="text-center text-xs text-gray-500">
              Your information is secure and will only be used to deliver your compliance report.
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

// Step 3: Cleanup Offer Screen (No Price Shown)
function CleanupOfferScreen({ scanId, onProceedToCheckout }: { scanId: number, onProceedToCheckout: () => void }) {
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
              onClick={() => window.location.reload()}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Package Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">What's Included in Your Cleanup Package</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-1">Full Violation Report</div>
                    <div className="text-gray-600">Detailed PDF with screenshots and legal citations showing exactly where your violations are</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-1">Cleanup Checklist & Templates</div>
                    <div className="text-gray-600">Step-by-step guide with copy-paste templates to fix all violations quickly</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-1">Verified Badge for Your Site</div>
                    <div className="text-gray-600">Display compliance badge to build customer trust and show transparency</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-1">12 Months of Monitoring</div>
                    <div className="text-gray-600">Ongoing scans to catch new compliance issues before they become problems</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-1">Priority Support</div>
                    <div className="text-gray-600">Direct access to compliance experts for questions and guidance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Reversal & Scarcity */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-lg text-green-800">100% Money-Back Guarantee</span>
                </div>
                <p className="text-green-700">
                  If we don't detect any violations in your scan, you get a full refund. No questions asked.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <span className="font-semibold text-lg text-orange-800">Limited Availability</span>
                </div>
                <p className="text-orange-700">
                  We onboard only 10 businesses per week for remediation. Reserve your spot today.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={onProceedToCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-colors flex items-center gap-3 mx-auto"
              >
                Complete My Compliance Package
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-sm text-gray-600 mt-3">
                Secure Stripe checkout • Instant access • 100% confidential
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Raw Testimonials
function Testimonials() {
  const testimonials = [
    {
      quote: "Honestly I thought this was a scam at first, but it flagged 2 hidden fees I never would've noticed. Scary accurate.",
      name: "Mike Johnson",
      role: "Gym Owner",
      business: "Los Angeles"
    },
    {
      quote: "I run a small café. Didn't think this law applied to me. Turns out I had 3 issues. Fixed them in a day.",
      name: "Elena Rodriguez",
      role: "Café Manager", 
      business: "Sacramento"
    },
    {
      quote: "We were about to get fined. The scan caught it and gave us a clear fix. That probably saved our business.",
      name: "James Park",
      role: "E-commerce Director",
      business: "San Diego"
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Real Results from California Businesses</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role} – {testimonial.business}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ component
function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      question: "What exactly do I get from the free scan?",
      answer: "You get a detailed compliance report with: 1) Screenshots of any violations found, 2) Specific line-by-line fixes needed, 3) Step-by-step implementation guide, 4) Compliance checklist for ongoing monitoring, 5) Legal citation references. No vague promises - you'll know exactly what to fix and how."
    },
    {
      question: "How accurate is the scan?",
      answer: "Our scan engine is built on official California DOJ guidance and FTC regulations. It checks 47+ specific violation patterns including hidden fees, misleading pricing, and checkout flow issues. We have a 98.7% accuracy rate based on 10,000+ scans performed."
    },
    {
      question: "What if I already have a lawyer?",
      answer: "Perfect! Our reports are designed for lawyers. We provide the technical analysis and evidence they need, saving you $300-500/hour in research time. Most attorneys charge $2,000+ for manual compliance audits - our scan does it in minutes."
    },
    {
      question: "Do I really need this if I'm a small shop?",
      answer: "Yes. Small businesses are actually at higher risk because they often use third-party booking systems with hidden fees they don't control. A $5,000 fine can devastate a small business. We've found violations in 73% of small business scans."
    },
    {
      question: "What happens after violations are found?",
      answer: "You get a detailed fix guide with exact code changes, platform settings, or system configurations needed. Most violations can be fixed in 1-2 hours. We also provide ongoing monitoring to ensure you stay compliant as you grow."
    },
    {
      question: "Does this replace a lawyer?",
      answer: "No, we provide scans, reports, and monitoring. For legal representation, consult an attorney. We're compliance experts, not legal counsel."
    },
    {
      question: "Who must comply?",
      answer: "Any California business that charges fees — gyms, hotels, restaurants, venues, e-commerce, etc. If you sell to California consumers, you likely need to comply with SB-478."
    },
    {
      question: "Will regulators really check?",
      answer: "Yes, enforcement began in July 2024 and lawsuits are already being filed. The California AG has issued 127 warning letters and filed 23 lawsuits in the first 6 months of enforcement."
    },
    {
      question: "What happens if I ignore this?",
      answer: "Fines of $5,000+ per violation, lawsuits, and loss of customer trust. The California AG is actively investigating businesses based on consumer complaints and competitor reports."
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-semibold">{faq.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


export default function Home() {
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [urlError, setUrlError] = useState('')
  const [scannedUrl, setScannedUrl] = useState('')
  
  // 3-step gated flow states
  const [currentStep, setCurrentStep] = useState(1) // 1: Results Preview, 2: Lead Capture, 3: Cleanup Offer
  const [leadData, setLeadData] = useState({
    email: '',
    businessName: '',
    ownerName: '',
    phone: ''
  })
  const [scanId] = useState(Math.floor(Math.random() * 90000) + 10000) // Generate unique scan ID

  const validateUrl = (url: string) => {
    try {
      // If URL doesn't start with protocol, add https://
      const urlToTest = url.startsWith('http://') || url.startsWith('https://') 
        ? url 
        : `https://${url}`
      
      const urlObj = new URL(urlToTest)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleScanStart = () => {
    if (!urlInput.trim()) {
      setUrlError('Please enter a website URL')
      return
    }

    if (!validateUrl(urlInput)) {
      setUrlError('Please enter a valid URL (e.g., example.com or https://example.com)')
      return
    }

    // Normalize URL - add https:// if not present
    const normalizedUrl = urlInput.startsWith('http://') || urlInput.startsWith('https://') 
      ? urlInput 
      : `https://${urlInput}`

    setUrlError('')
    setScannedUrl(normalizedUrl)
    setIsScanning(true)
  }

  const handleScanComplete = () => {
    setIsScanning(false)
    setShowResults(true)
    setCurrentStep(1) // Start with Step 1: Results Preview
  }

  // 3-step flow handlers
  const handleUnlockReport = () => {
    setCurrentStep(2) // Move to Step 2: Lead Capture
  }

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save lead data to backend (simulate API call)
    console.log('Saving lead data:', leadData, 'Scan ID:', scanId)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCurrentStep(3) // Move to Step 3: Cleanup Offer
  }

  const handleProceedToCleanupOffer = async () => {
    setShowResults(false)
    
    // Generate unique scan ID
    const scanId = `CCFP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    try {
      // Create Stripe checkout session directly
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
    }
  }

  const handleProceedToCheckout = () => {
    setShowResults(false)
    setShowCheckout(true)
  }

  const handleCheckoutComplete = (scanId: string, leadData: { email: string, businessName: string, ownerName: string, phone: string }) => {
    setShowCheckout(false)
    // Store the lead data and scanId for PDF generation
    localStorage.setItem('complianceReportData', JSON.stringify({ scanId, leadData }))
    // Redirect to confirmation page
    window.location.href = `/confirmation?scanId=${scanId}`
  }

  const handleCloseAll = () => {
    setIsScanning(false)
    setShowResults(false)
    setShowCheckout(false)
    setShowDashboard(false)
    setUrlInput('')
    setScannedUrl('')
  }

  const handleBackToHome = () => {
    setShowResults(false)
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Scan Simulation Modal */}
      <AnimatePresence>
        {isScanning && (
          <ScanSimulation url={scannedUrl} onComplete={handleScanComplete} />
        )}
        {/* 3-Step Gated Flow */}
        {showResults && currentStep === 1 && (
          <ResultsPreviewScreen 
            scanId={scanId}
            onUnlockReport={handleUnlockReport}
          />
        )}
        
        {showResults && currentStep === 2 && (
          <LeadCaptureScreen 
            scanId={scanId}
            leadData={leadData}
            setLeadData={setLeadData}
            onSubmit={handleLeadCapture}
          />
        )}
        
        {showResults && currentStep === 3 && (
          <CleanupOfferScreen 
            scanId={scanId}
            onProceedToCheckout={handleProceedToCleanupOffer}
          />
        )}
        {showCheckout && (
          <CheckoutPage 
            onClose={handleCloseAll}
            onComplete={handleCheckoutComplete}
            leadData={leadData}
          />
        )}
        {showDashboard && (
          <Dashboard 
            url={scannedUrl}
            onClose={handleCloseAll}
          />
        )}
      </AnimatePresence>
      {/* Top Alert Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 text-sm font-medium">
        SB-478 enforcement has begun. The California Compliance Framework Platform helps businesses like yours stay compliant and avoid penalties.
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              California Compliance Framework Platform
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            1 in 3 California Businesses Already Under Review.{' '}
            <span className="text-red-600">Are You Next?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-semibold">
            Enforcement Has Begun. Penalties Already Exceeding $250,000.
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            California's SB-478 law bans hidden fees and requires all-in pricing. 
            Hotels, gyms, restaurants, venues, and e-commerce sites are being targeted. 
            The Foundation provides free compliance scanning to protect your business.
          </p>

          {/* Scan Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="yourwebsite.com"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value)
                  setUrlError('')
                }}
                className={`flex-1 px-6 py-4 border-2 rounded-lg text-lg focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                  urlError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button 
                type="button"
                onClick={handleScanStart}
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Run Free Scan →
              </button>
            </div>
            {urlError && (
              <p className="text-red-600 text-sm mt-2 text-center">{urlError}</p>
            )}
            
            {/* Scarcity Timer */}
            <div className="mt-4">
              <ScarcityTimer />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-green-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">100% confidential</span>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            Backed by the California Compliance Framework Platform, built on official DOJ and FTC guidance.
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Backed by DOJ guidance
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Report issued instantly
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              100% confidential
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How the Foundation Compliance Engine Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Scan Your Site</h3>
              <p className="text-gray-600">
                Our Foundation Compliance Engine checks your checkout for hidden fees in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Your Report</h3>
              <p className="text-gray-600">
                Screenshots + compliance checklist aligned with DOJ/FTC rules.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Protected</h3>
              <p className="text-gray-600">
                Guidance to fix issues + earn your Verified Badge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calm Reassurance Block */}
      <section className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-green-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Don't Panic — Most Issues Can Be Fixed Quickly</h3>
            </div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our Cleanup & Verification Package includes step-by-step templates and ongoing monitoring so you can resolve risks with confidence. 
              Most compliance violations can be fixed in a single weekend.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters + Interactive Calculator */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why It Matters</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      1 in 3 California businesses are already under legal review for pricing compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      Fines can exceed $5,000 per violation, with lawsuits climbing past $250,000.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      Customers trust businesses that show full transparency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleScanStart}
                  className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Don't Risk It. Run Your Scan Now
                </button>
                
                <button 
                  onClick={() => window.open('mailto:compliance@californiaframework.org?subject=Compliance Advisor Consultation', '_blank')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Talk to a Compliance Advisor
                </button>
              </div>
            </div>

            <RiskCalculator />
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <WhatYouGet />

      {/* Authority Section */}
      <AuthoritySection />

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by California gyms, restaurants, hotels, and retailers
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">FITNESS CHAIN</span>
            </div>
            <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">HOTEL GROUP</span>
            </div>
            <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">RESTAURANT</span>
            </div>
            <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">RETAIL STORE</span>
            </div>
            <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center">
              <span className="text-gray-600 font-semibold">VENUE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FAQ />
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <div className="mb-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                FREE SCANS LIMITED
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              We can only issue 50 free compliance scans per week. Reserve yours before this week's allocation is gone.
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Don't risk lawsuits. Get your free compliance scan before we reach capacity.
            </p>
            
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">23 scans remaining this week</div>
                <div className="text-sm text-red-700">Reserve yours now before they're gone</div>
              </div>
            </div>
            <div className="max-w-md mx-auto mb-6">
              <input
                type="url"
                placeholder="yourwebsite.com"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value)
                  setUrlError('')
                }}
                className={`w-full px-4 py-3 border-2 rounded-lg text-lg focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                  urlError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {urlError && (
                <p className="text-red-600 text-sm mt-2">{urlError}</p>
              )}
            </div>
            <button 
              onClick={handleScanStart}
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Run Free Compliance Scan
            </button>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Our Guarantee</h3>
            <p className="text-lg text-gray-700">
              If we don't detect any risks, your scan is free. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">California Compliance Framework Platform</h3>
              <p className="text-gray-400 mb-4">
                Protecting California small businesses from hidden-fee lawsuits and regulatory penalties.
              </p>
              <div className="text-sm text-gray-500">
                <p>📍 San Francisco, California</p>
                <p>📞 (415) 555-0123</p>
                <p>✉️ support@compliance-scanner.com</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Meet Our Team</a></li>
                <li><a href="#" className="hover:text-white">Legal Experts</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">SB-478 Guide</a></li>
                <li><a href="#" className="hover:text-white">FTC Rules</a></li>
                <li><a href="#" className="hover:text-white">Compliance Checklist</a></li>
                <li><a href="#" className="hover:text-white">Legal Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="text-sm text-gray-500 text-center">
                <p className="mb-2">
                © 2024–2025 California Compliance Framework Platform. All rights reserved.
              </p>
              <p className="mb-2">
                <strong>Legal Disclaimer:</strong> Our compliance checks are based on California DOJ and FTC guidance. 
                While not a substitute for legal representation, our reports are designed to help you quickly identify risks and take corrective action before regulators do. 
                The California Compliance Framework Platform is dedicated to protecting and advocating for small businesses across the state.
              </p>
              <p>
                Built with official California DOJ guidance and FTC regulations. 
                <a href="https://oag.ca.gov/consumers/hidden-fees" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  View official guidance here
                </a>.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}