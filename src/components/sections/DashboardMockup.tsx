"use client";

import { TrendingUp, Users, Bell, CheckCircle, BarChart2, Globe, Smartphone } from "lucide-react";

const BAR_HEIGHTS = [40, 65, 50, 80, 60, 90, 75];

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto animate-float">
      {/* Main dashboard window */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Browser chrome */}
        <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-1.5">
            <Globe size={10} className="text-green-500" />
            client-company.buildflow.kr
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 bg-gray-50">
          {/* Top stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "이번 달 상담", value: "28", up: "+12%", color: "blue" },
              { label: "전환율", value: "6.4%", up: "+2.1%", color: "green" },
              { label: "방문자", value: "1,842", up: "+34%", color: "purple" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
                <p className="text-gray-400 text-[9px] mb-1">{stat.label}</p>
                <p className="font-black text-gray-900 text-base leading-none">{stat.value}</p>
                <p className="text-green-500 text-[9px] mt-1 font-semibold">{stat.up}</p>
              </div>
            ))}
          </div>

          {/* Chart + leads row */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {/* Bar chart */}
            <div className="col-span-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-700 text-[10px] font-semibold">주간 상담 신청</p>
                <TrendingUp size={12} className="text-blue-500" />
              </div>
              <div className="flex items-end gap-1 h-14">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className={`rounded-sm w-full ${i === 5 ? "bg-blue-600" : "bg-blue-200"}`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
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
              <p className="text-gray-700 text-[10px] font-semibold mb-2">최근 상담 요청</p>
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
                  <span
                    className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                      lead.status === "완료"
                        ? "bg-green-100 text-green-700"
                        : lead.status === "검토"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
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
                { name: "D기업 홈페이지", pct: 75, phase: "개발 중" },
                { name: "E브랜드 쇼핑몰", pct: 40, phase: "디자인" },
                { name: "F스타트업 SaaS", pct: 15, phase: "기획" },
              ].map((proj) => (
                <div key={proj.name} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-gray-700 text-[9px] font-medium truncate">{proj.name}</span>
                      <span className="text-blue-600 text-[9px] font-bold flex-shrink-0 ml-1">{proj.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${proj.pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 flex-shrink-0 w-12 text-right">{proj.phase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 border border-gray-200 w-44 animate-pulse-dot" style={{ animationDelay: "1s" }}>
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Bell size={13} className="text-white" />
          </div>
          <div>
            <p className="text-gray-900 text-[10px] font-bold">새 견적 요청</p>
            <p className="text-gray-500 text-[9px] mt-0.5">G주식회사 · 예약시스템</p>
            <p className="text-blue-600 text-[9px] font-semibold mt-0.5">지금 확인하기 →</p>
          </div>
        </div>
      </div>

      {/* Mobile preview floating */}
      <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-24">
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
      </div>

      {/* Conversion rate badge */}
      <div className="absolute bottom-8 -right-6 bg-green-500 text-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-1.5">
        <TrendingUp size={14} />
        <div>
          <p className="text-[9px] font-medium opacity-90">전환율</p>
          <p className="text-base font-black leading-none">6.4%</p>
        </div>
      </div>
    </div>
  );
}
