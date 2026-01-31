import { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: 'Laptop Sales, Repairs & IT Support in Srinagar',
  description:
    'Professional laptop sales, repairs, diagnostics, upgrades, and IT support in Srinagar. Transparent guidance, in-store inspection, and expert technical assistance.',

  keywords: [
    'laptop repair Srinagar',
    'laptop sales Srinagar',
    'computer repair Srinagar',
    'IT support Srinagar',
    'laptop upgrades Srinagar',
    'diagnostics and repair Kashmir',
    'business laptop support Srinagar',
  ],

  openGraph: {
    title: 'Laptop Sales & Repairs in Srinagar',
    description:
      'Laptop sales, diagnostics, repairs, upgrades, and professional IT support in Srinagar. Visit the showroom or connect with an expert.',
    url: 'https://techmate-srinagar.netlify.app/services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dlesei0kn/image/upload/v1769869958/Techmate-white_gzqunv.jpg',
        width: 1200,
        height: 630,
        alt: 'Laptop sales and repair services in Srinagar',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Laptop Sales & Repairs in Srinagar',
    description:
      'Professional laptop sales, diagnostics, repairs, upgrades, and IT support in Srinagar.',
    images: [
      'https://res.cloudinary.com/dlesei0kn/image/upload/v1769869958/Techmate-white_gzqunv.jpg',
    ],
  },

  alternates: {
    canonical: 'https://techmate-srinagar.netlify.app/services',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <ServicesClient />
}
