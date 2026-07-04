import { Suspense } from "react";
import { Calculator } from "lucide-react";
import EstimateCalculator from "@/components/estimate/EstimateCalculator";

export const metadata = {
  title: "무료 견적 계산기 | Build Flow",
  description: "제작 유형과 필요 기능을 선택하면 예상 비용과 제작 기간을 바로 확인할 수 있습니다.",
};

export default function EstimatePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Calculator className="text-white" size={26} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            무료 견적 계산기
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            원하는 기능을 선택하면 예상 제작 비용과 기간을 바로 알 수 있습니다.
            결과는 상담 신청 시 자동으로 반영됩니다.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
          <Suspense fallback={
            <div className="text-center py-20 text-gray-400">견적 계산기 로딩 중...</div>
          }>
            <EstimateCalculator />
          </Suspense>
        </div>

        {/* Notes */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-5 max-w-2xl mx-auto">
          <p className="text-blue-800 font-semibold text-sm mb-2">💡 견적 계산기 안내</p>
          <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
            <li>예상 금액은 실제 범위와 ±20% 차이가 날 수 있습니다.</li>
            <li>정확한 견적은 요구사항 분석 후 확정됩니다.</li>
            <li>VAT(부가세) 10%는 별도입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
