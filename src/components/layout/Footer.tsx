import Link from "next/link";
import Image from "next/image";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, BUSINESS_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-white/10 pt-14 pb-24 md:pb-16">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden">
                <Image src="/logo-mark.png" alt="" width={36} height={36} />
              </div>
              <span className="text-white font-black text-lg">{COMPANY_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              사업 성장에 필요한 웹 솔루션을 설계하고 구축합니다.
              기업 홈페이지부터 SaaS까지, 목적 중심으로 만듭니다.
            </p>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-500">이메일</span>{" "}
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-gray-300 hover:text-white">
                  {COMPANY_EMAIL}
                </a>
              </p>
              <p>
                <span className="text-gray-500">전화</span>{" "}
                <a href={`tel:${COMPANY_PHONE}`} className="text-gray-300 hover:text-white">
                  {COMPANY_PHONE}
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">서비스</h4>
            <ul className="space-y-2 text-sm">
              {["기업 홈페이지", "랜딩페이지", "쇼핑몰 제작", "예약 시스템", "관리자 시스템", "SaaS 개발"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">바로가기</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "포트폴리오", href: "/portfolio" },
                { label: "제작 비용", href: "/estimate" },
                { label: "인사이트", href: "/insights" },
                { label: "회사 소개", href: "/about" },
                { label: "무료 상담", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500 leading-relaxed">
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <span>상호 {BUSINESS_INFO.name}</span>
            <span>대표 {BUSINESS_INFO.ceo}</span>
            <span>사업자등록번호 {BUSINESS_INFO.registrationNumber}</span>
          </p>
          <p className="mt-1">주소 {BUSINESS_INFO.address}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-gray-400">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
