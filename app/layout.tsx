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
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body className="min-h-screen w-full m-0 p-0 overflow-hidden bg-black">
      {children}
    </body>
  </html>
)
}

