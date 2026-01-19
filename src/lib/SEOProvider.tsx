import { useMemo } from "react";

interface SEOProduct {
  description: string;
  keywords: string[];
  title: string;
  name: string;
  type: string;
  image?: string; // Absolute URL to image
  url?: string; // Canonical URL
}

export default function SEOProvider({ product }: { product: SEOProduct }) {
  const keywords = useMemo(() => product.keywords.join(","), [product.keywords]);

  // Get absolute URL for current page
  const canonicalUrl = product.url || (typeof window !== 'undefined' ? window.location.href : '');

  // Use absolute URL for images (required for Open Graph)
  const absoluteImageUrl = product.image || `${typeof window !== 'undefined' ? window.location.origin : ''}/favicon-96x96.png`;

  // Generate structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": product.name,
    "description": product.description,
    "url": canonicalUrl,
    "logo": absoluteImageUrl,
    "sameAs": [
      // Add your social media profiles here
      // "https://twitter.com/foxwareden",
      // "https://linkedin.com/company/foxwareden"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    }
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{product.title}</title>
      <meta name="title" content={product.title} />
      <meta name="description" content={product.description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={product.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={product.type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={product.title} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={product.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={product.title} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      {/* <meta name="twitter:site" content="@foxwareden" /> */}
      {/* <meta name="twitter:creator" content="@foxwareden" /> */}

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
      <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />

      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />

      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

