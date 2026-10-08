"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ArrowRight, X, Clock, ExternalLink, Lightbulb } from "lucide-react";
import type { Insight, InsightBlock } from "@/lib/insights";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackEvent } from "@/lib/utils";

const HASH_PREFIX = "#insight-";

export default function InsightsList({ insights }: { insights: Insight[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Insight | null>(null);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const openArticle = (article: Insight) => {
    setActive(article);
    setProgress(0);
    setOpen(true);
    history.replaceState(null, "", `${HASH_PREFIX}${article.slug}`);
    trackEvent("insight_open", { slug: article.slug });
  };

  const close = () => {
    setOpen(false);
    history.replaceState(null, "", location.pathname + location.search);
  };

  // Open the article linked by URL hash (e.g. /insights#insight-saas-mvp-strategy)
  useEffect(() => {
    const syncFromHash = () => {
      const slug = location.hash.startsWith(HASH_PREFIX) ? location.hash.slice(HASH_PREFIX.length) : null;
      const found = slug && insights.find((a) => a.slug === slug);
      if (found) {
        setActive(found);
        setProgress(0);
        setOpen(true);
      }
    };
    const frame = requestAnimationFrame(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [insights]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 1);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {insights.map((article) => (
          <button
            key={article.slug}
            type="button"
            onClick={() => openArticle(article)}
            className="group text-left bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {article.tag}
            </span>
            <h2 className="font-black text-gray-900 text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {article.date}
                </span>
                <span>{article.readTime} 읽기</span>
              </div>
              <span className="text-blue-600 text-xs font-semibold flex items-center gap-1">
                읽기
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && close()}>
        <AnimatePresence>
          {open && active && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[100] bg-gray-950/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed z-[101] inset-x-0 bottom-0 top-6 md:inset-0 md:m-auto md:w-[min(720px,calc(100vw-48px))] md:h-[min(86vh,900px)] flex flex-col bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden focus:outline-none"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  {/* Header */}
                  <div className="relative shrink-0 flex items-center justify-between gap-3 px-5 md:px-8 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 min-w-0 text-xs text-gray-400">
                      <span className="bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full shrink-0">
                        {active.tag}
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Clock size={12} />
                        {active.readTime} 읽기
                      </span>
                    </div>
                    <Dialog.Close
                      className="p-2 -mr-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      aria-label="닫기"
                    >
                      <X size={20} />
                    </Dialog.Close>
                    {/* Reading progress */}
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-transparent">
                      <div
                        className="h-full bg-blue-600 origin-left transition-transform duration-100"
                        style={{ transform: `scaleX(${progress})` }}
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-12 py-8"
                  >
                    <article className="max-w-[600px] mx-auto">
                      <p className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <Calendar size={12} />
                        {active.date}
                      </p>
                      <Dialog.Title className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-8">
                        {active.title}
                      </Dialog.Title>

                      <div className="space-y-5">
                        {active.body.map((block, i) => (
                          <ArticleBlock key={i} block={block} />
                        ))}
                      </div>

                      {/* Sources */}
                      <div className="mt-12 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">참고 자료</h3>
                        <ol className="space-y-2 text-sm">
                          {active.sources.map((s, i) => (
                            <li key={s.url} className="flex gap-2 text-gray-500">
                              <span className="text-gray-300 tabular-nums">{i + 1}.</span>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 underline-offset-2 hover:underline inline-flex items-start gap-1"
                              >
                                {s.label}
                                <ExternalLink size={12} className="mt-1 shrink-0" />
                              </a>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* CTA */}
                      <div className="mt-10 mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 md:p-8 text-white">
                        <p className="font-black text-lg mb-2">우리 사이트에도 적용할 수 있을까요?</p>
                        <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                          현재 홈페이지의 구조와 전환 동선을 무료로 진단해 드립니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href="/contact"
                            onClick={() => trackEvent("cta_click", { location: "insight_modal", label: "무료 상담 신청" })}
                            className="inline-flex items-center justify-center gap-1 bg-white text-blue-700 font-bold text-sm px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                          >
                            무료 상담 신청 <ArrowRight size={14} />
                          </Link>
                          <Link
                            href="/estimate"
                            onClick={() => trackEvent("cta_click", { location: "insight_modal", label: "견적 계산하기" })}
                            className="inline-flex items-center justify-center bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
                          >
                            견적 계산하기
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}

function ArticleBlock({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "h":
      return <h3 className="text-lg md:text-xl font-black text-gray-900 pt-4">{block.text}</h3>;
    case "p":
      return <p className="text-[15px] md:text-base text-gray-700 leading-[1.85]">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] text-gray-700 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "stat":
      return (
        <figure className="my-2 rounded-2xl bg-gray-50 border border-gray-100 px-6 py-5">
          <p className="text-4xl font-black text-blue-600 tracking-tight mb-1">{block.value}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{block.label}</p>
          <figcaption className="text-xs text-gray-400 mt-2">출처: {block.source}</figcaption>
        </figure>
      );
    case "callout":
      return (
        <aside className="my-2 rounded-2xl border-l-4 border-blue-500 bg-blue-50/60 px-5 py-4">
          <p className="flex items-center gap-1.5 text-sm font-bold text-blue-700 mb-1">
            <Lightbulb size={14} />
            {block.title}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{block.text}</p>
        </aside>
      );
  }
}
