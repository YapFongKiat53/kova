// src/components/SEO.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
// 提示：检查一下你的文件名是 seoConfig.ts 还是 seoconfig.ts，通常建议保持驼峰命名一致
import { defaultSEO, seoConfig } from '../config/seoConfig';

interface SEOProps {
  pageKey?: string; // 对应 seoConfig 里的 key
  // 允许直接传入自定义属性覆盖默认值
  title?: string;
  description?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ pageKey, title, description, image }) => {
  // ✅ 修正 1：如果没传 pageKey 或找不到，使用 undefined 而不是 {}
  const pageSEO = pageKey ? seoConfig[pageKey] : undefined;

  // ✅ 修正 2：使用可选链 (?.) 来安全读取属性，完美解决 ts(2339) 报错
  const finalTitle = title || pageSEO?.title || defaultSEO.title;
  const finalDescription = description || pageSEO?.description || defaultSEO.description;
  const finalImage = image || pageSEO?.ogImage || defaultSEO.ogImage;
  const finalKeywords = pageSEO?.keywords || defaultSEO.keywords;

  return (
    <Helmet>
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