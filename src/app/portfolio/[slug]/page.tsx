import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Tag, Layers, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

const PORTFOLIO_DETAIL: Record<string, {
  id: string;
  category: string;
  industry: string;
  title: string;
  colorClass: string;
  problem: string;
  analysis: string;
  design: string;
  features: Array<{ name: string; desc: string }>;
  results: string[];
  period: string;
  stack: string[];
  effects: string[];
  note: string;
}> = {
  "medical-reservation": {
    id: "medical-reservation",
    category: "예약 시스템",
    industry: "의료",
    title: "H의원 온라인 예약 시스템",
    colorClass: "from-blue-500 to-blue-700",
    problem: "H의원은 하루 평균 60건 이상의 전화 예약을 처리했습니다. 간호사 2명이 예약 전화 응대에 대부분의 시간을 소비했고, 전화가 연결되지 않아 예약 기회를 놓치는 경우도 빈번했습니다. 또한 노쇼율이 20%를 넘어 진료 공백이 지속되었습니다.",
    analysis: "문제의 핵심은 '예약 진입 장벽'이었습니다. 환자 입장에서 전화를 걸어야만 예약이 가능한 구조는 바쁜 시간대에 이탈을 유발했습니다. 실시간 온라인 예약과 자동 리마인더 발송으로 이 문제를 해결할 수 있다고 분석했습니다.",
    design: "모바일 우선 설계로 스마트폰에서 30초 이내에 예약 완료가 가능하도록 UX를 설계했습니다. 진료과별 → 의사별 → 날짜/시간 순서의 직관적인 흐름을 구성했습니다.",
    features: [
      { name: "실시간 예약", desc: "진료과별 · 의사별 가용 시간을 실시간으로 표시하고 즉시 예약 확정" },
      { name: "SMS/카카오 리마인더", desc: "예약 1일 전, 2시간 전 자동 알림 발송으로 노쇼 방지" },
      { name: "의사별 스케줄 관리", desc: "관리자 페이지에서 진료 일정과 예약 현황을 한눈에 관리" },
      { name: "대기자 자동 배정", desc: "취소 발생 시 대기자에게 자동으로 예약 기회 부여" },
    ],
    results: [
      "예약 전화 건수 70% 감소",
      "노쇼율 20% → 13%로 35% 개선",
      "온라인 예약 비중 0% → 68%",
      "간호사 예약 처리 업무 80% 절감",
    ],
    period: "6주",
    stack: ["Next.js", "Supabase", "Vercel", "Coolsms API"],
    effects: [
      "진료 효율 증가로 실질 수익 개선",
      "환자 편의성 향상으로 재방문율 증가",
      "스태프 업무 부담 감소",
    ],
    note: "구축 예시 — 가상 시나리오 기반 데모 프로젝트",
  },
  "brand-landing": {
    id: "brand-landing",
    category: "랜딩페이지",
    industry: "뷰티",
    title: "I브랜드 신제품 출시 랜딩페이지",
    colorClass: "from-rose-400 to-pink-600",
    problem: "인스타그램 광고를 월 300만원씩 집행했지만, 랜딩페이지 전환율이 1% 미만이었습니다. ROAS가 1.2 수준에 머물러 광고를 늘릴수록 손실이 쌓이는 구조였습니다.",
    analysis: "기존 랜딩페이지는 제품 설명은 길었지만 구매 결정을 유도하는 사회적 증거, 긴급성 요소, 명확한 CTA가 없었습니다. 또한 페이지 로딩이 느려 모바일 이탈률이 높았습니다.",
    design: "스크롤 하나하나에 구매 설득의 단계를 배치했습니다. 후기 → 효과 → 성분 → 비교 → 한정 CTA의 순서로 자연스럽게 구매 의향을 높이는 구조로 설계했습니다.",
    features: [
      { name: "스크롤 스토리텔링", desc: "스크롤 단계마다 설득 요소를 배치한 세일즈 퍼널 구조" },
      { name: "소셜 증거 섹션", desc: "실제 구매 후기와 SNS 인증샷 자동 수집 및 표시" },
      { name: "즉시 구매 CTA", desc: "스크롤 위치에 따라 노출되는 고정 구매 버튼" },
      { name: "픽셀·GA4 추적", desc: "Meta 픽셀과 GA4 연동으로 광고 전환 정확 추적" },
    ],
    results: [
      "전환율 0.8% → 4.8% (6배 개선)",
      "ROAS 1.2 → 5.8 달성",
      "페이지 로딩 속도 4.2초 → 1.1초",
      "모바일 이탈률 75% → 48%",
    ],
    period: "2주",
    stack: ["Next.js", "Vercel", "GA4", "Meta Pixel"],
    effects: [
      "같은 광고비로 6배 더 많은 전환 달성",
      "광고 예산을 늘릴 수 있는 구조 확보",
      "정확한 전환 추적으로 광고 최적화 가능",
    ],
    note: "구축 예시 — 가상 시나리오 기반 데모 프로젝트",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(PORTFOLIO_DETAIL).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = PORTFOLIO_DETAIL[slug];
  if (!item) return { title: "Not Found" };
  return { title: `${item.title} | Build Flow 포트폴리오` };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = PORTFOLIO_DETAIL[slug];
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        {/* Back */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          포트폴리오로 돌아가기
        </Link>

        {/* Hero */}
        <div className={`h-56 md:h-72 bg-gradient-to-br ${item.colorClass} rounded-3xl flex items-end p-8 mb-8 relative overflow-hidden`}>
          <div className="absolute top-5 right-5 bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full border border-white/20">
            {item.note}
          </div>
          <div>
            <span className="bg-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full mb-3 inline-block">
              {item.category} · {item.industry}
            </span>
            <h1 className="text-white font-black text-2xl md:text-4xl">{item.title}</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-10 text-sm text-gray-500">
          <span className="flex items-center gap-1.5 bg-white rounded-xl px-4 py-2 border border-gray-100 shadow-sm">
            <Clock size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-700">제작 기간:</span> {item.period}
          </span>
          <span className="flex items-center gap-1.5 bg-white rounded-xl px-4 py-2 border border-gray-100 shadow-sm">
            <Layers size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-700">기술 스택:</span> {item.stack.join(", ")}
          </span>
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Problem */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-xs font-black">문</span>
                해결해야 할 문제
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.problem}</p>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-black">분</span>
                분석과 접근 방향
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.analysis}</p>
            </div>

            {/* Design */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xs font-black">설</span>
                설계 방향
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.design}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xs font-black">기</span>
                구현한 핵심 기능
              </h2>
              <div className="space-y-4">
                {item.features.map((f) => (
                  <div key={f.name} className="flex gap-3">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{f.name}</p>
                      <p className="text-gray-500 text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Results */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <h3 className="font-black text-green-800 mb-4">제작 결과</h3>
              <ul className="space-y-2">
                {item.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-green-700">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Effects */}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="font-black text-blue-800 mb-4">기대 효과</h3>
              <ul className="space-y-2">
                {item.effects.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-blue-700">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white text-center">
              <p className="font-black text-base mb-2">유사 프로젝트 상담</p>
              <p className="text-blue-200 text-sm mb-4">이런 솔루션이 필요하신가요?</p>
              <Link
                href={`/contact?ref=${item.id}`}
                className="btn-outline-white text-sm w-full justify-center"
              >
                무료 상담 신청
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
