"use client";

import { motion } from "motion/react";
import { Target, Smartphone, LayoutDashboard, TrendingUp, Zap, RefreshCw } from "lucide-react";
import { WHY_US } from "@/lib/constants";
import AnimatedSection from "@/components/motion/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { fadeRight, fadeLeft } from "@/lib/motion";

const ICON_MAP: Record<string, React.ElementType> = {
  Target, Smartphone, LayoutDashboard, TrendingUp, Zap, RefreshCw,
};

const STATS = [
  { num: 120, suffix: "+", label: "구축 완료", decimals: 0 },
  { num: 4.9, suffix: "", label: "고객 만족도", decimals: 1 },
  { num: 98, suffix: "%", label: "재계약률", decimals: 0 },
];

export default function WhyUsSection() {
  return (
    <section className="home-section overflow-hidden bg-gray-50" id="why-us">
      <div className="section-container home-container">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-12">
          {/* Left */}
          <AnimatedSection variants={fadeRight}>
            <span className="flow-label mb-3">Build Flow의 설계 방식</span>
            <h2 className="mb-4 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
              고객 행동부터
              <br />
              운영까지 설계합니다.
            </h2>
            <p className="mb-5 text-base leading-relaxed text-gray-600 lg:text-lg">
              문의나 예약 이후의 운영 절차를 먼저 정하고, 그에 맞춰 고객 화면과 관리 기능을 설계합니다.
            </p>

            {/* Stats with counter */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm md:p-4"
                >
                  <p className="text-2xl font-black text-blue-600">
                    <AnimatedCounter
                      target={s.num}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      duration={1800}
                    />
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Feature cards */}
          <AnimatedSection variants={fadeLeft}>
            <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.08}>
              {WHY_US.map((item) => {
                const Icon = ICON_MAP[item.icon] || Target;
                return (
                  <StaggerItem key={item.title}>
                    <motion.div
                      className="flex h-full items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                      whileHover={{
                        y: -4,
                        boxShadow: "0 12px 32px rgba(29,91,231,0.1)",
                        borderColor: "#bfdbfe",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <Icon size={20} className="text-blue-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-bold text-gray-900">{item.title}</h3>
                        <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
