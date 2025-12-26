import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Student Mental Health Support',
  description: 'A supportive AI companion for student mental health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" style={{ height: '100%' }}>
      <body className="h-full" style={{ height: '100%', margin: 0, padding: 0 }}>
        <div style={{ minHeight: '100vh', width: '100%' }}>
          {children}
        </div>
      </body>
    </html>
  )
}

