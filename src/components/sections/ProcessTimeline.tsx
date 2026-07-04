"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle, Search, FileText, Layers, Palette,
  Code2, CheckCircle2, Globe, Wrench, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEPS = [
  {
    step: 1, title: "무료 상담", icon: MessageCircle,
    desc: "사업 목표와 필요 기능을 파악합니다.",
    deliverables: ["상담 체크리스트", "요구사항 초안"],
    duration: "1~2일",
    detail: "전화 또는 화상 미팅을 통해 프로젝트 방향을 설정합니다. 비용과 일정은 이 단계에서 대략적으로 안내드립니다.",
  },
  {
    step: 2, title: "요구사항 분석", icon: Search,
    desc: "기능 범위와 기술 스택을 설계합니다.",
    deliverables: ["기능 명세서", "기술 스택 제안"],
    duration: "2~3일",
    detail: "사업 흐름을 분석하고 필요한 기능을 구체화합니다. 비슷한 프로젝트 레퍼런스를 공유합니다.",
  },
  {
    step: 3, title: "견적 및 계약", icon: FileText,
    desc: "명확한 범위와 비용을 계약서로 확인합니다.",
    deliverables: ["상세 견적서", "계약서"],
    duration: "1일",
    detail: "모든 기능과 비용이 명시된 계약서를 작성합니다. 이후 범위 변경은 별도 협의합니다.",
  },
  {
    step: 4, title: "화면 설계", icon: Layers,
    desc: "사용자 흐름과 정보 구조를 설계합니다.",
    deliverables: ["와이어프레임", "사이트맵"],
    duration: "3~7일",
    detail: "Figma로 화면 흐름을 설계하고 고객 확인 후 진행합니다. 이 단계에서 방향 수정이 자유롭습니다.",
  },
  {
    step: 5, title: "UI/UX 디자인", icon: Palette,
    desc: "브랜드 정체성을 반영한 UI를 완성합니다.",
    deliverables: ["디자인 시안", "디자인 시스템"],
    duration: "5~10일",
    detail: "브랜드 컬러와 톤앤매너를 반영한 고퀄리티 디자인을 완성합니다. 최소 2회 피드백 수정을 포함합니다.",
  },
  {
    step: 6, title: "개발", icon: Code2,
    desc: "검증된 기술 스택으로 구현합니다.",
    deliverables: ["개발 중간 공유", "코드 리뷰"],
    duration: "10~30일",
    detail: "Next.js와 Supabase 기반으로 빠르고 안정적인 구조로 개발합니다. 중간 데모 링크를 제공합니다.",
  },
  {
    step: 7, title: "테스트", icon: CheckCircle2,
    desc: "기기별, 기능별 품질 검수를 진행합니다.",
    deliverables: ["QA 체크리스트", "버그 리포트"],
    duration: "2~5일",
    detail: "모바일, 태블릿, 데스크톱에서 전체 기능을 검수합니다. 고객 UAT(사용자 수락 테스트)를 진행합니다.",
  },
  {
    step: 8, title: "배포", icon: Globe,
    desc: "안정적인 서버 환경에 출시합니다.",
    deliverables: ["도메인 연결", "SSL 인증서", "배포 완료"],
    duration: "1일",
    detail: "Vercel 기반의 안정적인 서버에 배포합니다. 도메인 연결과 SSL 설정을 포함합니다.",
  },
  {
    step: 9, title: "유지보수", icon: Wrench,
    desc: "출시 후 운영 지원과 기능 확장을 합니다.",
    deliverables: ["월 리포트", "기능 확장", "보안 패치"],
    duration: "지속",
    detail: "1개월 무상 유지보수 후 월정액 또는 건별 지원 계약으로 운영합니다.",
  },
];

export default function ProcessTimeline() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Desktop: GSAP-driven scroll to advance steps
  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapInstance: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ScrollTrigger: any = null;
    let triggers: { kill: () => void }[] = [];

    import("gsap").then((mod) => {
      gsapInstance = mod.gsap ?? mod.default ?? mod;
      return import("gsap/ScrollTrigger");
    }).then((mod) => {
      ScrollTrigger = mod.ScrollTrigger;
      if (!gsapInstance || !ScrollTrigger || !sectionRef.current) return;
      gsapInstance.registerPlugin(ScrollTrigger);

      STEPS.forEach((_, i) => {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${(i / STEPS.length) * 80}% center`,
          end: `${((i + 1) / STEPS.length) * 80}% center`,
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });
        triggers.push(trigger as { kill: () => void });
      });
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, [reduced]);

  const active = STEPS[activeStep];
  const ActiveIcon = active.icon;
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <section ref={sectionRef} className="pt-16 pb-24 bg-white overflow-hidden" id="process">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            제작 프로세스
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            투명하고 예측 가능한 진행 과정
          </h2>
          <p className="text-gray-500 text-lg max-w-sm mx-auto">
            각 단계에서 무엇을 하는지, 얼마나 걸리는지 미리 알 수 있습니다.
          </p>
        </div>

        {/* Desktop: Two-column layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 min-h-[560px]">
          {/* Left: Step list (sticky) */}
          <div className="col-span-2 sticky top-28 h-fit">
            {/* Progress line */}
            <div className="flex gap-4 mb-2">
              <div className="w-8 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>진행률</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
              <motion.div
                className="absolute left-4 top-0 w-0.5 bg-blue-500 origin-top"
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />

              <div className="space-y-1">
                {STEPS.map((step, i) => {
                  const StepIcon = step.icon;
                  const isActive = i === activeStep;
                  const isDone = i < activeStep;
                  return (
                    <motion.button
                      key={step.step}
                      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                        isActive ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveStep(i)}
                      animate={{ opacity: 1 }}
                    >
                      {/* Dot */}
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                          isActive ? "bg-blue-600" : isDone ? "bg-blue-200" : "bg-gray-100"
                        }`}
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <StepIcon
                          size={14}
                          className={isActive ? "text-white" : isDone ? "text-blue-600" : "text-gray-400"}
                        />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${isActive ? "text-blue-600" : isDone ? "text-gray-700" : "text-gray-400"}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-400">{step.duration}</p>
                      </div>

                      {isDone && (
                        <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Active step detail */}
          <div ref={contentRef} className="col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-white rounded-3xl border-2 border-gray-100 p-8 h-full"
              >
                {/* Step header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <ActiveIcon size={26} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        STEP {active.step}
                      </span>
                      <span className="text-xs text-gray-400">{active.duration}</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">{active.title}</h3>
                    <p className="text-gray-500 mt-1">{active.desc}</p>
                  </div>
                </div>

                {/* Detail text */}
                <div className="bg-gray-50 rounded-2xl p-5 mb-5">
                  <p className="text-gray-700 leading-relaxed">{active.detail}</p>
                </div>

                {/* Deliverables */}
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-3">이 단계 산출물</p>
                  <div className="flex flex-wrap gap-2">
                    {active.deliverables.map((d) => (
                      <motion.span
                        key={d}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full font-medium"
                      >
                        <CheckCircle2 size={13} />
                        {d}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Last step CTA */}
                {activeStep === STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-100"
                  >
                    <p className="text-gray-600 mb-3 font-medium">
                      모든 단계가 완료되면 사업에 즉시 사용 가능한 시스템이 운영됩니다.
                    </p>
                    <Link href="/estimate" className="btn-primary">
                      무료 견적 받기 <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
                    disabled={activeStep === 0}
                    className="text-sm text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors font-medium"
                  >
                    ← 이전 단계
                  </button>
                  <button
                    onClick={() => setActiveStep((s) => Math.min(s + 1, STEPS.length - 1))}
                    disabled={activeStep === STEPS.length - 1}
                    className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-30 transition-colors font-medium"
                  >
                    다음 단계 →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Simple vertical timeline */}
        <div className="md:hidden space-y-4">
          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div key={step.step} className="relative flex gap-4">
                {/* Line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-100" />
                )}
                {/* Icon */}
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 z-10">
                  <StepIcon size={18} className="text-blue-600" />
                </div>
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{step.title}</span>
                    <span className="text-xs text-gray-400">{step.duration}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            );
          })}
          <div className="pt-4">
            <Link href="/contact" className="btn-primary w-full justify-center">
              지금 무료 상담 시작하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
