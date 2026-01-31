// src/app/about/LocalBusinessSchema.tsx

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',

    name: 'TECHMATE',
    url: 'https://techmate-srinagar.netlify.app/',

    logo:
      'https://res.cloudinary.com/dlesei0kn/image/upload/v1769869958/Techmate-white_gzqunv.jpg',

    image:
      'https://res.cloudinary.com/dlesei0kn/image/upload/v1769869958/Techmate-white_gzqunv.jpg',

    description:
      "TECHMATE is a trusted laptop showroom in Srinagar, Kashmir, offering transparent laptop sales, diagnostics, and upgrades since 2020.",

    telephone: '+91 7006113695',
    email: 'info@techmate.com',

    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chanapora Bypass Road, Bagh-i-Mehtab, Srinagar, Jammu and Kashmir 190019',
      addressLocality: 'Srinagar',
      addressRegion: 'Jammu and Kashmir',
      addressCountry: 'IN',
    },

    sameAs: [
      'https://instagram.com',
      'https://facebook.com',
      'https://twitter.com',
      'https://linkedin.com',
      'https://youtube.com',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
