import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export interface ReportData {
  scanId: string;
  date: string;
  businessName: string;
  ownerName: string;
  email: string;
  violationsCount: number;
  violationsList: string;
}

export async function generateComplianceReport(data: ReportData): Promise<string> {
  try {
    // Ensure reports directory exists
    const reportsDir = path.join(process.cwd(), 'tmp', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Load HTML template
    const templatePath = path.join(process.cwd(), 'app', 'assets', 'templates', 'compliance-report.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace(/\{\{scanId\}\}/g, data.scanId)
      .replace(/\{\{date\}\}/g, data.date)
      .replace(/\{\{businessName\}\}/g, data.businessName)
      .replace(/\{\{ownerName\}\}/g, data.ownerName)
      .replace(/\{\{email\}\}/g, data.email)
      .replace(/\{\{violationsCount\}\}/g, data.violationsCount.toString())
      .replace(/\{\{violationsList\}\}/g, data.violationsList);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set content and wait for fonts to load
    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfPath = path.join(reportsDir, `${data.scanId}.pdf`);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();

    return pdfPath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate compliance report');
  }
}

export function getRandomViolations(count: number = 3): string[] {
  const violationsPath = path.join(process.cwd(), 'app', 'assets', 'violations.json');
  const violations = JSON.parse(fs.readFileSync(violationsPath, 'utf8'));
  
  // Shuffle and select random violations
  const shuffled = violations.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, violations.length));
}

export function formatViolationsList(violations: string[]): string {
  return violations.map(violation => `<li>${violation}</li>`).join('\n            ');
}
