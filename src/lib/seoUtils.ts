// lib/seoUtils.ts

// Define SEO data interface
export interface SeoData {
    title: string;
    metaDesc: string;
    metaKeywords?: string;
    metaRobotsNoindex: boolean;
    metaRobotsNofollow: boolean;
    canonical?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphUrl?: string;
    opengraphType?: string;
    opengraphSiteName?: string;
    opengraphModifiedTime?: string;
    opengraphPublishedTime?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: {
      url: string;
      altText?: string;
    };
  }
  
  // Define metadata return type
  export interface Metadata {
    title: string;
    description: string;
    keywords?: string;
    robots?: {
      index: boolean;
      follow: boolean;
    };
    openGraph: {
      title: string;
      description: string;
      url?: string;
      type?: string;
      siteName?: string;
      modifiedTime?: string;
      publishedTime?: string;
      images?: Array<{
        url: string;
        alt?: string;
      }>;
    };
    twitter: {
      title: string;
      description: string;
      card?: string;
      image?: string;
    };
    alternates?: {
      canonical?: string;
    };
  }
  
  export function createMetadataFromSeo(seo: SeoData): Metadata {
    return {
      title: seo.title,
      description: seo.metaDesc,
      ...(seo.metaKeywords && { keywords: seo.metaKeywords }),
      robots: {
        index: !seo.metaRobotsNoindex,
        follow: !seo.metaRobotsNofollow,
      },
      openGraph: {
        title: seo.opengraphTitle || seo.title,
        description: seo.opengraphDescription || seo.metaDesc,
        url: seo.opengraphUrl || seo.canonical,
        type: seo.opengraphType,
        siteName: seo.opengraphSiteName,
        ...(seo.opengraphModifiedTime && { modifiedTime: seo.opengraphModifiedTime }),
        ...(seo.opengraphPublishedTime && { publishedTime: seo.opengraphPublishedTime }),
        ...(seo.twitterImage && {
          images: [{
            url: seo.twitterImage.url,
            alt: seo.twitterImage.altText,
          }],
        }),
      },
      twitter: {
        title: seo.twitterTitle || seo.title,
        description: seo.twitterDescription || seo.metaDesc,
        ...(seo.twitterImage && {
          card: 'summary_large_image',
          image: seo.twitterImage.url,
        }),
      },
      ...(seo.canonical && { alternates: { canonical: seo.canonical } }),
    };
  }