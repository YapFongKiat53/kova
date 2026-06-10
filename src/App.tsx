// src/App.tsx
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // 引入
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
          <Outlet />
        </ConfiguratorProvider>
      </LangProvider>
    </HelmetProvider>
  );
}