// src/App.tsx
import { Suspense } from "react"; 
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "@/lib/i18n";
import { ConfiguratorProvider } from "@/lib/configurator/context";
import { ScrollManager } from "./components/ScrollManager";
import { SeoHead } from "./components/SeoHead";
import { JsonLd } from "./components/JsonLd";

// ✅ 1. 引入你的 WhatsApp 悬浮窗组件（请确保路径与你实际保存的一致）
import WhatsAppChatWidget from "./components/WhatsAppChatWidget"; 

export default function App() {
  return (
    <HelmetProvider>
      <LangProvider>
        <SeoHead />
        <JsonLd />
        <ConfiguratorProvider>
          <ScrollManager />
          
          {/* 这里的 Outlet 负责渲染所有子页面（Home, Roller 等） */}
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Outlet />
          </Suspense>

          {/* ✅ 2. 把全局挂件放在这里！它会伴随整个 App 的生命周期，不会随着页面切换而消失 */}
          <WhatsAppChatWidget phoneE164="60179778289" />
          
        </ConfiguratorProvider>
      </LangProvider>
    </HelmetProvider>
  );
}