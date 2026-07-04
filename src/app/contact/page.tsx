import { Suspense } from "react";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { COMPANY_EMAIL, COMPANY_PHONE } from "@/lib/constants";

export const metadata = {
  title: "무료 상담 신청 | Build Flow",
  description: "프로젝트 상담을 신청하세요. 영업일 기준 1~2일 이내에 담당자가 연락드립니다.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <h1 className="text-3xl font-black text-gray-900 mb-3">무료 상담 신청</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                프로젝트 정보를 남겨주시면 담당자가 검토 후 빠르게 연락드립니다.
                상담은 완전히 무료입니다.
              </p>

              {/* Contact info */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Clock,
                    title: "응답 시간",
                    desc: "영업일 기준 1~2일 이내",
                  },
                  {
                    icon: Phone,
                    title: "전화 상담",
                    desc: COMPANY_PHONE,
                    href: `tel:${COMPANY_PHONE}`,
                  },
                  {
                    icon: Mail,
                    title: "이메일",
                    desc: COMPANY_EMAIL,
                    href: `mailto:${COMPANY_EMAIL}`,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-900 font-medium text-sm hover:text-blue-600">
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium text-sm">{item.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Process */}
              <div className="bg-blue-50 rounded-2xl p-5">
                <p className="text-blue-800 font-bold text-sm mb-3">상담 후 진행 순서</p>
                <ol className="space-y-2">
                  {[
                    "신청서 검토 (1~2일)",
                    "담당자 연락 및 미팅 일정 조율",
                    "요구사항 미팅 (1시간)",
                    "맞춤 견적서 발송",
                    "계약 및 프로젝트 시작",
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                      <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
              <Suspense fallback={<div className="text-center py-20 text-gray-400">폼 로딩 중...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
