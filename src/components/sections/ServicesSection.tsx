"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { trackEvent } from "@/lib/utils";
import InteractiveServiceCard from "./InteractiveServiceCard";

export default function ServicesSection() {
  return (
    <section className="home-section bg-white" id="services" aria-labelledby="services-title">
      <div className="section-container home-container">
        <header className="mb-7 flex flex-col gap-3 md:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <p className="flow-label mb-3">서비스</p>
            <h2 id="services-title" className="text-[clamp(1.875rem,4vw,3.125rem)] leading-[1.14] font-black tracking-tight text-slate-950">
              어떤 웹 솔루션이 필요하신가요?
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:shrink-0 lg:pb-1">
            서비스별 주요 기능과 예상 비용을 확인해 보세요.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-300 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <InteractiveServiceCard key={svc.id} svc={svc} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-0.5 text-center sm:mt-7">
          <p className="font-medium text-slate-600">원하는 서비스를 찾지 못하셨나요?</p>
          <Link
            href="/contact"
            className="relative inline-flex min-h-11 items-center gap-1.5 rounded-sm font-bold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:pl-5 sm:before:absolute sm:before:inset-y-2.5 sm:before:left-0 sm:before:w-px sm:before:bg-slate-300"
            onClick={() => trackEvent("cta_click", { location: "services_bottom", label: "무료 상담 신청" })}
          >
            상담 문의하기 <ChevronRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
