import Link from "next/link";
import { CheckCircle, ArrowRight, Calendar, Phone } from "lucide-react";
import { COMPANY_PHONE } from "@/lib/constants";

export const metadata = {
  title: "상담 신청 완료 | Build Flow",
};

export default function ContactSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center">
      <div className="section-container">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4">
            상담 신청이 완료되었습니다!
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            영업일 기준 빠르게 검토 후 연락드리겠습니다.
            <br />
            급하신 경우 아래 전화 상담을 이용해 주세요.
          </p>

          {/* Next steps */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">이제 무엇이 진행되나요?</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "신청서 검토", desc: "담당자가 신청 내용을 검토합니다 (1~2일)" },
                { step: 2, title: "연락 및 미팅 조율", desc: "전화 또는 이메일로 미팅 일정을 잡습니다" },
                { step: 3, title: "요구사항 미팅", desc: "1시간 내외의 상세 상담을 진행합니다" },
                { step: 4, title: "맞춤 견적서 발송", desc: "미팅 후 2~3일 이내에 견적서를 보내드립니다" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick contact */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="btn-secondary flex-1 justify-center"
            >
              <Phone size={16} />
              전화 상담 {COMPANY_PHONE}
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
              홈으로 돌아가기
            </Link>
            <span className="hidden sm:block text-gray-300">|</span>
            <Link href="/portfolio" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              포트폴리오 더 보기 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
