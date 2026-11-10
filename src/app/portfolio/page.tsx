import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";

export const metadata = {
  title: "포트폴리오 | Build Flow",
  description: "가상 시나리오를 바탕으로 설계한 웹 솔루션 구축 예시를 확인하세요.",
};

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
            웹 솔루션 구축 예시
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            사례별 설계 과정을 살펴보고 예약, 견적 작성 등 핵심 기능을 직접 체험해 보세요.
          </p>
          <p className="text-gray-400 text-sm">
            기간과 성과 수치는 가상 시나리오의 예시입니다.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover flex flex-col"
            >
              {/* Thumbnail */}
              <div className={`h-36 bg-gradient-to-br ${item.colorClass} relative flex items-end p-5`}>
                <div>
                  <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h2 className="text-white font-black text-lg mt-1.5 leading-tight">{item.title}</h2>
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
                  <p className="text-xs font-semibold text-orange-700 mb-0.5">시나리오의 과제</p>
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
                  <p className="text-xs font-semibold text-green-700 mb-0.5">예시 성과</p>
                  <p className="text-sm text-green-800 font-semibold">{item.result}</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-gray-200 px-2 text-center text-sm font-semibold text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                  >
                    상세 보기
                  </Link>
                  <Link
                    href={`/contact?ref=${item.id}`}
                    className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-blue-600 px-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    유사 상담
                  </Link>
                </div>
              </div>
            </article>
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
