"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Clock, Tag, Layers } from "lucide-react";
import { trackEvent } from "@/lib/utils";
import AnimatedSection from "@/components/motion/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

const PORTFOLIO_ITEMS = [
  {
    id: "medical-reservation",
    category: "예약 시스템", industry: "의료",
    title: "H의원 온라인 예약 시스템",
    problem: "전화 예약으로 인한 업무 과부하와 노쇼 발생",
    features: ["실시간 예약", "SMS 리마인더", "의사별 스케줄 관리", "관리자 대시보드"],
    period: "6주", stack: ["Next.js", "Supabase", "Vercel"],
    result: "예약 전화 70% 감소, 노쇼율 35% 개선",
    colorClass: "from-blue-500 to-blue-700",
    note: "구축 예시 — 가상 시나리오",
  },
  {
    id: "brand-landing",
    category: "랜딩페이지", industry: "뷰티",
    title: "I브랜드 신제품 출시 랜딩",
    problem: "광고 클릭 후 전환율이 1% 미만으로 ROAS 저조",
    features: ["단계형 스크롤 스토리", "리뷰 소셜 증거", "즉시 구매 CTA", "픽셀 추적"],
    period: "2주", stack: ["Next.js", "GA4", "Meta Pixel"],
    result: "광고 전환율 1% → 4.8% 개선",
    colorClass: "from-rose-400 to-pink-600",
    note: "구축 예시 — 가상 시나리오",
  },
  {
    id: "b2b-portal",
    category: "기업 홈페이지", industry: "제조업",
    title: "J제조사 B2B 파트너 포털",
    problem: "영업 담당자 없이 파트너사가 견적·발주 처리 불가",
    features: ["파트너 로그인", "견적 자동 생성", "발주 관리", "재고 조회"],
    period: "10주", stack: ["Next.js", "Supabase", "PostgreSQL"],
    result: "영업 처리 시간 60% 단축",
    colorClass: "from-slate-600 to-slate-800",
    note: "구축 예시 — 가상 시나리오",
  },
  {
    id: "fitness-saas",
    category: "SaaS 개발", industry: "헬스케어",
    title: "K피트니스 센터 회원 관리 SaaS",
    problem: "엑셀 회원 관리, PT 스케줄 충돌 빈번",
    features: ["회원 등록/관리", "PT 예약", "결제 연동", "출석 관리"],
    period: "14주", stack: ["Next.js", "Supabase", "Stripe"],
    result: "관리 시간 80% 절감, 센터 3곳 도입",
    colorClass: "from-emerald-500 to-teal-700",
    note: "구축 예시 — 가상 시나리오",
  },
];

function PortfolioCard({ item }: { item: typeof PORTFOLIO_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    >
      {/* Thumbnail with hover overlay */}
      <div className={`h-44 bg-gradient-to-br ${item.colorClass} relative overflow-hidden flex items-end p-6`}>
        {/* Fake browser mockup auto-scroll on hover */}
        <motion.div
          className="absolute inset-2 bg-white/10 rounded-xl overflow-hidden border border-white/20"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-4 bg-white/20 flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="flex-1 bg-white/20 rounded h-1.5 ml-1" />
          </div>
          <motion.div
            className="p-2 space-y-1"
            animate={{ y: hovered ? -20 : 0 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-1.5 bg-white/30 rounded ${i % 3 === 0 ? "w-2/3" : "w-full"}`} />
            ))}
          </motion.div>
        </motion.div>

        {/* Title area */}
        <div className="relative z-10">
          <motion.span
            className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full"
            animate={{ opacity: hovered ? 0 : 1 }}
          >
            {item.category}
          </motion.span>
          <h3 className="text-white font-black text-xl mt-2">{item.title}</h3>
        </div>

        {/* Hover overlay: tags */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="text-white font-black text-lg mb-2">{item.title}</p>
                <div className="flex flex-wrap gap-1.5 justify-center px-4">
                  {item.features.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full border border-white/30"
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-3 right-3 bg-white/10 text-white/60 text-[10px] px-2 py-0.5 rounded-full border border-white/20">
          {item.note}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Tag size={11} className="text-gray-400" /> {item.industry}</span>
          <span className="flex items-center gap-1"><Clock size={11} className="text-gray-400" /> {item.period}</span>
          <span className="flex items-center gap-1"><Layers size={11} className="text-gray-400" /> {item.stack.join(", ")}</span>
        </div>

        <div className="bg-orange-50 rounded-xl p-3 mb-4">
          <p className="text-xs font-semibold text-orange-700 mb-1">해결한 문제</p>
          <p className="text-sm text-orange-800">{item.problem}</p>
        </div>

        <div className="bg-green-50 rounded-xl p-3 mb-5">
          <p className="text-xs font-semibold text-green-700 mb-1">제작 결과</p>
          <p className="text-sm text-green-800 font-semibold">{item.result}</p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/portfolio/${item.id}`}
            className="flex-1 text-center text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl py-2.5 hover:border-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => trackEvent("portfolio_detail_view", { project: item.id })}
          >
            상세 보기
          </Link>
          <Link
            href={`/contact?ref=${item.id}`}
            className="flex-1 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl py-2.5 hover:bg-blue-700 transition-colors"
            onClick={() => trackEvent("cta_click", { location: "portfolio_card", project: item.id })}
          >
            유사 프로젝트 상담
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section className="pt-16 pb-24 bg-gray-50" id="portfolio">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            포트폴리오
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            성과 중심 제작 사례
          </h2>
          <p className="text-gray-500 text-lg">
            화면만 예쁜 게 아니라, 실제 사업 문제를 해결한 사례입니다.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            * 아래 사례는 구축 예시이며, 가상 시나리오 기반의 데모 프로젝트입니다.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
          {PORTFOLIO_ITEMS.map((item) => (
            <StaggerItem key={item.id}>
              <PortfolioCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="mt-10 text-center" delay={0.2}>
          <Link href="/portfolio" className="btn-secondary">
            전체 포트폴리오 보기 <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
