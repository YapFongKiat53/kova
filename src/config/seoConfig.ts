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
    title: "KovaSunShade | Blinds & Curtain | Window Blind Malaysia",
    description: "Discover custom Roller, Venetian and VertiSheer blinds in Malaysia. Send your window details and get factory-direct options for your home, office or shoplot."
  },
  ms: {
    title: "KovaSunShade | Bidai Dan Langsir | Bidai Tingkap Malaysia",
    description: "Dapatkan bidai tingkap custom seperti Roller, Venetian dan VertiSheer. Harga terus dari kilang, rekaan kemas dan sesuai untuk rumah atau pejabat."
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
      title: "KovaSunShade | Roller Blind",
      description: "Shop made-to-measure Roller Blinds in Malaysia. Choose blackout, dim-out, sunscreen or light-filtering fabrics for homes, offices and shoplots.",
    },
    ms: {
      title: "KovaSunShade | Bidai Roller ",
      description: "Dapatkan bidai roller custom untuk rumah, pejabat dan kedai. Pilihan blackout, dim-out, sunscreen dan light-filtering dengan kemasan moden.",
    },
    keywords: "roller blinds, modern blinds, blockout roller blinds, bidai gulung",
  },
  venetian: {
    en: {
      title: "KovaSunShade | Venetian Blind",
      description: "Custom Your Venetian Blinds in Malaysia with aluminium, wood and faux-wood finishes. Control light, privacy and airflow with a timeless modern look.",
    },
    ms: {
      title: "KovaSunShade | Bidai Venetian",
      description: "Bidai Venetian custom dengan pilihan aluminium, kayu dan faux-wood. Kawal cahaya, privasi dan aliran udara untuk ruang moden dan klasik.",
    }
  },
  vertisheer: {
    en: {
      title: "KovaSunshade | Vertisheer Blind",
      description: "Upgrade your large windows with VertiSheer blinds. Soft curtain-like fabric with precise light control, privacy and modern elegance.",
    },
    ms: {
      title: "KovaSunShade | Bidai Vertisheer",
      description: "Cantikkan tingkap besar dan pintu gelangsar dengan VertiSheer. Gaya lembut seperti langsir, dengan kawalan cahaya dan privasi yang kemas.",
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