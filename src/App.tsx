// src/App.tsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom"; // 引入 Outlet
import { LangProvider } from "@/lib/i18n";
import { ConfiguratorProvider } from "@/lib/configurator/context";
import { ScrollManager } from "./components/ScrollManager";
import { SeoHead } from "./components/SeoHead";
import { JsonLd } from "./components/JsonLd";

function PageFallback() {
  // Cream wash that matches the brand background so the swap is silent.
  return <div className="min-h-screen bg-[var(--color-cream)]" />;
}

export default function App() {
  return (
    // 不再需要 <BrowserRouter>，由 vite-react-ssg 在底层提供
    <LangProvider>
      <SeoHead />
      <JsonLd />
      <ConfiguratorProvider>
        <ScrollManager />
        <Suspense fallback={<PageFallback />}>
          {/* Outlet 会根据 URL 自动渲染匹配的子路由组件 */}
          <Outlet />
        </Suspense>
      </ConfiguratorProvider>
    </LangProvider>
  );
}