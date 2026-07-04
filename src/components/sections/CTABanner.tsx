"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY_PHONE } from "@/lib/constants";
import AnimatedSection from "@/components/motion/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

const FINAL_STATS = [
  { num: 120, suffix: "+", label: "완료 프로젝트" },
  { num: 98, suffix: "%", label: "재계약률" },
  { num: 4.9, suffix: "", label: "고객 만족도", decimals: 1 },
];

export default function CTABanner() {
  return (
    <section className="py-24 gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <AnimatedSection>
          <span className="inline-block bg-blue-600/30 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            지금 시작하세요
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            프로젝트를 구체화할 준비가
            <br />되셨나요?
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            견적 계산기로 예상 비용을 먼저 확인하거나,
            <br />바로 무료 상담을 신청하세요.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/estimate" className="btn-primary text-base px-8 py-4">
              무료 견적 계산하기 <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="btn-outline-white text-base px-8 py-4">
              바로 상담 신청하기
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Stats */}
        <StaggerContainer className="flex flex-wrap justify-center gap-10 mb-10" stagger={0.12}>
          {FINAL_STATS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center">
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter target={s.num} suffix={s.suffix} decimals={s.decimals ?? 0} duration={1600} />
                </p>
                <p className="text-blue-400 text-sm mt-1">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.3}>
          <a
            href={`tel:${COMPANY_PHONE}`}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
          >
            <Phone size={16} />
            <span className="text-sm font-medium">전화 상담 {COMPANY_PHONE}</span>
            <span className="text-blue-500 text-sm">(평일 09:00~18:00)</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
