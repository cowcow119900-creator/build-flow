"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
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

const DESKTOP_QUERY = "(min-width: 48rem)";

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isDesktopViewport() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerDesktopSnapshot() {
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const isDesktop = useSyncExternalStore(subscribeToDesktop, isDesktopViewport, getServerDesktopSnapshot);
  const reduced = useReducedMotion();
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const [pastTop, setPastTop] = useState(false);
  const { scrollY } = useScroll();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const restoreMenuFocus = useRef(true);

  if (openMenuPath !== null && (isDesktop || openMenuPath !== pathname)) {
    setOpenMenuPath(null);
  }
  const isOpen = !isDesktop && openMenuPath === pathname;
  const scrolled = pathname !== "/" || pastTop;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setPastTop(latest > 20);
  });

  const closeForNavigation = (destination: string) => {
    restoreMenuFocus.current = destination === pathname;
    setOpenMenuPath(null);
  };

  const handleCloseAutoFocus = (event: Event) => {
    if (!restoreMenuFocus.current) {
      event.preventDefault();
    } else if (isDesktopViewport()) {
      event.preventDefault();
      logoRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) restoreMenuFocus.current = true;
        setOpenMenuPath(open ? pathname : null);
      }}
    >
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
              <Link ref={logoRef} href="/" className="flex items-center gap-2 group">
                <motion.div
                  className="w-9 h-9 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <Image src="/logo-mark.png" alt="" width={36} height={36} preload />
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
              <nav aria-label="주 메뉴" className="hidden md:flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  const isCurrent = pathname === link.href;
                  const isActive = isCurrent || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isCurrent ? "page" : undefined}
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
              <Dialog.Trigger asChild>
                <motion.button
                  className="md:hidden p-2 rounded-lg"
                  aria-label="메뉴 열기"
                  whileTap={reduced ? undefined : { scale: 0.9 }}
                >
                  <Menu className={scrolled ? "text-gray-900" : "text-white"} size={22} />
                </motion.button>
              </Dialog.Trigger>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer */}
      {!isDesktop && (
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.2 }}
                  className="fixed inset-0 z-[60] bg-black/40"
                />
              </Dialog.Overlay>
              <Dialog.Content
                asChild
                forceMount
                aria-describedby={undefined}
                onCloseAutoFocus={handleCloseAutoFocus}
              >
                <motion.div
                  initial={reduced ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  exit={reduced ? { opacity: 0 } : { y: "100%" }}
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed bottom-0 left-0 right-0 z-[61] max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain rounded-t-3xl bg-white shadow-2xl"
                >
                  <Dialog.Title className="sr-only">사이트 메뉴</Dialog.Title>
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                  </div>

                  <div className="px-4 pb-10">
                    <div className="flex items-center gap-2 py-4 mb-2 border-b border-gray-100">
                      <div className="w-9 h-9 rounded-lg overflow-hidden">
                        <Image src="/logo-mark.png" alt="" width={36} height={36} />
                      </div>
                      <span className="font-black text-lg text-gray-900">{COMPANY_NAME}</span>
                      <Dialog.Close
                        aria-label="메뉴 닫기"
                        className="ml-auto p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                      >
                        <X size={22} />
                      </Dialog.Close>
                    </div>

                    <nav aria-label="주 메뉴" className="space-y-1 py-3">
                      {NAV_LINKS.map((link, i) => {
                        const isCurrent = pathname === link.href;
                        const isActive = isCurrent || pathname.startsWith(`${link.href}/`);
                        return (
                          <motion.div
                            key={link.href}
                            initial={reduced ? false : { opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: reduced ? 0 : i * 0.05, duration: reduced ? 0 : 0.3 }}
                          >
                            <Link
                              href={link.href}
                              aria-current={isCurrent ? "page" : undefined}
                              className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-colors ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onNavigate={() => closeForNavigation(link.href)}
                            >
                              {link.label}
                              {isActive && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>

                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduced ? 0 : NAV_LINKS.length * 0.05 + 0.1, duration: reduced ? 0 : undefined }}
                      className="pt-2 border-t border-gray-100"
                    >
                      <Link
                        href="/estimate"
                        className="btn-primary w-full justify-center py-4"
                        onNavigate={() => closeForNavigation("/estimate")}
                        onClick={() => trackEvent("cta_click", { location: "mobile_menu", label: "무료 견적 받기" })}
                      >
                        무료 견적 받기
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      )}
    </Dialog.Root>
  );
}
