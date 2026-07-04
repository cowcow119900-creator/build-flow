import Link from "next/link";
import { COMPANY_NAME } from "@/lib/constants";
import { Target, Users, Award, Zap } from "lucide-react";

export const metadata = {
  title: "회사 소개 | Build Flow",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="section-container max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            회사 소개
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
            사업 목적에서 역산하는
            <br />웹 솔루션 파트너
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {COMPANY_NAME}은 예쁜 홈페이지를 만드는 것이 목적이 아닙니다.
            <br />
            사업이 성장할 수 있는 디지털 시스템을 구축하는 것이 목적입니다.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center mb-10">
          <p className="text-blue-200 text-sm font-semibold mb-2">우리의 미션</p>
          <p className="text-2xl font-black leading-tight">
            &ldquo;모든 사업에 고객을 만드는 디지털 시스템을 제공한다.&rdquo;
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              icon: Target,
              title: "목적 중심 설계",
              desc: "홈페이지의 목적은 방문자를 고객으로 전환하는 것입니다. 모든 설계는 이 목표에서 시작합니다.",
            },
            {
              icon: Users,
              title: "파트너십",
              desc: "납품으로 끝나지 않습니다. 사업이 성장하는 과정에서 함께하는 파트너가 되고자 합니다.",
            },
            {
              icon: Award,
              title: "품질 책임",
              desc: "제작한 결과물의 품질에 대해 명확한 책임을 집니다. 불량 납품은 없습니다.",
            },
            {
              icon: Zap,
              title: "빠른 실행",
              desc: "빠른 실행이 완벽한 계획보다 낫습니다. 검증된 스택으로 빠르게 구축하고 개선합니다.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                <v.icon size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-10">
          <h3 className="font-black text-gray-900 mb-4">주요 기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js", "React", "TypeScript", "Tailwind CSS",
              "Supabase", "PostgreSQL", "Vercel", "Stripe",
              "GA4", "Google Tag Manager", "Cloudflare",
            ].map((tech) => (
              <span key={tech} className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            프로젝트 상담하기
          </Link>
        </div>
      </div>
    </div>
  );
}
