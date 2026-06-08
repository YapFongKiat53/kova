// src/config/seoConfig.ts

// 1. 定义具体语言的内容结构
export interface SEOLangContent {
  title: string;
  description: string;
}

// 2. 更新 SEOData 接口，使其包含 en 和 ms 两个属性
export interface SEOData {
  en: SEOLangContent;
  ms: SEOLangContent;
  keywords?: string;
  ogImage?: string;
}

// 3. 设定默认的全局 SEO（套用你提供的英文和马来文文案）
export const defaultSEO: SEOData = {
  en: {
    title: "Window Blinds & Shade | Window Blind Malaysia | Kova Sun Shade",
    description: "Transform your outdoor space with Kova Sun Shade. We supply and install quality window blinds like Roller Blinds, Timber Venetian Blinds ,Vertisheer Blinds and sun shading systems for homes and commercial properties."
  },
  ms: {
    title: "Bidai dan Langsir Malaysia | Kova Sun Shade",
    description: "Tingkatkan keselesaan dan perlindungan ruang anda dengan Kova Sun Shade. Pakar dari luar , Roller Bidai dan sistem teduhan untuk kediaman serta komersial."
  },
  keywords: "sunshade, blinds, roller blinds, venetian blinds, vertisheer, factory direct blinds, bidai, langsir, awning, zip blind",
  ogImage: "https://kovasunshade.com/images/default-og.jpg", // 保持你的真实图片链接
};

// 4. 针对不同区块/路由的专属 SEO 记录 (已全部升级为双语)
export const seoConfig: Record<string, SEOData> = {
  collection: {
    en: {
      title: "Our Collections | Kova Sunshade",
      description: "Explore our full range of premium sunshade collections.",
    },
    ms: {
      title: "Koleksi Kami | Kova Sunshade",
      description: "Terokai rangkaian penuh koleksi teduhan matahari premium kami.",
    }
  },
  roller: {
    en: {
      title: "Roller Blinds | Minimalist & Modern | Kova Sunshade",
      description: "Sleek, modern roller blinds perfect for any room. Easy to use and available in blockout or light-filtering fabrics.",
    },
    ms: {
      title: "Bidai Gulung (Roller Blinds) | Minimalis & Moden | Kova Sunshade",
      description: "Bidai gulung yang elegan dan moden, sesuai untuk mana-mana bilik. Mudah digunakan dan tersedia dalam fabrik gelap (blockout) atau penapis cahaya.",
    },
    keywords: "roller blinds, modern blinds, blockout roller blinds, bidai gulung",
  },
  venetian: {
    en: {
      title: "Venetian Blinds | Classic Control | Kova Sunshade",
      description: "Timeless venetian blinds offering ultimate light and privacy control. Available in timber and aluminum.",
    },
    ms: {
      title: "Bidai Venetian | Kawalan Klasik | Kova Sunshade",
      description: "Bidai venetian malar hijau yang menawarkan kawalan cahaya dan privasi maksimum. Tersedia dalam pilihan kayu dan aluminium.",
    }
  },
  vertisheer: {
    en: {
      title: "Vertisheer Blinds | Elegance Meets Function | Kova Sunshade",
      description: "Experience the elegance of sheer curtains with the functionality of vertical blinds.",
    },
    ms: {
      title: "Bidai Vertisheer | Keanggunan & Fungsi | Kova Sunshade",
      description: "Alami keanggunan langsir nipis (sheer) dengan kefungsian bidai menegak (vertical blinds).",
    }
  },
  "factory-direct": {
    en: {
      title: "Factory Direct | Best Value | Kova Sunshade",
      description: "Buy direct from the Kova Sunshade factory. Premium quality without the middleman markup.",
    },
    ms: {
      title: "Terus Dari Kilang | Nilai Terbaik | Kova Sunshade",
      description: "Beli terus dari kilang Kova Sunshade. Kualiti premium tanpa kos orang tengah.",
    }
  },
  contact: {
    en: {
      title: "Contact Us | Kova Sunshade",
      description: "Get in touch with Kova Sunshade for quotes, measurements, and customer support.",
    },
    ms: {
      title: "Hubungi Kami | Kova Sunshade",
      description: "Hubungi Kova Sunshade untuk sebut harga, ukuran, dan sokongan pelanggan.",
    }
  },
};