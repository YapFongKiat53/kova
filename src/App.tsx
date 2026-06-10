// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // 移除了 BrowserRouter
import { LangProvider } from "@/lib/i18n";
import { ConfiguratorProvider } from "@/lib/configurator/context";
import { ScrollManager } from "./components/ScrollManager";
import { SeoHead } from "./components/SeoHead";
import { JsonLd } from "./components/JsonLd";

import { Home } from "./pages/Home";

// Lazy loaded pages
const RollerPage      = lazy(() => import("./pages/Roller").then((m) => ({ default: m.RollerPage })));
const VenetianPage    = lazy(() => import("./pages/Venetian").then((m) => ({ default: m.VenetianPage })));
const VertiSheerPage  = lazy(() => import("./pages/VertiSheer").then((m) => ({ default: m.VertiSheerPage })));
const ProcessPage     = lazy(() => import("./pages/ProcessPage").then((m) => ({ default: m.ProcessPage })));
const ConfiguratorPage = lazy(() => import("./pages/ConfiguratorPage").then((m) => ({ default: m.ConfiguratorPage })));
const ContactPage     = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const Blog            = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost        = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));

function PageFallback() {
  return <div className="min-h-screen bg-[var(--color-cream)]" />;
}

export default function App() {
  return (
    // 直接以 Provider 作为根节点，不再使用 <BrowserRouter> 包裹
    <LangProvider>
      <SeoHead />
      <JsonLd />
      <ConfiguratorProvider>
        <ScrollManager />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* ----- English ----- */}
            <Route path="/" element={<Home />} />
            <Route path="/roller" element={<RollerPage />} />
            <Route path="/venetian" element={<VenetianPage />} />
            <Route path="/vertisheer" element={<VertiSheerPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/configurator" element={<ConfiguratorPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* ----- Bahasa Malaysia mirrors ----- */}
            <Route path="/bidai" element={<Home />} />
            <Route path="/bidai/roller" element={<RollerPage />} />
            <Route path="/bidai/venetian" element={<VenetianPage />} />
            <Route path="/bidai/vertisheer" element={<VertiSheerPage />} />
            <Route path="/bidai/proses" element={<ProcessPage />} />
            <Route path="/bidai/reka" element={<ConfiguratorPage />} />
            <Route path="/bidai/hubungi" element={<ContactPage />} />
            <Route path="/bidai/jurnal" element={<Blog />} />
            <Route path="/bidai/jurnal/:slug" element={<BlogPost />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </ConfiguratorProvider>
    </LangProvider>
  );
}