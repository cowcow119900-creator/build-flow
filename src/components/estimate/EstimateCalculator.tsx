"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, ChevronRight, ChevronLeft, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { trackEvent } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";

type EstimateState = {
  purpose: string;
  designLevel: string;
  features: string[];
  hasAdmin: boolean;
  hasMember: boolean;
  hasPayment: boolean;
  hasReservation: boolean;
  timeline: string;
  budget: string;
};

const PURPOSES = [
  { value: "corporate", label: "기업 홈페이지", icon: "🏢", baseMin: 150, baseMax: 300 },
  { value: "landing", label: "랜딩페이지", icon: "🚀", baseMin: 80, baseMax: 200 },
  { value: "shopping", label: "쇼핑몰", icon: "🛒", baseMin: 300, baseMax: 700 },
  { value: "reservation", label: "예약 시스템", icon: "📅", baseMin: 200, baseMax: 500 },
  { value: "admin", label: "관리자 시스템", icon: "🖥️", baseMin: 250, baseMax: 600 },
  { value: "renewal", label: "리뉴얼", icon: "🔄", baseMin: 120, baseMax: 350 },
  { value: "saas", label: "SaaS 개발", icon: "⚙️", baseMin: 500, baseMax: 1500 },
  { value: "ai", label: "AI 자동화", icon: "🤖", baseMin: 180, baseMax: 450 },
];

const DESIGN_LEVELS = [
  { value: "standard", label: "스탠다드", desc: "기능 중심 깔끔한 디자인", add: 0 },
  { value: "premium", label: "프리미엄", desc: "브랜드 맞춤 고퀄리티", add: 80 },
  { value: "enterprise", label: "엔터프라이즈", desc: "모션·인터랙션 포함 최상급", add: 200 },
];

const EXTRA_FEATURES = [
  { value: "cms", label: "CMS 콘텐츠 관리", add: 50 },
  { value: "multilang", label: "다국어 지원", add: 80 },
  { value: "seo", label: "SEO 최적화", add: 60 },
  { value: "analytics", label: "GA4 / 통계", add: 40 },
  { value: "chatbot", label: "AI 챗봇 연동", add: 120 },
  { value: "email", label: "이메일 자동화", add: 50 },
];

const TIMELINES = [
  { value: "urgent", label: "1개월 이내", surcharge: 30 },
  { value: "normal", label: "1~2개월", surcharge: 0 },
  { value: "relaxed", label: "2~3개월", surcharge: 0 },
  { value: "flexible", label: "일정 협의", surcharge: 0 },
];

const BUDGETS = [
  { value: "under100", label: "100만원 미만" },
  { value: "100-300", label: "100~300만원" },
  { value: "300-500", label: "300~500만원" },
  { value: "500-1000", label: "500~1000만원" },
  { value: "over1000", label: "1000만원 이상" },
  { value: "undecided", label: "미정 / 협의" },
];

function computeRange(state: EstimateState) {
  const purpose = PURPOSES.find((p) => p.value === state.purpose);
  if (!purpose) return { min: 0, max: 0, weeks: "-", difficulty: "-", approach: "-" };

  let min = purpose.baseMin, max = purpose.baseMax;
  const design = DESIGN_LEVELS.find((d) => d.value === state.designLevel);
  if (design) { min += design.add; max += design.add + 50; }
  if (state.hasAdmin) { min += 80; max += 150; }
  if (state.hasMember) { min += 60; max += 100; }
  if (state.hasPayment) { min += 80; max += 150; }
  if (state.hasReservation) { min += 100; max += 180; }
  state.features.forEach((f) => {
    const feat = EXTRA_FEATURES.find((x) => x.value === f);
    if (feat) { min += feat.add; max += feat.add + 20; }
  });
  const tl = TIMELINES.find((t) => t.value === state.timeline);
  if (tl?.surcharge) { min += tl.surcharge; max += tl.surcharge; }

  const weeks = state.purpose === "saas" ? "12~20주" : state.purpose === "shopping" ? "6~10주" :
    state.purpose === "reservation" ? "5~8주" : state.purpose === "landing" ? "1~3주" : "3~6주";
  const difficulty = min > 600 ? "높음" : min > 300 ? "중간" : "낮음";
  const approach = state.purpose === "saas" ? "Agile 스프린트" : state.purpose === "landing" ? "빠른 출시" : "단계별 검수";

  return { min, max, weeks, difficulty, approach };
}

// Animated number that counts to target
function LiveNumber({ value, suffix = "만원" }: { value: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    if (start === end) return;
    const startTime = performance.now();
    const duration = 600;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else { setDisplayed(end); prevRef.current = end; }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span>{displayed.toLocaleString()}{suffix}</span>;
}

// Live estimate panel (shown alongside steps 1-3)
function EstimatePanel({ state }: { state: EstimateState }) {
  const est = computeRange(state);
  const hasPurpose = !!state.purpose;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white sticky top-28"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap size={16} className="text-blue-300" />
        <p className="text-blue-200 text-sm font-semibold">실시간 예상 견적</p>
      </div>

      {hasPurpose ? (
        <>
          <div className="mb-4">
            <p className="text-blue-200 text-xs mb-1">예상 비용</p>
            <p className="text-2xl font-black">
              <LiveNumber value={est.min} />
              <span className="text-lg"> ~ </span>
              <LiveNumber value={est.max} />
            </p>
            <p className="text-blue-300 text-xs mt-0.5">VAT 별도</p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">예상 기간</span>
              <span className="text-white font-semibold">{est.weeks}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">난이도</span>
              <span className={`font-semibold ${est.difficulty === "높음" ? "text-red-300" : est.difficulty === "중간" ? "text-yellow-300" : "text-green-300"}`}>
                {est.difficulty}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">방식</span>
              <span className="text-white font-semibold">{est.approach}</span>
            </div>
          </div>

          {/* Options selected */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {state.purpose && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {PURPOSES.find((p) => p.value === state.purpose)?.label}
              </span>
            )}
            {state.hasAdmin && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">관리자</span>}
            {state.hasMember && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">회원기능</span>}
            {state.hasPayment && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">결제</span>}
            {state.hasReservation && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">예약</span>}
            {state.features.map((f) => (
              <span key={f} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {EXTRA_FEATURES.find((x) => x.value === f)?.label}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="py-4 text-center">
          <p className="text-blue-200 text-sm">제작 유형을 선택하면<br />예상 비용을 바로 확인합니다.</p>
        </div>
      )}

      <p className="text-blue-400 text-[10px]">* 상담 후 확정 견적이 달라질 수 있습니다.</p>
    </motion.div>
  );
}

const STEP_LABELS = ["제작 유형", "기능 선택", "일정·예산", "결과 확인"];

export default function EstimateCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const totalSteps = 4;

  const [state, setState] = useState<EstimateState>({
    purpose: searchParams.get("service") || "",
    designLevel: "standard",
    features: [],
    hasAdmin: false,
    hasMember: false,
    hasPayment: false,
    hasReservation: false,
    timeline: "normal",
    budget: "undecided",
  });

  const result = computeRange(state);

  const toggleFeature = (val: string) => {
    setState((prev) => ({
      ...prev,
      features: prev.features.includes(val)
        ? prev.features.filter((f) => f !== val)
        : [...prev.features, val],
    }));
  };

  const handleNext = async () => {
    if (step === 3) {
      setAnalyzing(true);
      trackEvent("estimate_complete", { purpose: state.purpose });
      await new Promise((r) => setTimeout(r, 1500));
      setAnalyzing(false);
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const handleContactRedirect = () => {
    const params = new URLSearchParams({
      purpose: state.purpose,
      designLevel: state.designLevel,
      features: state.features.join(","),
      hasAdmin: String(state.hasAdmin),
      hasMember: String(state.hasMember),
      hasPayment: String(state.hasPayment),
      hasReservation: String(state.hasReservation),
      timeline: state.timeline,
      budget: state.budget,
    });
    trackEvent("contact_form_entry", { source: "estimate" });
    router.push(`/contact?${params.toString()}`);
  };

  const inputBase = "p-3 rounded-xl border-2 text-left transition-all text-sm font-medium cursor-pointer";
  const inputActive = "border-blue-600 bg-blue-50 text-blue-700";
  const inputIdle = "border-gray-100 text-gray-600 hover:border-blue-200 bg-white";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main calculator */}
      <div className="lg:col-span-2">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {STEP_LABELS.map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 text-sm font-semibold ${
                  i + 1 <= step ? "text-blue-600" : "text-gray-300"
                }`}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 ${
                    i + 1 < step
                      ? "bg-blue-600 border-blue-600 text-white"
                      : i + 1 === step
                      ? "border-blue-600 text-blue-600 bg-white"
                      : "border-gray-200 text-gray-300 bg-white"
                  }`}
                  animate={{ scale: i + 1 === step ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {i + 1 < step ? <CheckCircle size={14} /> : i + 1}
                </motion.div>
                <span className="hidden sm:block">{label}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        {/* Step content with slide transition */}
        <AnimatePresence mode="wait">
          {/* Analyzing overlay */}
          {analyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-5" />
              <p className="text-gray-700 font-bold text-lg mb-2">프로젝트 범위를 분석하고 있습니다</p>
              <p className="text-gray-400 text-sm">선택하신 기능을 바탕으로 최적의 견적을 산출합니다...</p>
            </motion.div>
          )}

          {/* Step 1 */}
          {!analyzing && step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-black text-gray-900 mb-2">어떤 것을 만들고 싶으신가요?</h3>
              <p className="text-gray-500 text-sm mb-6">가장 가까운 제작 유형을 선택해 주세요.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PURPOSES.map((p) => (
                  <motion.button
                    key={p.value}
                    onClick={() => setState((prev) => ({ ...prev, purpose: p.value }))}
                    className={`${inputBase} ${state.purpose === p.value ? inputActive : inputIdle}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    animate={state.purpose === p.value ? { scale: [1, 1.04, 1] } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-xl mb-1 block">{p.icon}</span>
                    <p className={`text-sm font-bold ${state.purpose === p.value ? "text-blue-600" : "text-gray-800"}`}>
                      {p.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.baseMin}~{p.baseMax}만원</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {!analyzing && step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-black text-gray-900 mb-2">필요한 기능을 선택해 주세요.</h3>
              <p className="text-gray-500 text-sm mb-6">해당하는 항목을 모두 선택하세요. 선택 시 우측 견적이 실시간 업데이트됩니다.</p>

              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">핵심 기능</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "hasAdmin" as const, label: "관리자 페이지", add: "+80만원~" },
                      { key: "hasMember" as const, label: "회원가입 / 로그인", add: "+60만원~" },
                      { key: "hasPayment" as const, label: "결제 기능", add: "+80만원~" },
                      { key: "hasReservation" as const, label: "예약 기능", add: "+100만원~" },
                    ].map((opt) => (
                      <motion.button
                        key={opt.key}
                        onClick={() => setState((prev) => ({ ...prev, [opt.key]: !prev[opt.key] }))}
                        className={`${inputBase} ${state[opt.key] ? inputActive : inputIdle}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="block">{state[opt.key] ? "✓ " : ""}{opt.label}</span>
                        <span className="text-xs text-gray-400 mt-0.5 block">{opt.add}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">디자인 수준</p>
                  <div className="space-y-2">
                    {DESIGN_LEVELS.map((d) => (
                      <motion.button
                        key={d.value}
                        onClick={() => setState((prev) => ({ ...prev, designLevel: d.value }))}
                        className={`w-full flex items-center justify-between ${inputBase} ${state.designLevel === d.value ? inputActive : inputIdle}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="text-left">
                          <p className={`font-bold ${state.designLevel === d.value ? "text-blue-700" : "text-gray-800"}`}>{d.label}</p>
                          <p className="text-xs text-gray-400">{d.desc}</p>
                        </div>
                        {d.add > 0 && <span className="text-xs text-gray-500">+{d.add}만원~</span>}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">추가 기능 (선택)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {EXTRA_FEATURES.map((f) => (
                      <motion.button
                        key={f.value}
                        onClick={() => toggleFeature(f.value)}
                        className={`${inputBase} ${state.features.includes(f.value) ? inputActive : inputIdle}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {state.features.includes(f.value) ? "✓ " : ""}{f.label}
                        <span className="block text-xs text-gray-400 mt-0.5">+{f.add}만원~</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {!analyzing && step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-black text-gray-900 mb-2">일정과 예산을 알려주세요.</h3>
              <p className="text-gray-500 text-sm mb-6">더 정확한 견적을 위한 정보입니다.</p>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">희망 오픈 일정</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIMELINES.map((t) => (
                      <motion.button
                        key={t.value}
                        onClick={() => setState((prev) => ({ ...prev, timeline: t.value }))}
                        className={`${inputBase} ${state.timeline === t.value ? inputActive : inputIdle}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {t.label}
                        {t.surcharge > 0 && (
                          <span className="block text-xs text-orange-500 mt-0.5">긴급 +{t.surcharge}만원</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">예상 예산 범위</p>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGETS.map((b) => (
                      <motion.button
                        key={b.value}
                        onClick={() => setState((prev) => ({ ...prev, budget: b.value }))}
                        className={`${inputBase} ${state.budget === b.value ? inputActive : inputIdle}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {b.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Result */}
          {!analyzing && step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="text-green-600" size={28} />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">예상 견적이 준비되었습니다</h3>
                <p className="text-gray-500">선택 내용 기반의 예상 범위입니다.</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center mb-6"
              >
                <p className="text-blue-200 text-sm mb-2">예상 제작 비용</p>
                <p className="text-4xl font-black mb-1">
                  {result.min.toLocaleString()}~{result.max.toLocaleString()}만원
                </p>
                <p className="text-blue-200 text-sm">VAT 별도</p>
              </motion.div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "예상 기간", value: result.weeks },
                  { label: "난이도", value: result.difficulty },
                  { label: "추천 방식", value: result.approach },
                ].map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <p className="text-gray-400 text-xs mb-1">{d.label}</p>
                    <p className="text-gray-900 font-bold text-sm">{d.value}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-xs text-gray-400 text-center mb-6">
                * 실제 견적은 상담 후 요구사항 분석을 통해 확정됩니다.
              </p>

              <motion.button
                onClick={handleContactRedirect}
                className="btn-primary w-full py-4 text-base justify-center"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(29,91,231,0.35)" }}
                whileTap={{ scale: 0.98 }}
                animate={{ boxShadow: ["0 4px 16px rgba(29,91,231,0.2)", "0 8px 32px rgba(29,91,231,0.35)", "0 4px 16px rgba(29,91,231,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                이 내용으로 무료 상담 신청하기
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!analyzing && step < 4 && (
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={() => setStep((s) => Math.max(s - 1, 1))}
              disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all ${
                step === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
              whileHover={step > 1 ? { scale: 1.02 } : {}}
              whileTap={step > 1 ? { scale: 0.97 } : {}}
            >
              <ChevronLeft size={16} /> 이전
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={step === 1 && !state.purpose}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              whileHover={state.purpose || step > 1 ? { scale: 1.03 } : {}}
              whileTap={state.purpose || step > 1 ? { scale: 0.97 } : {}}
            >
              {step === 3 ? "결과 보기" : "다음 단계"}
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Live estimate panel — hide on step 4 */}
      {step < 4 && (
        <div className="hidden lg:block">
          <EstimatePanel state={state} />
        </div>
      )}
    </div>
  );
}
