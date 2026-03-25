import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  schema?: object;
}

export function useSEO({ title, description, keywords, ogImage, canonical, schema }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta helpers
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.includes("[name=") ? "name" : "property";
        const val = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    if (ogImage) setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Schema
    if (schema) {
      const existing = document.getElementById("page-schema");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "page-schema";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, ogImage, canonical, schema]);
}
