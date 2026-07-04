import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "인사이트 | Build Flow",
};

const ARTICLES = [
  {
    id: 1,
    tag: "전환 최적화",
    title: "랜딩페이지 전환율을 높이는 5가지 설계 원칙",
    excerpt: "광고비를 늘리기 전에, 랜딩페이지 구조를 먼저 점검하세요. 전환율 1%를 5%로 올리면 광고비 5배 효과와 같습니다.",
    date: "2025.11.15",
    readTime: "5분",
  },
  {
    id: 2,
    tag: "웹 개발",
    title: "기업 홈페이지, 왜 리뉴얼 후에도 문의가 없을까?",
    excerpt: "예쁜 디자인은 신뢰를 줄 수 있지만, 문의를 만들어 주지 않습니다. 전환 구조가 설계되지 않은 홈페이지의 공통 문제점을 분석합니다.",
    date: "2025.10.28",
    readTime: "7분",
  },
  {
    id: 3,
    tag: "SEO",
    title: "Next.js로 만드는 SEO 최적화 홈페이지의 기술 조건",
    excerpt: "서버사이드 렌더링, 메타 태그, 구조화 데이터, Core Web Vitals까지. 검색 상위 노출을 위한 기술 체크리스트를 정리했습니다.",
    date: "2025.10.10",
    readTime: "6분",
  },
  {
    id: 4,
    tag: "SaaS",
    title: "MVP 먼저? 풀 스택 먼저? SaaS 개발 전략 비교",
    excerpt: "1000만원으로 SaaS를 만들어야 한다면 무엇부터 해야 할까요? 실제 고객 피드백을 받을 수 있는 최소한의 SaaS 구조를 설명합니다.",
    date: "2025.09.22",
    readTime: "8분",
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            인사이트
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            웹 솔루션 인사이트
          </h1>
          <p className="text-gray-500 text-lg">
            사업에 도움이 되는 웹 개발 지식과 전환 최적화 전략을 공유합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ARTICLES.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {article.tag}
              </span>
              <h2 className="font-black text-gray-900 text-lg mb-3 leading-snug">
                {article.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {article.date}
                  </span>
                  <span>{article.readTime} 읽기</span>
                </div>
                <span className="text-blue-600 text-xs font-semibold hover:text-blue-700 cursor-pointer flex items-center gap-1">
                  읽기 <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
