import InsightsList from "@/components/insights/InsightsList";
import { INSIGHTS } from "@/lib/insights";

export const metadata = {
  title: "인사이트 | Build Flow",
};

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

        <InsightsList insights={INSIGHTS} />
      </div>
    </div>
  );
}
