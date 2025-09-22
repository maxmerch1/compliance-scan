import { NextRequest, NextResponse } from 'next/server'
import { generateComplianceReport, getRandomViolations, formatViolationsList } from '@/app/utils/pdfGenerator'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ scanId: string }> }
) {
  const resolvedParams = await params
  return handleReportRequest(request, resolvedParams, null)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ scanId: string }> }
) {
  const resolvedParams = await params
  const body = await request.json()
  return handleReportRequest(request, resolvedParams, body)
}

async function handleReportRequest(
  request: NextRequest,
  { scanId }: { scanId: string },
  leadDataFromBody: any
) {
  try {
    
    if (!scanId) {
      return NextResponse.json({ error: 'Scan ID is required' }, { status: 400 })
    }

    const reportsDir = path.join(process.cwd(), 'tmp', 'reports')
    const pdfPath = path.join(reportsDir, `${scanId}.pdf`)

    // Check if PDF already exists
    if (fs.existsSync(pdfPath)) {
      const pdfBuffer = fs.readFileSync(pdfPath)
      
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="compliance-report-${scanId}.pdf"`,
          'Content-Length': pdfBuffer.length.toString(),
        },
      })
    }

    // If PDF doesn't exist, generate it
    // Use lead data from request body or fallback to defaults
    let leadData = {
      businessName: leadDataFromBody?.businessName || 'Your Business Name',
      ownerName: leadDataFromBody?.ownerName || 'Business Owner', 
      email: leadDataFromBody?.email || 'business@example.com'
    }
    
    console.log('PDF Generation - Lead Data:', leadData)
    console.log('PDF Generation - Raw Body:', leadDataFromBody)
    
    const violations = getRandomViolations(Math.floor(Math.random() * 4) + 2) // 2-5 violations
    
    const reportData = {
      scanId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      businessName: leadData.businessName,
      ownerName: leadData.ownerName,
      email: leadData.email,
      violationsCount: violations.length,
      violationsList: formatViolationsList(violations)
    }

    const generatedPdfPath = await generateComplianceReport(reportData)
    const pdfBuffer = fs.readFileSync(generatedPdfPath)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="compliance-report-${scanId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Error serving report:', error)
    return NextResponse.json(
      { error: 'Failed to generate or serve report' },
      { status: 500 }
    )
  }
}
