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
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}

