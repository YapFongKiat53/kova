import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";

export function VenetianSystem() {
  const t = useT();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const progressChipRef = useRef<HTMLSpanElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStageRef = useRef(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── 根因 4 修复：预算静态值，scroll handler 里不再碰 DOM layout ──
    let sectionTop = 0;
    let sectionHeight = 0;
    let vh = window.innerHeight;

    const measureSection = () => {
      // getBoundingClientRect 只在 resize / mount 时调用，不在 scroll handler 里
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = section.offsetHeight;
      vh = window.innerHeight;
    };
    measureSection();

    let raf = 0;
    let rafRunning = false;
    let cancelled = false;
    let targetProgress = 0;
    let smoothProgress = 0;
    let lastWritten = -1;
    // 根因 1 修复：节流 currentTime 写入，每 2 帧才写一次
    let frameCount = 0;

    // ── 根因 5 修复：stage 切换直接写 opacity，移除 CSS transition ──
    const applyStage = (idx: number) => {
      if (idx === activeStageRef.current) return;
      activeStageRef.current = idx;
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === idx ? "1" : "0.4";
        const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
        if (eyebrow) {
          eyebrow.style.color =
            i === idx
              ? "var(--color-clay-light)"
              : "color-mix(in srgb, var(--color-sand) 70%, transparent)";
        }
      });
    };

    const applyProgress = (p: number) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p * 100}%`;
      }
      if (progressChipRef.current) {
        progressChipRef.current.textContent = `${Math.round(p * 100)}%`;
      }

      // 根因 1 修复：每 2 帧写一次 currentTime，降低解码压力
      frameCount++;
      if (frameCount % 2 === 0) {
        const video = videoRef.current;
        if (video && Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = p * video.duration;
        }
      }

      applyStage(p < 0.34 ? 0 : p < 0.68 ? 1 : 2);
    };

    // ── 根因 4 修复：scroll handler 只读 scrollY，纯算术，无 DOM 访问 ──
    const onScroll = () => {
      const scrolled = window.scrollY - sectionTop;
      const range = Math.max(1, sectionHeight - vh);
      targetProgress = Math.max(0, Math.min(1, scrolled / range));
      startRaf();
    };

    const tick = () => {
      if (cancelled) return;
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) < 0.0005) {
        smoothProgress = targetProgress;
        applyProgress(smoothProgress);
        rafRunning = false;
        return; // RAF 暂停，静止时 CPU = 0
      }
      smoothProgress += diff * 0.22;
      if (Math.abs(smoothProgress - lastWritten) > 0.0005) {
        lastWritten = smoothProgress;
        applyProgress(smoothProgress);
      }
      raf = requestAnimationFrame(tick);
    };

    const startRaf = () => {
      if (rafRunning || cancelled) return;
      rafRunning = true;
      raf = requestAnimationFrame(tick);
    };

    // 初始化
    onScroll();
    smoothProgress = targetProgress;
    lastWritten = targetProgress;
    applyProgress(smoothProgress);

    // resize 时重新测量静态值
    const onResize = () => {
      measureSection();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    // 安全网：200ms 轮询以防 scroll 事件被节流
    const fallback = window.setInterval(onScroll, 200);

    return () => {
      cancelled = true;
      rafRunning = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearInterval(fallback);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-ink)] text-[var(--color-cream)]"
      style={{ minHeight: "400vh" }}
      aria-label="Venetian system: chain, tilt and lift"
    >
      {/* 根因 2 修复：will-change: transform 提前 GPU 化 sticky 容器 */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-[1240px] mx-auto h-full px-5 sm:px-6 lg:px-10 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-10 lg:items-center justify-center py-[clamp(2rem,1rem+3vw,4rem)]">

          {/* Text column */}
          <div className="flex flex-col gap-3 lg:gap-5 min-w-0">
            <div>
              <p className="eyebrow !text-[var(--color-sand)]">{t.venetianSystem.eyebrow}</p>
              <h2 className="mt-2 lg:mt-3 headline text-[clamp(1.5rem,1rem+3vw,3rem)] leading-[1.05]">
                {t.venetianSystem.titleA}
                <span className="italic font-light text-[var(--color-clay-light)]">
                  {" "}{t.venetianSystem.titleB}
                </span>
              </h2>
            </div>
            <p className="text-[clamp(0.88rem,0.82rem+0.3vw,1.02rem)] leading-[1.5] text-[var(--color-cream)]/75 max-w-md">
              {t.venetianSystem.intro}
            </p>

            <div className="mt-1 lg:mt-3">
              <div className="relative h-px bg-[var(--color-cream)]/15 mb-3">
                <span
                  ref={progressBarRef}
                  className="absolute inset-y-0 left-0 bg-[var(--color-clay-light)]"
                  style={{ width: "0%", height: "2px" }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {t.venetianSystem.stages.map((s, i) => (
                  <div
                    key={s.label}
                    ref={(el) => { stageRefs.current[i] = el; }}
                    // 根因 5 修复：去掉 transition，直接 instant 切换
                    style={{ opacity: i === 0 ? 1 : 0.4, willChange: "opacity" }}
                  >
                    <p
                      data-eyebrow
                      className="text-[0.6rem] sm:text-[0.66rem] tracking-widest uppercase mb-1"
                      style={{
                        color: i === 0
                          ? "var(--color-clay-light)"
                          : "color-mix(in srgb, var(--color-sand) 70%, transparent)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} · {s.label}
                    </p>
                    <p className="font-serif text-[clamp(0.92rem,0.8rem+0.5vw,1.2rem)] leading-tight">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[clamp(0.7rem,0.66rem+0.18vw,0.84rem)] leading-snug text-[var(--color-cream)]/60 max-w-[20ch] hidden sm:block">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video column */}
          <div className="flex items-center justify-center min-h-0">
            <div
              className="relative w-full rounded-md overflow-hidden border border-[var(--color-cream)]/10 bg-[var(--color-ink-soft)]/40"
              style={{ aspectRatio: "1664 / 1248" }}
            >
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={() => setVideoReady(true)}
                className="absolute inset-0 w-full h-full object-contain"
              >
                {/* 根因 加分项：WebM 优先，MP4 fallback */}
                <source src="/videos/venetian-system.webm" type="video/webm" />
                <source src="/videos/venetian-system.mp4" type="video/mp4" />
              </video>

              {videoReady && (
                // 根因 3 修复：去掉 backdrop-blur，改纯色背景
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-[var(--color-ink)] text-[var(--color-cream)]/90 text-[0.58rem] tracking-widest uppercase px-2 py-0.5 rounded-full border border-[var(--color-cream)]/15">
                  <span className="h-1 w-1 rounded-full bg-[var(--color-clay-light)] animate-pulse" />
                  <span ref={progressChipRef}>0%</span>
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}