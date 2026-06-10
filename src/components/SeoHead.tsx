// src/components/SeoHead.tsx
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useT } from "@/lib/i18n";

/** Map a pathname to a logical page key for SEO lookup. */
function pathnameToPageKey(pathname: string): keyof typeof PAGE_KEY_FALLBACK {
  const m: Record<string, keyof typeof PAGE_KEY_FALLBACK> = {
    "/": "home",
    "/bidai": "home",
    "/roller": "roller",
    "/bidai/roller": "roller",
    "/venetian": "venetian",
    "/bidai/venetian": "venetian",
    "/vertisheer": "vertisheer",
    "/bidai/vertisheer": "vertisheer",
    "/process": "process",
    "/bidai/proses": "process",
    "/configurator": "configurator",
    "/bidai/reka": "configurator",
    "/contact": "contact",
    "/bidai/hubungi": "contact",
    "/blog": "blog",
    "/bidai/jurnal": "blog",
  };
  if (m[pathname]) return m[pathname];
  if (pathname.startsWith("/blog/") || pathname.startsWith("/bidai/jurnal/")) return "blog";
  return "home";
}

const PAGE_KEY_FALLBACK = {
  home: 1,
  roller: 1,
  venetian: 1,
  vertisheer: 1,
  process: 1,
  configurator: 1,
  contact: 1,
  blog: 1,
} as const;

export function SeoHead() {
  const t = useT();
  const { pathname } = useLocation();

  const pageKey = pathnameToPageKey(pathname);
  const pageSeo = t.seo.pages[pageKey];
  const title = pageSeo.title;
  const description = pageSeo.description;
  const keywords = pageSeo.keywords ?? t.seo.keywords;

  // ⚠️ 在 SSG 渲染期间 (Node.js)，window 对象不存在，所以必须使用硬编码的正式域名
  const SITE_ORIGIN = "https://kovasunshade.com";

  // --- Canonical + hreflang 路径逻辑 ---
  const PAIRS: Record<string, string> = {
    "/": "/bidai",
    "/roller": "/bidai/roller",
    "/venetian": "/bidai/venetian",
    "/vertisheer": "/bidai/vertisheer",
    "/process": "/bidai/proses",
    "/configurator": "/bidai/reka",
    "/contact": "/bidai/hubungi",
    "/blog": "/bidai/jurnal",
  };
  const EN_FROM_BM: Record<string, string> = Object.fromEntries(
    Object.entries(PAIRS).map(([en, ms]) => [ms, en])
  );

  let enPath = "/";
  let msPath = "/bidai";
  let canonicalPath = pathname;

  if (PAIRS[pathname]) {
    enPath = pathname;
    msPath = PAIRS[pathname];
  } else if (EN_FROM_BM[pathname]) {
    enPath = EN_FROM_BM[pathname];
    msPath = pathname;
  } else if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length);
    enPath = `/blog/${slug}`;
    msPath = `/bidai/jurnal/${slug}`;
  } else if (pathname.startsWith("/bidai/jurnal/")) {
    const slug = pathname.slice("/bidai/jurnal/".length);
    enPath = `/blog/${slug}`;
    msPath = `/bidai/jurnal/${slug}`;
  }

  const enHref = `${SITE_ORIGIN}${enPath}`;
  const msHref = `${SITE_ORIGIN}${msPath}`;
  const canonicalHref = `${SITE_ORIGIN}${canonicalPath}`;

  // --- JSON-LD Schema ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalHref,
    "publisher": { 
      "@type": "Organization", 
      "name": "Kova Sun Shade" 
    }
  };

  return (
    <Helmet>
      {/* 1. Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* 2. Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalHref} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={t.meta.htmlLang === "ms" ? "ms_MY" : "en_MY"} />

      {/* 3. Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* 4. Canonical + Hreflang */}
      <link rel="canonical" href={canonicalHref} />
      <link rel="alternate" href={enHref} hrefLang="en" />
      <link rel="alternate" href={msHref} hrefLang="ms" />
      <link rel="alternate" href={enHref} hrefLang="x-default" />

      {/* 5. Dynamic JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}