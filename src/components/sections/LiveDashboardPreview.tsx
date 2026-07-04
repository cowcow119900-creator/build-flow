"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Bell, CheckCircle, Users, BarChart2, Globe } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NOTIFICATIONS = [
  { id: 1, icon: Bell, color: "bg-blue-600", title: "새 견적 요청", body: "G주식회사 · 예약시스템", time: "방금" },
  { id: 2, icon: CheckCircle, color: "bg-green-500", title: "견적 분석 완료", body: "H의원 · 온라인 예약", time: "1분 전" },
  { id: 3, icon: Users, color: "bg-purple-500", title: "방문자 유입 증가", body: "오늘 +34% ↑ 신기록", time: "5분 전" },
  { id: 4, icon: BarChart2, color: "bg-amber-500", title: "프로젝트 진행률 82%", body: "D기업 홈페이지 개발 중", time: "10분 전" },
  { id: 5, icon: Globe, color: "bg-rose-500", title: "포트폴리오 공개", body: "K피트니스 SaaS 오픈", time: "15분 전" },
];

const BAR_DATA = [40, 65, 50, 80, 60, 90, 75];
const BAR_DATA_ALT = [55, 72, 45, 88, 67, 95, 82];

export default function LiveDashboardPreview() {
  const [notifIdx, setNotifIdx] = useState(0);
  const [bars, setBars] = useState(BAR_DATA);
  const [visitors, setVisitors] = useState(1842);
  const [leads, setLeads] = useState(28);
  const reduced = useReducedMotion();

  // Cycle notifications slowly
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setNotifIdx((i) => (i + 1) % NOTIFICATIONS.length);
    }, 3500);
    return () => clearInterval(t);
  }, [reduced]);

  // Occasionally update numbers slightly
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setVisitors((v) => v + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) setLeads((l) => l + 1);
      setBars((b) => b === BAR_DATA ? BAR_DATA_ALT : BAR_DATA);
    }, 4000);
    return () => clearInterval(t);
  }, [reduced]);

  const notif = NOTIFICATIONS[notifIdx];
  const NotifIcon = notif.icon;

  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      {/* Main browser window */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28, delay: 0.6 }}
      >
        {/* Browser chrome */}
        <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-1.5">
            <Globe size={10} className="text-green-500" />
            dashboard.buildflow.kr
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-semibold">데모</span>
        </div>

        {/* Dashboard */}
        <div className="p-4 bg-gray-50">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "이번 달 상담", value: leads, suffix: "건", up: "+12%" },
              { label: "전환율", value: 6.4, suffix: "%", up: "+2.1%", decimals: 1 },
              { label: "방문자", value: visitors, suffix: "", up: "+34%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[9px] mb-1">{stat.label}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stat.value}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-black text-gray-900 text-base leading-none"
                  >
                    {stat.decimals
                      ? stat.value.toFixed(stat.decimals)
                      : stat.value.toLocaleString()}
                    {stat.suffix}
                  </motion.p>
                </AnimatePresence>
                <p className="text-green-500 text-[9px] mt-1 font-semibold">{stat.up}</p>
              </div>
            ))}
          </div>

          {/* Chart + leads */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {/* Bar chart */}
            <div className="col-span-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-700 text-[10px] font-semibold">주간 상담 신청</p>
                <TrendingUp size={12} className="text-blue-500" />
              </div>
              <div className="flex items-end gap-1 h-14">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col justify-end"
                    animate={{ height: `${h}%` }}
                  >
                    <motion.div
                      className={`rounded-sm w-full ${i === 5 ? "bg-blue-600" : "bg-blue-200"}`}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ minHeight: 4 }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["월","화","수","목","금","토","일"].map((d) => (
                  <span key={d} className="text-gray-300 text-[8px] flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>

            {/* Lead list */}
            <div className="col-span-2 bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
              <p className="text-gray-700 text-[10px] font-semibold mb-2">최근 상담</p>
              {[
                { name: "A기업", type: "쇼핑몰", status: "대기" },
                { name: "B스타트업", type: "랜딩", status: "검토" },
                { name: "C병원", type: "예약", status: "완료" },
              ].map((lead) => (
                <div key={lead.name} className="flex items-center gap-1.5 py-1 border-b border-gray-50 last:border-0">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-[8px] font-bold">{lead.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-[9px] font-semibold truncate">{lead.name}</p>
                    <p className="text-gray-400 text-[8px]">{lead.type}</p>
                  </div>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    lead.status === "완료" ? "bg-green-100 text-green-700" :
                    lead.status === "검토" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bars */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <p className="text-gray-700 text-[10px] font-semibold mb-2">진행 중 프로젝트</p>
            <div className="space-y-2">
              {[
                { name: "D기업 홈페이지", pct: 82, phase: "개발 중" },
                { name: "E브랜드 쇼핑몰", pct: 45, phase: "디자인" },
                { name: "F스타트업 SaaS", pct: 18, phase: "기획" },
              ].map((proj) => (
                <div key={proj.name} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-gray-700 text-[9px] font-medium truncate">{proj.name}</span>
                      <span className="text-blue-600 text-[9px] font-bold ml-1">{proj.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${proj.pct}%` }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
                      />
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 flex-shrink-0 w-12 text-right">{proj.phase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating notification */}
      <AnimatePresence mode="wait">
        <motion.div
          key={notifIdx}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 border border-gray-200 w-48"
        >
          <div className="flex items-start gap-2">
            <div className={`w-7 h-7 rounded-full ${notif.color} flex items-center justify-center flex-shrink-0`}>
              <NotifIcon size={13} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 text-[10px] font-bold">{notif.title}</p>
              <p className="text-gray-500 text-[9px] mt-0.5 truncate">{notif.body}</p>
              <p className="text-blue-600 text-[9px] font-semibold mt-0.5">{notif.time}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile preview */}
      <motion.div
        className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 28 }}
      >
        <div className="bg-gray-800 px-2 py-1 flex justify-center">
          <div className="w-8 h-1 bg-gray-600 rounded-full" />
        </div>
        <div className="p-1.5 bg-gray-50">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="h-2 bg-blue-600" />
            <div className="p-1.5 space-y-1">
              <div className="h-1.5 bg-gray-200 rounded w-full" />
              <div className="h-1.5 bg-gray-100 rounded w-4/5" />
              <div className="h-4 bg-blue-600 rounded-md mt-2" />
              <div className="h-1 bg-gray-200 rounded w-full" />
              <div className="h-1 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 px-3 py-1 flex justify-center">
          <div className="w-4 h-4 rounded-full border border-gray-600" />
        </div>
      </motion.div>

      {/* Conversion badge */}
      <motion.div
        className="absolute bottom-8 -right-6 bg-green-500 text-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 20 }}
      >
        <TrendingUp size={14} />
        <div>
          <p className="text-[9px] font-medium opacity-90">전환율</p>
          <p className="text-base font-black leading-none">6.4%</p>
        </div>
      </motion.div>
    </div>
  );
}
