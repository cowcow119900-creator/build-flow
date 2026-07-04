"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { trackEvent } from "@/lib/utils";
import AnimatedSection from "@/components/motion/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import InteractiveServiceCard from "./InteractiveServiceCard";

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            서비스
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            어떤 웹 솔루션이 필요하신가요?
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            원하는 서비스를 선택하면 포트폴리오와 예상 비용을 바로 확인할 수 있습니다.
          </p>
        </AnimatedSection>

        {/* Service cards */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          stagger={0.07}
        >
          {SERVICES.map((svc) => (
            <StaggerItem key={svc.id}>
              <InteractiveServiceCard svc={svc} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection className="mt-12 text-center" delay={0.2}>
          <p className="text-gray-500 mb-4">원하는 서비스를 찾지 못하셨나요?</p>
          <Link
            href="/contact"
            className="btn-secondary"
            onClick={() => trackEvent("cta_click", { location: "services_bottom", label: "무료 상담 신청" })}
          >
            무료 상담 신청하기
            <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
