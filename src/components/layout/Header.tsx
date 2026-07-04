"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { COMPANY_NAME } from "@/lib/constants";
import { trackEvent } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ScrollProgress from "@/components/motion/ScrollProgress";

const NAV_LINKS = [
  { label: "서비스", href: "/services" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "제작 비용", href: "/estimate" },
  { label: "인사이트", href: "/insights" },
  { label: "회사 소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const hoverRef = useRef<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <ScrollProgress />

      <motion.header
        className="fixed top-0.5 left-0 right-0 z-50"
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
      >
        <motion.div
          className="transition-all"
          variants={{
            top: {
              background: "transparent",
              backdropFilter: "none",
              borderBottom: "1px solid transparent",
              boxShadow: "none",
            },
            scrolled: {
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 20px rgba(0,0,0,0.06)",
            },
          }}
          transition={{ duration: 0.25 }}
        >
          <div className="section-container">
            <div className="flex items-center justify-between h-16 md:h-18">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <span className="text-white font-black text-sm">BF</span>
                </motion.div>
                <span
                  className={`font-black text-lg tracking-tight transition-colors ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  {COMPANY_NAME}
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href) && link.href !== "/";
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        scrolled
                          ? isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                          : isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {/* Hover background */}
                      {hoveredLink === link.href && (
                        <motion.div
                          layoutId="nav-hover"
                          className={`absolute inset-0 rounded-lg ${scrolled ? "bg-blue-50" : "bg-white/10"}`}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-blue-500 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="hidden md:block">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/estimate"
                    className="btn-primary text-sm py-2.5 px-5"
                    onClick={() => trackEvent("cta_click", { location: "header", label: "무료 견적 받기" })}
                  >
                    무료 견적 받기
                  </Link>
                </motion.div>
              </div>

              {/* Mobile menu toggle */}
              <motion.button
                className="md:hidden p-2 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="메뉴 열기"
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <X className="text-gray-900" size={22} />
                ) : (
                  <Menu className={scrolled ? "text-gray-900" : "text-white"} size={22} />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-3xl shadow-2xl"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>

              <div className="px-4 pb-10">
                {/* Logo */}
                <div className="flex items-center gap-2 py-4 mb-2 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-black text-sm">BF</span>
                  </div>
                  <span className="font-black text-lg text-gray-900">{COMPANY_NAME}</span>
                </div>

                {/* Nav links with stagger */}
                <div className="space-y-1 py-3">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-colors ${
                          pathname.startsWith(link.href) && link.href !== "/"
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                        {pathname.startsWith(link.href) && link.href !== "/" && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
                  className="pt-2 border-t border-gray-100"
                >
                  <Link
                    href="/estimate"
                    className="btn-primary w-full justify-center py-4"
                    onClick={() => {
                      setIsOpen(false);
                      trackEvent("cta_click", { location: "mobile_menu", label: "무료 견적 받기" });
                    }}
                  >
                    무료 견적 받기
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
