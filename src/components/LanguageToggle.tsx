// src/components/LanguageToggle.tsx
import { useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang } = useLang(); // 我们只需要读取当前语言，不需要 setLang
  const t = useT();
  const isDark = tone === "dark";

  // ✅ 新增：跳转逻辑
  const handleToggle = (code: 'en' | 'ms') => {
    // 如果已经在当前语言，就不做任何操作
    if (lang === code) return;
    
    // 跳转到对应的物理路径
    // 英文去根目录 /，马来文去 /ms
    window.location.href = code === 'en' ? '/' : '/ms';
  };

  return (
    <div
      role="group"
      aria-label={t.langToggle.label}
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5 border text-[0.78rem] font-medium select-none",
        isDark
          ? "border-white/15 bg-white/[0.04]"
          : "border-[var(--color-line)] bg-[var(--color-paper)]",
      )}
    >
      {/* sliding thumb */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 bottom-0.5 w-[42%] rounded-full transition-all duration-300 ease-out",
          isDark ? "bg-[var(--color-clay)]" : "bg-[var(--color-ink)]",
          lang === "en" ? "left-0.5" : "left-[55%]",
        )}
      />
      {(["en", "ms"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            // ✅ 修改：点击时调用 handleToggle 进行跳转
            onClick={() => handleToggle(code)}
            aria-pressed={active}
            className={cn(
              "relative z-10 px-3 py-1 rounded-full transition-colors tracking-wide",
              active
                ? "text-[var(--color-cream)]"
                : isDark
                ? "text-[var(--color-cream)]/70 hover:text-[var(--color-cream)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
            )}
          >
            {code === "en" ? t.langToggle.en : t.langToggle.ms}
          </button>
        );
      })}
    </div>
  );
}