import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl = 'https://suret.kg',
  ogType = 'website',
  ogImage = '/images/suret-og-image.jpg', // Default OG image
}) => {
  const siteUrl = 'https://suret.kg';
  const fullCanonicalUrl = `${siteUrl}${canonicalUrl !== siteUrl ? canonicalUrl : ''}`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={`${siteUrl}${ogImage}`} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />}
      
      {/* Additional metadata for better SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Russian" />
      <meta name="geo.region" content="KG" />
      <meta name="geo.placename" content="Kyrgyzstan" />
    </Helmet>
  );
};

export default SEO;
