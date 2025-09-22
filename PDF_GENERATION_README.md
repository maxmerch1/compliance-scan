# PDF Generation System

This system generates dynamic compliance reports as PDFs after successful checkout.

## Architecture

### Files Structure
```
app/
├── assets/
│   ├── templates/
│   │   └── compliance-report.html    # HTML template with placeholders
│   └── violations.json               # 35+ violation types for randomization
├── utils/
│   ├── pdfGenerator.ts               # Core PDF generation logic
│   └── cleanup.ts                    # Cleanup utility for old PDFs
├── api/
│   └── reports/
│       └── [scanId]/
│           └── route.ts              # API endpoint for PDF downloads
├── confirmation/
│   └── page.tsx                      # Confirmation page with download button
└── components/
    └── CheckoutPage.tsx              # Updated to redirect to confirmation
```

### Flow
1. **Checkout Completion** → Generate unique `scanId` → Redirect to `/confirmation?scanId=XYZ`
2. **Confirmation Page** → Display success message → "Download Your Compliance Report" button
3. **Download Button** → Calls `/api/reports/[scanId]` → Streams PDF to user
4. **PDF Generation** → Uses Puppeteer to render HTML template → Saves to `/tmp/reports/`

## Template System

### Placeholders
- `{{scanId}}` - Unique scan identifier
- `{{date}}` - Report generation timestamp
- `{{businessName}}` - Business name from checkout
- `{{ownerName}}` - Owner name from checkout
- `{{email}}` - Business email from checkout
- `{{violationsCount}}` - Number of violations detected
- `{{violationsList}}` - HTML list of violations

### Violations
- 35+ pre-written violation types in `violations.json`
- Randomly selects 2-5 violations per report
- Each report feels unique and realistic

## API Endpoints

### GET `/api/reports/[scanId]`
- **Purpose**: Download generated PDF
- **Headers**: 
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="compliance-report-{scanId}.pdf"`
- **Behavior**: 
  - If PDF exists → Stream it
  - If PDF missing → Generate new one → Stream it

## Security & Cleanup

### File Management
- PDFs stored in `/tmp/reports/` (gitignored)
- Auto-cleanup after 7 days
- Unique filenames prevent conflicts

### Data Privacy
- No sensitive data stored in PDFs
- Placeholder data used for demo
- Real implementation would use database

## Development Notes

### Dependencies
- `puppeteer` - PDF generation
- `fs` - File system operations
- `path` - Path utilities

### Environment
- Works in development and production
- Puppeteer runs headless
- No external dependencies

### Testing
- Generate test PDFs with `test-pdf.js`
- Check `/tmp/reports/` for generated files
- Verify download functionality

## Production Considerations

### Database Integration
- Store checkout data in database
- Link `scanId` to business information
- Implement proper data persistence

### Error Handling
- PDF generation failures
- Missing scan IDs
- File system errors

### Performance
- Consider PDF caching
- Implement cleanup jobs
- Monitor storage usage

### Security
- Validate scan IDs
- Implement rate limiting
- Secure file access

## Usage Example

```typescript
// Generate PDF
const reportData = {
  scanId: 'CBOF-12345-ABC',
  date: 'January 1, 2025 at 2:30 PM',
  businessName: 'Acme Corp',
  ownerName: 'John Doe',
  email: 'john@acme.com',
  violationsCount: 3,
  violationsList: '<li>Hidden fee detected</li><li>Undisclosed surcharge</li>'
}

const pdfPath = await generateComplianceReport(reportData)
```

## Troubleshooting

### Common Issues
1. **Puppeteer fails** → Check Node.js version, install dependencies
2. **PDF not generated** → Check file permissions, directory structure
3. **Download fails** → Verify API route, check file existence
4. **Template not found** → Check file paths, verify template exists

### Debug Steps
1. Check console logs for errors
2. Verify file paths are correct
3. Test PDF generation manually
4. Check browser network tab for API calls
