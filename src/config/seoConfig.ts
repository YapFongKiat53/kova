// src/config/seoConfig.ts

export interface SEOData {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
  }
  
  // 设定一个默认的全局 SEO
  export const defaultSEO: SEOData = {
    title: "Kova Sunshade | Premium Blinds & Sunshades",
    description: "Discover Kova Sunshade's high-quality roller blinds, venetian blinds, and vertisheer. Factory direct prices and premium materials.",
    keywords: "sunshade, blinds, roller blinds, venetian blinds, vertisheer, factory direct blinds",
    ogImage: "https://kovasunshade.com/images/default-og.jpg", // 替换成你真实的图片链接
  };
  
  // 针对不同区块/路由的专属 SEO 记录
  export const seoConfig: Record<string, SEOData> = {
    collection: {
      title: "Our Collections | Kova Sunshade",
      description: "Explore our full range of premium sunshade collections.",
    },
    roller: {
      title: "Roller Blinds | Minimalist & Modern | Kova Sunshade",
      description: "Sleek, modern roller blinds perfect for any room. Easy to use and available in blockout or light-filtering fabrics.",
      keywords: "roller blinds, modern blinds, blockout roller blinds",
    },
    venetian: {
      title: "Venetian Blinds | Classic Control | Kova Sunshade",
      description: "Timeless venetian blinds offering ultimate light and privacy control. Available in timber and aluminum.",
    },
    vertisheer: {
      title: "Vertisheer Blinds | Elegance Meets Function | Kova Sunshade",
      description: "Experience the elegance of sheer curtains with the functionality of vertical blinds.",
    },
    "factory-direct": {
      title: "Factory Direct | Best Value | Kova Sunshade",
      description: "Buy direct from the Kova Sunshade factory. Premium quality without the middleman markup.",
    },
    contact: {
      title: "Contact Us | Kova Sunshade",
      description: "Get in touch with Kova Sunshade for quotes, measurements, and customer support.",
    },
  };