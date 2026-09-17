import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical = 'https://nxtgnsports.ca/',
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // 1. Set Document Title
    document.title = title;

    // 2. Set or update standard meta tags
    const setMeta = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Set or update canonical link
    const setCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMeta('name', 'description', description);
    setCanonical(canonical);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'Next Gen Sports');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Schema.org Structured Data
    const SCRIPT_ID = 'route-structured-data';
    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = SCRIPT_ID;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonical, ogType, schema]);

  return null;
};

export default SEO;
