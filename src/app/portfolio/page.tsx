import Link from "next/link";
import { ArrowRight, Clock, Tag, Layers } from "lucide-react";

export const metadata = {
  title: "포트폴리오 | Build Flow",
  description: "실제 사업 문제를 해결한 웹 솔루션 제작 사례를 확인하세요.",
};

const PORTFOLIO_ITEMS = [
  {
    id: "medical-reservation",
    category: "예약 시스템",
    industry: "의료",
    title: "H의원 온라인 예약 시스템",
    problem: "전화 예약으로 인한 업무 과부하와 노쇼 발생",
    features: ["실시간 예약", "SMS 리마인더", "의사별 스케줄 관리", "관리자 대시보드"],
    period: "6주",
    stack: ["Next.js", "Supabase", "Vercel"],
    result: "예약 전화 70% 감소, 노쇼율 35% 개선",
    colorClass: "from-blue-500 to-blue-700",
  },
  {
    id: "brand-landing",
    category: "랜딩페이지",
    industry: "뷰티",
    title: "I브랜드 신제품 출시 랜딩",
    problem: "광고 클릭 후 전환율이 1% 미만으로 ROAS 저조",
    features: ["단계형 스크롤 스토리", "리뷰 소셜 증거", "즉시 구매 CTA", "픽셀 추적"],
    period: "2주",
    stack: ["Next.js", "GA4", "Meta Pixel"],
    result: "광고 전환율 1% → 4.8% 개선",
    colorClass: "from-rose-400 to-pink-600",
  },
  {
    id: "b2b-portal",
    category: "기업 홈페이지",
    industry: "제조업",
    title: "J제조사 B2B 파트너 포털",
    problem: "영업 담당자 없이도 파트너사가 견적과 발주를 처리할 수 없었음",
    features: ["파트너 로그인", "견적 자동 생성", "발주 관리", "재고 조회"],
    period: "10주",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    result: "영업 처리 시간 60% 단축",
    colorClass: "from-slate-600 to-slate-800",
  },
  {
    id: "fitness-saas",
    category: "SaaS 개발",
    industry: "헬스케어",
    title: "K피트니스 센터 회원 관리 SaaS",
    problem: "엑셀로 회원 관리, PT 스케줄 충돌 잦음",
    features: ["회원 등록/관리", "PT 예약", "결제 연동", "출석 관리"],
    period: "14주",
    stack: ["Next.js", "Supabase", "Stripe", "Vercel"],
    result: "관리 시간 80% 절감, 센터 3곳 도입",
    colorClass: "from-emerald-500 to-teal-700",
  },
  {
    id: "education-platform",
    category: "온라인 플랫폼",
    industry: "교육",
    title: "L교육원 온라인 강의 플랫폼",
    problem: "오프라인 강의만 운영, 수강생 확장에 한계",
    features: ["강의 스트리밍", "수강생 관리", "결제 구독", "진도 관리"],
    period: "12주",
    stack: ["Next.js", "Supabase", "Cloudflare Stream"],
    result: "온라인 수강생 0 → 350명 달성",
    colorClass: "from-violet-500 to-purple-700",
  },
  {
    id: "restaurant-renewal",
    category: "리뉴얼",
    industry: "F&B",
    title: "M레스토랑 예약 시스템 리뉴얼",
    problem: "구형 홈페이지로 모바일 접속 시 이탈률 80%",
    features: ["모바일 최적화", "실시간 예약", "웨이팅 시스템", "SNS 연동"],
    period: "4주",
    stack: ["Next.js", "Supabase", "Vercel"],
    result: "모바일 이탈률 80% → 35% 개선",
    colorClass: "from-amber-400 to-orange-600",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            포트폴리오
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            성과 중심 제작 사례
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            예쁜 화면만이 아니라, 실제 사업 문제를 해결한 사례입니다.
          </p>
          <p className="text-gray-400 text-sm">
            * 아래 사례는 구축 예시이며, 가상 시나리오 기반의 데모 프로젝트입니다.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover flex flex-col">
              {/* Thumbnail */}
              <div className={`h-36 bg-gradient-to-br ${item.colorClass} relative flex items-end p-5`}>
                <div>
                  <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-white font-black text-lg mt-1.5 leading-tight">{item.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Tag size={10} /> {item.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {item.period}
                  </span>
                </div>

                <div className="bg-orange-50 rounded-xl p-3 mb-3">
                  <p className="text-xs font-semibold text-orange-700 mb-0.5">해결한 문제</p>
                  <p className="text-sm text-orange-800">{item.problem}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.features.map((f) => (
                    <span key={f} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="bg-green-50 rounded-xl p-3 mb-4 flex-1">
                  <p className="text-xs font-semibold text-green-700 mb-0.5">결과</p>
                  <p className="text-sm text-green-800 font-semibold">{item.result}</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="flex-1 text-center text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl py-2.5 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    상세 보기
                  </Link>
                  <Link
                    href={`/contact?ref=${item.id}`}
                    className="flex-1 text-center text-xs font-semibold text-white bg-blue-600 rounded-xl py-2.5 hover:bg-blue-700 transition-colors"
                  >
                    유사 상담
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-3">유사한 프로젝트를 구상 중이신가요?</h2>
          <p className="text-blue-200 mb-6">무료 상담으로 현실적인 방향을 잡아드립니다.</p>
          <Link href="/contact" className="btn-outline-white">
            무료 상담 신청하기 <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
