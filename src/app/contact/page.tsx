import { ArrowUpRight, Clock, Mail, MessageSquare, Phone } from "lucide-react";
import ContactSummary from "@/components/contact/ContactSummary";
import { COMPANY_EMAIL, COMPANY_PHONE, KAKAO_CHAT_URL } from "@/lib/constants";
import { getEstimateContactDetails } from "@/lib/estimate";
import { getPortfolioItem } from "@/lib/portfolio";

export const metadata = {
  title: "무료 상담 신청 | Build Flow",
  description: "Build Flow에 웹 제작과 프로젝트 견적을 문의하세요.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(await searchParams)) {
    if (typeof value === "string") params.set(name, value);
  }

  const details = getEstimateContactDetails(params);
  const projectSlug = params.get("ref");
  const project = projectSlug ? getPortfolioItem(projectSlug) : undefined;
  if (project) details.push({ label: "참고 사례", value: project.title });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <h1 className="text-3xl font-black text-gray-900 mb-3">무료 상담 신청</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                준비 중인 프로젝트나 궁금한 점을 알려 주세요. 담당자가 내용을 확인하고 제작 방향을 함께 검토합니다.
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
                    "문의 내용 검토 (1~2일)",
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

          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10" aria-labelledby="consultation-title">
            <div className="w-12 h-12 rounded-xl bg-yellow-300 text-gray-900 flex items-center justify-center mb-5">
              <MessageSquare size={22} aria-hidden="true" />
            </div>
            <h2 id="consultation-title" className="text-2xl font-black text-gray-900 mb-3">
              카카오톡으로 문의하기
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              카카오톡에서 필요한 서비스와 기능, 희망 일정과 예산을 알려 주세요.
            </p>
            {details.length > 0 && <ContactSummary key={JSON.stringify(details)} details={details} />}
            <a
              href={KAKAO_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-6 py-3 font-bold text-gray-900 hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              카카오톡 상담
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only">(새 창)</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
