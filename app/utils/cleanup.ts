import fs from 'fs'
import path from 'path'

export function cleanupOldReports() {
  try {
    const reportsDir = path.join(process.cwd(), 'tmp', 'reports')
    
    if (!fs.existsSync(reportsDir)) {
      return
    }

    const files = fs.readdirSync(reportsDir)
    const now = Date.now()
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000) // 7 days in milliseconds

    let deletedCount = 0

    files.forEach(file => {
      if (file.endsWith('.pdf')) {
        const filePath = path.join(reportsDir, file)
        const stats = fs.statSync(filePath)
        
        if (stats.mtime.getTime() < sevenDaysAgo) {
          fs.unlinkSync(filePath)
          deletedCount++
          console.log(`Deleted old report: ${file}`)
        }
      }
    })

    console.log(`Cleanup completed. Deleted ${deletedCount} old reports.`)
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}

// Run cleanup on module load (for development)
// In production, you'd want to run this as a scheduled job
if (process.env.NODE_ENV === 'development') {
  cleanupOldReports()
}
