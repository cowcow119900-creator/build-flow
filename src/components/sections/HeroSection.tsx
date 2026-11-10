"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import LiveDashboardPreview from "./LiveDashboardPreview";
import MagneticButton from "@/components/motion/MagneticButton";
import { trackEvent } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const heroWords = [
  "홈페이지가 아니라,",
  "고객을 만드는",
  "디지털 시스템을 만듭니다.",
];

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative gradient-navy overflow-hidden min-h-screen flex items-center pt-20 pb-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={reduced ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 text-blue-300 rounded-full px-4 py-1.5 text-sm font-medium mb-8 motion-safe:animate-[hero-enter_0.5s_ease-out_0.1s_both]"
            >
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              웹 솔루션 전문 기업
            </div>

            {/* Headline — word by word */}
            <h1 className="mb-6 text-4xl sm:text-5xl xl:text-6xl font-black leading-tight">
              {heroWords.map((line, li) => (
                <span
                  key={line}
                  style={{ animationDelay: `${0.2 + li * 0.15}s` }}
                  className={`block motion-safe:animate-[hero-enter_0.65s_ease-out_both] ${
                    li === 1 ? "text-blue-400" : "text-white"
                  }`}
                >
                  {line}{li < heroWords.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>

            {/* Sub copy */}
            <p className="text-blue-200/80 text-lg leading-relaxed mb-10 max-w-xl motion-safe:animate-[hero-enter_0.6s_ease-out_0.65s_both]">
              기업 홈페이지, 랜딩페이지, 예약 시스템, 쇼핑몰,
              <br className="hidden sm:block" />
              관리자 페이지, 고객관리 시스템까지.
              <br />
              사업 성장에 필요한 웹 솔루션을 설계하고 구축합니다.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-12 motion-safe:animate-[hero-enter_0.6s_ease-out_0.8s_both]">
              <MagneticButton strength={0.2}>
                <Link
                  href="/estimate"
                  className="btn-primary text-base px-7 py-4 relative overflow-hidden group"
                  onClick={() => trackEvent("cta_click", { location: "hero", label: "무료 견적 계산하기" })}
                >
                  {/* Light shimmer on hover */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full motion-safe:group-hover:translate-x-full motion-safe:transition-transform duration-700 ease-in-out" />
                  무료 견적 계산하기
                  <ArrowRight size={18} />
                </Link>
              </MagneticButton>

              <motion.div whileHover={reduced ? undefined : { scale: 1.02 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
                <Link
                  href="/portfolio"
                  className="btn-outline-white text-base px-7 py-4"
                  onClick={() => trackEvent("cta_click", { location: "hero", label: "제작 사례 보기" })}
                >
                  <PlayCircle size={18} />
                  제작 사례 보기
                </Link>
              </motion.div>
            </div>

            {/* Social proof numbers */}
            <div className="flex flex-wrap gap-8">
              {[
                { num: "120+", label: "구축 프로젝트" },
                { num: "98%", label: "재계약률" },
                { num: "3년+", label: "운영 경력" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{ animationDelay: `${1.0 + i * 0.1}s` }}
                  className="motion-safe:animate-[hero-enter_0.5s_ease-out_both]"
                >
                  <p className="text-white font-black text-2xl">{s.num}</p>
                  <p className="text-blue-300/70 text-sm mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Dashboard */}
          <div className="relative flex justify-center lg:justify-end pt-8 pb-12">
            <LiveDashboardPreview />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80H1440V40C1200 80 960 20 720 40C480 60 240 10 0 40V80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
