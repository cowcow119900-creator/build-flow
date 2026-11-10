"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { BRAND_HEADLINE } from "@/lib/brand";
import { trackEvent } from "@/lib/utils";

export default function HeroSection({ flow }: { flow: ReactNode }) {
  return (
    <section aria-labelledby="home-title" className="flow-hero overflow-hidden pt-24 pb-9 md:pt-30 md:pb-12 xl:pt-36 xl:pb-14">
      <div className="section-container home-container">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:gap-8 xl:gap-12">
          <div className="min-w-0 motion-safe:animate-[hero-enter_0.45s_ease-out_both]">
            <h1 id="home-title" className="mb-4 text-[clamp(2.55rem,5.6vw,5rem)] font-black leading-[1.02] tracking-[-0.065em] text-white md:mb-6">
              {BRAND_HEADLINE[0]}<br />
              <span className="text-[color:var(--flow-cyan)]">{BRAND_HEADLINE[1]}</span>
            </h1>
            <p className="mb-6 max-w-[30rem] text-base leading-relaxed text-slate-200 lg:mb-8 lg:text-lg">
              고객이 처음 방문하는 화면부터 예약·결제, 관리자 기능까지 하나의 흐름으로 연결합니다.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/estimate"
                className="btn-primary min-h-12 px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:px-5 lg:text-base"
                onClick={() => trackEvent("cta_click", { location: "hero", label: "무료 견적 계산하기" })}
              >
                무료 견적 받기 <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="btn-outline-white min-h-12 border px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:px-5 lg:text-base"
                onClick={() => trackEvent("cta_click", { location: "hero", label: "제작 사례 보기" })}
              >
                제작 사례 보기
              </Link>
            </div>
          </div>

          <div className="min-w-0">{flow}</div>
        </div>

        <Link href="#process" className="flow-method mt-7 md:mt-10 xl:mt-12" aria-label="설계부터 운영까지 제작 과정 보기">
          <span>설계</span>
          <span aria-hidden="true" className="flow-method-rule" />
          <span>구축</span>
          <span aria-hidden="true" className="flow-method-rule" />
          <span>운영</span>
          <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-[color:var(--flow-cyan)]" />
        </Link>
      </div>
    </section>
  );
}
