import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import type { ServiceId } from "@/lib/constants";
import {
  Building2, Rocket, ShoppingCart, Calendar, LayoutDashboard,
  RefreshCw, Code2, Bot, ArrowRight
} from "lucide-react";

export const metadata = {
  title: "서비스 | Build Flow",
  description: "기업 홈페이지, 랜딩페이지, 쇼핑몰, 예약 시스템 등 다양한 웹 솔루션 서비스를 확인하세요.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, Rocket, ShoppingCart, Calendar, LayoutDashboard,
  RefreshCw, Code2, Bot,
};

const SERVICE_GUIDES: Record<ServiceId, { description: string; example?: { slug: string; label: string } }> = {
  "corporate-website": {
    description: "방문자가 회사와 제품을 파악한 뒤 문의나 견적 요청으로 이동해야 할 때 적합합니다. 공개할 정보와 로그인 후 파트너에게 제공할 정보를 나눠 화면을 설계합니다.",
    example: { slug: "b2b-portal", label: "파트너 견적 체험" },
  },
  "landing-page": {
    description: "신제품 출시나 광고처럼 방문 목적이 분명할 때 적합합니다. 방문자가 먼저 확인하는 가격, 후기, 제품 정보를 정리하고 문의나 구매까지의 단계를 설계합니다.",
    example: { slug: "brand-landing", label: "제품 랜딩페이지 체험" },
  },
  "shopping-mall": {
    description: "상품을 온라인에서 판매하고 주문을 한 곳에서 관리할 때 적합합니다. 상품 옵션과 재고가 장바구니, 결제, 배송 상태에 어떻게 이어지는지 정리합니다.",
    example: { slug: "brand-landing", label: "장바구니 흐름 체험" },
  },
  "reservation-system": {
    description: "전화나 메시지로 시간을 조율하는 데 운영 시간이 많이 들 때 적합합니다. 담당자별 가용 시간, 중복 예약 기준, 변경과 취소 규칙부터 정합니다.",
    example: { slug: "medical-reservation", label: "진료 예약 체험" },
  },
  "admin-system": {
    description: "예약, 회원, 주문 상태를 여러 문서에서 따로 관리할 때 적합합니다. 직원마다 필요한 조회·편집 권한을 구분하고 자주 처리하는 업무를 한 화면에 배치합니다.",
    example: { slug: "fitness-saas", label: "회원 출석 관리 체험" },
  },
  renewal: {
    description: "기존 사이트를 이용하는 고객이 모바일에서 정보를 찾거나 문의하기 어려울 때 적합합니다. 방문이 많은 페이지와 기존 주소를 파악한 뒤 바꿀 메뉴와 화면의 우선순위를 정합니다.",
    example: { slug: "restaurant-renewal", label: "모바일 예약·웨이팅 체험" },
  },
  "saas-development": {
    description: "가입한 사용자가 반복해서 업무를 처리하는 서비스를 만들 때 적합합니다. 첫 출시에서 해결할 업무를 좁히고 계정별 데이터, 권한, 요금제의 관계를 정리합니다.",
    example: { slug: "education-platform", label: "온라인 강의실 체험" },
  },
  "ai-automation": {
    description: "반복 문의나 분류 작업이 쌓일 때 적합합니다. 어떤 정보로 답변할지, 자동으로 처리할 업무는 무엇인지, 어느 시점에 담당자에게 넘길지부터 정합니다.",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            서비스 전체
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            목적에 맞는 웹 솔루션
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            단순 제작이 아닌, 사업 성과를 목적으로 설계된 솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc) => {
            const Icon = ICON_MAP[svc.icon] || Building2;
            const { description, example } = SERVICE_GUIDES[svc.id];
            return (
              <div id={svc.id} key={svc.id} className="scroll-mt-24 bg-white rounded-2xl p-7 border-2 border-gray-100 card-hover">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-black text-gray-900 text-lg">{svc.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">{svc.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  {svc.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mb-4 rounded-lg border-l-2 border-blue-200 bg-slate-50 px-3.5 py-3">
                  <h3 className="mb-1 text-sm font-bold text-slate-900">어떤 상황에 적합한가요?</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{description}</p>
                  {example && (
                    <Link href={`/portfolio/${example.slug}#system-preview`} className="mt-1 inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                      {example.label} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">
                    <span className="text-gray-900 font-bold">{svc.priceFrom}만원~</span> 부터
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/estimate?service=${svc.id}`}
                      className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      견적 계산
                    </Link>
                    <Link
                      href={`/contact?purpose=${svc.id}`}
                      className="text-xs font-semibold text-white bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      상담 신청 <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
