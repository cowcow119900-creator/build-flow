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
    <section className="pt-20 pb-16 bg-gray-50 overflow-hidden" id="why-us">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <AnimatedSection variants={fadeRight}>
            <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              왜 Build Flow인가
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              단순히 만들지 않습니다.
              <br />
              <span className="text-blue-600">사업 목적에서 역산합니다.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              홈페이지를 만든 뒤 &lsquo;왜 문의가 없지?&rsquo;라고 느끼셨다면,
              처음부터 전환 구조를 설계하지 않았기 때문입니다.
              저희는 결과부터 역산해서 구조를 설계합니다.
            </p>

            {/* Stats with counter */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
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
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.08}>
              {WHY_US.map((item) => {
                const Icon = ICON_MAP[item.icon] || Target;
                return (
                  <StaggerItem key={item.title}>
                    <motion.div
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                      whileHover={{
                        y: -4,
                        boxShadow: "0 12px 32px rgba(29,91,231,0.1)",
                        borderColor: "#bfdbfe",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                        <Icon size={20} className="text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
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
