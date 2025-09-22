// Content configuration for the compliance landing page
export const contentConfig = {
  // Violation examples with realistic rule codes
  violations: [
    {
      id: 'ada-title-iii',
      title: 'ADA Title III – Missing Alt Text on Images',
      description: 'Images lack descriptive alt text for screen readers',
      severity: 'high',
      rule: 'ADA Title III, Section 36.303'
    },
    {
      id: 'sb-474-cookies',
      title: 'California SB-474 – Cookie Banner Missing Consent Options',
      description: 'Cookie consent banner lacks proper opt-in/opt-out options',
      severity: 'high',
      rule: 'California SB-474, Civil Code 1798.140'
    },
    {
      id: 'doj-accessibility',
      title: 'DOJ Website Compliance – Missing Accessibility Statement',
      description: 'Website lacks required accessibility statement and contact info',
      severity: 'moderate',
      rule: 'DOJ ADA Compliance Guidelines'
    },
    {
      id: 'ccpa-privacy',
      title: 'CCPA Privacy Policy – Missing Consumer Rights Section',
      description: 'Privacy policy lacks required CCPA consumer rights disclosure',
      severity: 'moderate',
      rule: 'CCPA Civil Code 1798.100-1798.199'
    },
    {
      id: 'ftc-pricing',
      title: 'FTC Pricing Disclosure – Hidden Fees in Checkout',
      description: 'Additional fees not clearly disclosed before checkout',
      severity: 'high',
      rule: 'FTC Act Section 5, 15 U.S.C. § 45'
    },
    {
      id: 'ada-navigation',
      title: 'ADA Navigation – Missing Skip Links',
      description: 'Website lacks skip navigation links for keyboard users',
      severity: 'moderate',
      rule: 'ADA Title III, Section 36.303'
    }
  ],

  // Risk levels and colors
  riskLevels: {
    high: {
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
      label: 'High Risk'
    },
    moderate: {
      color: '#f97316',
      bgColor: '#fff7ed',
      borderColor: '#fed7aa',
      label: 'Moderate Risk'
    },
    low: {
      color: '#eab308',
      bgColor: '#fefce8',
      borderColor: '#fde047',
      label: 'Low Risk'
    }
  },

  // Scarcity timer settings
  scarcity: {
    weeklyLimit: 50,
    currentCount: 23, // This will be dynamic
    resetDay: 'monday'
  },

  // Contact information
  contact: {
    advisorEmail: 'compliance@californiaframework.org',
    calendlyLink: 'https://calendly.com/compliance-advisor',
    phone: '1-800-COMPLIANCE'
  },

  // Testimonials for checkout modal
  testimonials: [
    {
      quote: "This saved us from a $50K lawsuit. The templates made fixing everything so easy.",
      author: "Sarah M.",
      role: "Restaurant Owner",
      location: "Los Angeles"
    },
    {
      quote: "We had no idea about these violations. Fixed them all in one weekend.",
      author: "Mike R.",
      role: "Gym Owner", 
      location: "San Diego"
    },
    {
      quote: "The ongoing monitoring gives us peace of mind. Worth every penny.",
      author: "Jennifer L.",
      role: "E-commerce Director",
      location: "San Francisco"
    }
  ]
}

// Helper function to get random violations
export function getRandomViolations(count = 3) {
  const shuffled = [...contentConfig.violations].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, contentConfig.violations.length))
}

// Helper function to get risk level styling
export function getRiskLevelStyle(level) {
  return contentConfig.riskLevels[level] || contentConfig.riskLevels.moderate
}
