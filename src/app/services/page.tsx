import Link from "next/link";
import { SERVICES } from "@/lib/constants";
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
            return (
              <div key={svc.id} className="bg-white rounded-2xl p-7 border-2 border-gray-100 card-hover">
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

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                      href="/contact"
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
