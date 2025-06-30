import { useEffect } from 'react';

export const SEOPerformance: React.FC = () => {
  useEffect(() => {
    // Lazy load images when they enter viewport
    const images = document.querySelectorAll('img[data-lazy]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.lazy || '';
            img.removeAttribute('data-lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    // Prefetch critical resources
    const prefetchResources = [
      '/favicon.png',
      '/attached_assets/network-logo.png',
    ];

    prefetchResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });

    // Add JSON-LD structured data for better SEO
    const addStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Perception Labs",
          "url": "https://perception-labs.com",
          "description": "Simulation based approaches to understanding narrative battlefields and public discourse systems. Ask for a demo to try.",
          "foundingDate": "2024",
          "specialty": ["Perception Systems", "Narrative Modeling", "Network Analysis", "Systems Simulation"],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        });
        document.head.appendChild(script);
      }
    };

    addStructuredData();

    // Remove unused CSS classes for better performance
    const removeUnusedCSS = () => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      // This is a simplified version - in production you'd use tools like PurgeCSS
      stylesheets.forEach(sheet => {
        if (sheet.getAttribute('href')?.includes('unused')) {
          sheet.remove();
        }
      });
    };

    removeUnusedCSS();

  }, []);

  return null;
};

export default SEOPerformance; 