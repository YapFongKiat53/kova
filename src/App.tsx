// src/App.tsx
import { Suspense } from "react"; // 1. 引入 Suspense
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "@/lib/i18n";
import { ConfiguratorProvider } from "@/lib/configurator/context";
import { ScrollManager } from "./components/ScrollManager";
import { SeoHead } from "./components/SeoHead";
import { JsonLd } from "./components/JsonLd";

export default function App() {
  return (
    <HelmetProvider>
      <LangProvider>
        <SeoHead />
        <JsonLd />
        <ConfiguratorProvider>
          <ScrollManager />
          {/* 2. 用 Suspense 包裹 Outlet */}
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Outlet />
          </Suspense>
        </ConfiguratorProvider>
      </LangProvider>
    </HelmetProvider>
  );
}