// src/layout/PublicLayout.tsx
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import WhatsAppChatWidget from "@/components/WhatsappPopup";

const PageFallback = () => (
  <div className="p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export const Component = React.forwardRef(function PublicLayout(_props, _ref) {
  const location = useLocation();

  const isAdminLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
     

      <main className="pt-[72px]">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {!isAdminLayout && <WhatsAppChatWidget phoneE164="+60143022862" />}
    </>
  );
});