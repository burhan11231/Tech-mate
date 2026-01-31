// app/page.tsx
import type { Metadata } from 'next'
import HomeClient from './HomeClient'

const OG_IMAGE =
  'https://res.cloudinary.com/dlesei0kn/image/upload/v1769876155/techmate-home-og_ovp55x.jpg'

export const metadata: Metadata = {
  title: 'Laptop Sales & IT Services in Srinagar',
  description:
    'Expert guidance and in-store diagnostics, handled personally. Explore our services or connect with the team through our website.',

  alternates: {
    canonical: 'https://techmate-srinagar.netlify.app/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'TECHMATE',

    title: 'Laptop Sales & IT Services in Srinagar',
    description:
      'Expert guidance and in-store diagnostics, handled personally. Explore our services or connect with the team through our website.',

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Laptop Sales & IT Services in Srinagar',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Laptop Sales & IT Services in Srinagar',
    description:
      'Expert guidance and in-store diagnostics, handled personally. Explore our services or connect with the team through our website.',
    images: [OG_IMAGE],
  },
}

export default function Home() {
  return <HomeClient />
}
