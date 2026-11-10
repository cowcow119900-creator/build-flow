import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY_PHONE } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="flow-hero home-section">
      <div className="section-container home-container relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
        <div>
          <span className="flow-label mb-3">프로젝트 문의</span>
          <h2 className="text-2xl font-black leading-tight text-white md:text-4xl">
            필요한 기능부터 함께 정리합니다.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            예상 비용을 확인하거나 프로젝트를 상담해 보세요.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap gap-3">
            <Link href="/estimate" className="btn-primary min-h-11 px-5 py-2.5">
              무료 견적 계산하기 <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn-outline-white min-h-11 px-5 py-2.5">
              바로 상담 신청하기
            </Link>
          </div>
          <a
            href={"tel:" + COMPANY_PHONE}
            className="inline-flex min-h-11 flex-wrap items-center gap-x-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <Phone size={16} aria-hidden="true" />
            <span className="font-medium">전화 상담 {COMPANY_PHONE}</span>
            <span>(평일 09:00~18:00)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
