// app/layout.tsx
import type { Metadata } from 'next'
import { Provider } from './provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CopyrightStamp from '@/components/CopyrightStamp'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trusted Laptop Showroom & IT Services in Srinagar',
  description:
    "Kashmir's Tech Authority Since 2020. Professional laptop sales, repairs, and IT services in Srinagar.",

  alternates: {
    canonical: 'https://techmate-srinagar.netlify.app/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#111827" />
      </head>

      <body className="bg-white text-gray-900 antialiased">
        <Provider>
          <Header />

          <main className="min-h-screen">{children}</main>

          <Footer />
        </Provider>

        {/* Global Preview Protection */}
        <CopyrightStamp />
      </body>
    </html>
  )
}
