import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Layers, CheckCircle } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { getPortfolioItem, PORTFOLIO_ITEMS } from "@/lib/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PORTFOLIO_ITEMS.filter((item) => item.detail).map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return { title: "페이지를 찾을 수 없습니다 | Build Flow" };
  return {
    title: `${item.title} | Build Flow 포트폴리오`,
    description: `${item.title}의 설계와 기대 효과를 소개하는 가상 구축 예시입니다.`,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();
  const { detail } = item;
  if (!detail) redirect(`/portfolio#${item.id}`);

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
            가상 시나리오 기반 데모
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
            <span className="font-semibold text-gray-700">예시 제작 기간</span> {item.period}
          </span>
          <span className="flex items-center gap-1.5 bg-white rounded-xl px-4 py-2 border border-gray-100 shadow-sm">
            <Layers size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-700">기술 스택</span> {item.stack.join(", ")}
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
              <p className="text-gray-600 leading-relaxed">{detail.problem}</p>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-black">분</span>
                분석과 접근 방향
              </h2>
              <p className="text-gray-600 leading-relaxed">{detail.analysis}</p>
            </div>

            {/* Design */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xs font-black">설</span>
                설계 방향
              </h2>
              <p className="text-gray-600 leading-relaxed">{detail.design}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xs font-black">기</span>
                핵심 기능
              </h2>
              <div className="space-y-4">
                {detail.features.map((f) => (
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
              <h3 className="font-black text-green-800 mb-4">시나리오의 예시 성과</h3>
              <ul className="space-y-2">
                {detail.results.map((r) => (
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
                {detail.effects.map((e) => (
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
