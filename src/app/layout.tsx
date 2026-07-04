import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomCTA from "@/components/layout/MobileBottomCTA";

export const metadata: Metadata = {
  title: "Build Flow | 고객을 만드는 웹 솔루션",
  description:
    "기업 홈페이지, 랜딩페이지, 쇼핑몰, 예약 시스템, 관리자 시스템, SaaS 개발까지. 사업 성장에 필요한 웹 솔루션을 설계하고 구축합니다.",
  keywords: ["웹 개발", "홈페이지 제작", "랜딩페이지", "쇼핑몰 개발", "웹 솔루션"],
  openGraph: {
    title: "Build Flow | 고객을 만드는 웹 솔루션",
    description: "사업 성장에 필요한 웹 솔루션을 설계하고 구축합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomCTA />
      </body>
    </html>
  );
}
