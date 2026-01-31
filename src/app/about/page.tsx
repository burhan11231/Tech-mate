// src/app/about/page.tsx

import { Metadata } from 'next';
import AboutClient from './AboutClient';
import LocalBusinessSchema from './LocalBusinessSchema';

export const metadata: Metadata = {
  title: 'About TECHMATE | Trusted Laptop Showroom in Srinagar, Kashmir',
  description:
    'Learn about TECHMATE, a trusted laptop showroom in Srinagar, Kashmir since 2020.',

  alternates: {
    canonical: 'https://techmate-srinagar.netlify.app/about',
  },

  openGraph: {
    title: 'About TECHMATE',
    description:
      'Learn about TECHMATE, a trusted laptop showroom in Srinagar, Kashmir.',
    url: 'https://techmate-srinagar.netlify.app/about',
    siteName: 'TECHMATE Gadgets',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dlesei0kn/image/upload/v1769869958/Techmate-white_gzqunv.jpg',
        width: 1200,
        height: 630,
        alt: 'TECHMATE Laptop Showroom in Srinagar',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <LocalBusinessSchema />
      <AboutClient />
    </>
  );
}
