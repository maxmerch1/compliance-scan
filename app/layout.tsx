import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'All-In Price Compliance Scanner - SB-478 & FTC Junk Fee Rule',
  description: 'Protect your business from hidden fee violations. Automated compliance scanning for California SB-478 and FTC Junk Fee Rule enforcement.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
