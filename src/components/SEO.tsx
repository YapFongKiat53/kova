// src/components/SEO.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultSEO, seoConfig } from '../config/seoConfig';

interface SEOProps {
  pageKey?: string; // 对应 seoConfig 里的 key
  title?: string;
  description?: string;
  image?: string;
  // ✅ 修正 1：必须在这里定义 lang 属性，告诉 TypeScript 接受 'en' 或 'ms'
  lang?: 'en' | 'ms'; 
}

// ✅ 修正 2：在组件参数中接收 lang，并给它一个默认值 'en'（以防万一没传）
export const SEO: React.FC<SEOProps> = ({ 
  pageKey, 
  title, 
  description, 
  image, 
  lang = 'en' 
}) => {
  const pageSEO = pageKey ? seoConfig[pageKey] : undefined;

  // ✅ 现在代码认识 lang 了，可以安全读取语言对应的标题和描述
  const finalTitle = title || pageSEO?.[lang]?.title || defaultSEO[lang].title;
  const finalDescription = description || pageSEO?.[lang]?.description || defaultSEO[lang].description;
  const finalImage = image || pageSEO?.ogImage || defaultSEO.ogImage;
  const finalKeywords = pageSEO?.keywords || defaultSEO.keywords;

  return (
    // ✅ 修正 3：加入 htmlAttributes，让网页源代码加上 <html lang="en"> 或 <html lang="ms">，对 SEO 非常重要！
    <Helmet htmlAttributes={{ lang }}>
      {/* 基础 HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}

      {/* Open Graph / Facebook (用于社交媒体分享预览) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {finalImage && <meta property="og:image" content={finalImage} />}

      {/* Twitter (推特分享卡片) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {finalImage && <meta name="twitter:image" content={finalImage} />}
    </Helmet>
  );
};