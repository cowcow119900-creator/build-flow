"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Building2, Rocket, ShoppingCart, Calendar, LayoutDashboard,
  RefreshCw, Code2, Bot, ArrowRight, Calculator, CheckCircle
} from "lucide-react";
import { trackEvent } from "@/lib/utils";

// ─── Mini UI Previews ────────────────────────────────────────────

function CalendarPreview() {
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  const available = [3,7,10,14];
  return (
    <div className="absolute inset-x-3 bottom-3 bg-white rounded-xl shadow-lg border border-gray-100 p-2.5 pointer-events-none">
      <p className="text-[9px] font-bold text-gray-500 mb-1.5">예약 가능 일정</p>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d) => (
          <div
            key={d}
            className={`h-5 rounded-md flex items-center justify-center text-[8px] font-semibold ${
              available.includes(d)
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-400"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="flex gap-1 mt-1.5">
        {["10:00","13:00","15:00"].map((t) => (
          <span key={t} className="bg-blue-50 text-blue-600 text-[8px] font-semibold px-1.5 py-0.5 rounded-md">{t}</span>
        ))}
      </div>
    </div>
  );
}

function AdminPreview() {
  return (
    <div className="absolute inset-x-3 bottom-3 bg-white rounded-xl shadow-lg border border-gray-100 p-2.5 pointer-events-none">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[9px] font-bold text-gray-500">오늘 신규 문의</p>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center"
        >3</motion.span>
      </div>
      <div className="flex items-end gap-1 h-10">
        {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-sm ${i === 5 ? "bg-blue-600" : "bg-blue-100"}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ height: `${h}%`, transformOrigin: "bottom" }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25,0.1,0.25,1] }}
          />
        ))}
      </div>
    </div>
  );
}

function ShopPreview() {
  const [cart, setCart] = useState(0);
  return (
    <div className="absolute inset-x-3 bottom-3 bg-white rounded-xl shadow-lg border border-gray-100 p-2 pointer-events-none">
      <div className="flex gap-1.5 overflow-hidden">
        {["👟","👔","👜"].map((emoji, i) => (
          <motion.div
            key={emoji}
            className="flex-shrink-0 w-12 bg-gray-50 rounded-lg p-1.5 text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-lg">{emoji}</span>
            <p className="text-[8px] text-gray-500 mt-0.5">₩29,900</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-1.5 bg-blue-600 rounded-lg py-1 text-center text-[9px] text-white font-bold flex items-center justify-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        🛒 장바구니 담기
      </motion.div>
    </div>
  );
}

function ChatPreview() {
  const messages = [
    { from: "user", text: "배송 얼마나 걸려요?" },
    { from: "ai", text: "보통 2~3일 소요됩니다! 빠른배송은 내일 도착해요 ✨" },
    { from: "user", text: "빠른배송 신청할게요" },
  ];
  return (
    <div className="absolute inset-x-3 bottom-3 bg-white rounded-xl shadow-lg border border-gray-100 p-2 space-y-1 pointer-events-none">
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.35, duration: 0.3 }}
          className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <span className={`text-[9px] px-2 py-1 rounded-xl max-w-[85%] ${
            m.from === "user"
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-700 rounded-bl-sm"
          }`}>
            {m.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function GenericPreview({ features }: { features: string[] }) {
  return (
    <div className="absolute inset-x-3 bottom-3 bg-white rounded-xl shadow-lg border border-gray-100 p-2.5 pointer-events-none">
      <p className="text-[9px] font-bold text-gray-500 mb-1.5">주요 기능</p>
      <div className="space-y-1">
        {features.slice(0, 3).map((f, i) => (
          <motion.div
            key={f}
            className="flex items-center gap-1.5 text-[9px] text-gray-600"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <CheckCircle size={10} className="text-green-500 flex-shrink-0" />
            {f}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const PREVIEW_MAP: Record<string, React.ComponentType<{ features: string[] }>> = {
  "reservation-system": () => <CalendarPreview />,
  "admin-system": () => <AdminPreview />,
  "shopping-mall": () => <ShopPreview />,
  "ai-automation": () => <ChatPreview />,
};

// ─── Main Card ───────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, Rocket, ShoppingCart, Calendar, LayoutDashboard,
  RefreshCw, Code2, Bot,
};

type ServiceData = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  features: string[];
  priceFrom: number;
};

export default function InteractiveServiceCard({ svc }: { svc: ServiceData }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[svc.icon] || Building2;
  const Preview = PREVIEW_MAP[svc.id];

  return (
    <motion.div
      className="relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden cursor-pointer group"
      initial="rest"
      animate={hovered ? "hover" : "rest"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={{
        rest: { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderColor: "#f3f4f6" },
        hover: {
          y: -6,
          boxShadow: "0 20px 60px rgba(29,91,231,0.12)",
          borderColor: "#1d5be7",
        },
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={() => trackEvent("service_card_click", { service: svc.id })}
    >
      {/* Background grid on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          backgroundImage: `linear-gradient(rgba(29,91,231,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,91,231,0.04) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className={`p-6 transition-all duration-300 ${Preview && hovered ? "pb-32" : ""}`}>
        {/* Icon */}
        <motion.div
          className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4"
          animate={{ backgroundColor: hovered ? "#1d5be7" : "#eff6ff" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Icon
              size={22}
              className={`transition-colors duration-200 ${hovered ? "text-white" : "text-blue-600"}`}
            />
          </motion.div>
        </motion.div>

        <h3 className="font-bold text-gray-900 text-base mb-2">{svc.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.desc}</p>

        {/* Features — hide on hover when preview is showing */}
        <AnimatePresence>
          {(!Preview || !hovered) && (
            <motion.ul
              initial={false}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1 mb-5 overflow-hidden"
            >
              {svc.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                  {f}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Price & Actions */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 mb-3">
            <span className="text-gray-900 font-bold text-sm">{svc.priceFrom}만원~</span> 부터
          </p>
          <div className="flex gap-2">
            <Link
              href={`/services/${svc.id}`}
              className="flex-1 text-center text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg py-2 hover:border-blue-500 hover:text-blue-600 transition-colors"
              onClick={(e) => { e.stopPropagation(); trackEvent("service_detail_view", { service: svc.id }); }}
            >
              자세히 보기
            </Link>
            <Link
              href={`/estimate?service=${svc.id}`}
              className="flex-1 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg py-2 hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
              onClick={(e) => { e.stopPropagation(); trackEvent("estimate_start", { service: svc.id }); }}
            >
              <Calculator size={11} />
              견적 계산
            </Link>
          </div>
        </div>
      </div>

      {/* Mini UI Preview overlay */}
      <AnimatePresence>
        {Preview && hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 bottom-0"
          >
            <Preview features={svc.features} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
