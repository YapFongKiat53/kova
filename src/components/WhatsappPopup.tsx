import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  phoneE164: string; // 例如 6591234567（不要加 +）
  defaultMessage?: string;
};

export default function WhatsAppChatWidget({
  phoneE164,
  defaultMessage = "Need more information on our Centralized Labour Quarters?",
}: Props) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(defaultMessage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const waUrl = useMemo(
    () => `https://wa.me/${phoneE164}?text=${encodeURIComponent(msg)}`,
    [phoneE164, msg]
  );

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-5 right-5 z-[9999]">
      {/* ✅ 弹窗用 absolute 挂在按钮上面：不会影响按钮位置 */}
      {open && (
        <div className="absolute bottom-full right-0 mb-3 w-[320px] rounded-2xl shadow-2xl border bg-white overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-[#25D366] text-white flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold">Work Connect</div>
              <div className="text-xs opacity-90">Sales Team • Typically replies fast</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-white/20"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="mb-3 text-sm bg-gray-100 rounded-xl px-3 py-2 inline-block">
              Hi 👋 How can we help you?
            </div>

            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
              className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#25D366]/40"
            />

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white py-2.5 text-sm font-semibold hover:opacity-90"
            >
              Continue on WhatsApp
            </a>

            <div className="mt-2 text-[11px] text-gray-400">
              Opens WhatsApp Web / App
            </div>
          </div>
        </div>
      )}

      {/* ✅ 按钮永远固定在这里，不会被弹窗影响 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl grid place-items-center hover:opacity-90"
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M16.002 3.2c-7.065 0-12.8 5.736-12.8 12.8 0 2.26.594 4.47 1.722 6.42L3.2 28.8l6.55-1.683a12.74 12.74 0 0 0 6.252 1.635h.002c7.064 0 12.8-5.735 12.8-12.8 0-7.064-5.736-12.8-12.8-12.8zm0 23.2a10.37 10.37 0 0 1-5.29-1.45l-.38-.224-3.89 1.0 1.04-3.79-.247-.39a10.33 10.33 0 1 1 8.767 4.854zm6.03-7.78c-.33-.165-1.95-.96-2.252-1.07-.302-.11-.522-.165-.742.165-.22.33-.852 1.07-1.045 1.29-.192.22-.385.248-.715.083-.33-.165-1.392-.513-2.65-1.635-.98-.874-1.64-1.953-1.833-2.283-.193-.33-.02-.508.145-.673.15-.15.33-.385.495-.577.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.742-1.79-1.016-2.455-.266-.64-.536-.553-.742-.563l-.633-.012c-.22 0-.578.083-.88.413-.302.33-1.155 1.13-1.155 2.758 0 1.625 1.182 3.195 1.347 3.415.165.22 2.328 3.556 5.64 4.99.787.34 1.4.544 1.88.696.79.252 1.51.216 2.08.13.635-.095 1.95-.797 2.225-1.57.275-.77.275-1.433.193-1.57-.083-.138-.302-.22-.633-.385z" />
        </svg>
      </button>
    </div>,
    document.body
  );
}
