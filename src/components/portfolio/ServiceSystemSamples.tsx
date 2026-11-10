import { Check, ChevronRight, Package, Play, ShoppingBag } from "lucide-react";

function SerumBottle() {
  return (
    <div aria-hidden="true" className="relative isolate grid min-h-44 place-items-center overflow-hidden bg-[#e8c7b5] @md:min-h-64">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_57%_28%,#f8e9dc_0%,#e8c7b5_59%,#c58973_100%)]" />
      <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-1/2 rounded-full border border-white/45 @md:h-60 @md:w-60" />
      <div className="absolute bottom-[11%] h-4 w-28 translate-x-4 rounded-[50%] bg-[#64392b]/35 blur-[5px] @md:w-40" />
      <div className="relative z-10 flex rotate-[-12deg] flex-col items-center drop-shadow-[8px_12px_12px_#6942335c]">
        <div className="h-5 w-7 rounded-t-[55%] bg-[linear-gradient(90deg,#6d4137,#a77564_45%,#58332c)] @md:h-7 @md:w-9" />
        <div className="h-4 w-10 rounded-t-sm bg-[repeating-linear-gradient(90deg,#ba826d_0px,#d2a48f_2px,#be8975_4px)] @md:h-6 @md:w-14" />
        <div className="flex h-[5.75rem] w-20 flex-col items-center justify-center rounded-t-2xl rounded-b-lg border border-white/60 bg-[linear-gradient(105deg,#b98069_0%,#ebbc9d_26%,#f8d8bc_46%,#ba7b62_100%)] p-2 @md:h-32 @md:w-27">
          <div className="grid w-full place-items-center rounded-sm border border-[#e1beab] bg-[#fbf1e8] px-1 py-2 text-center text-[#5b3128] shadow-sm @md:py-3">
            <span className="font-serif text-xs font-semibold leading-none @md:text-sm">Daily</span>
            <span className="font-serif text-xs leading-none @md:text-sm">Serum</span>
            <span className="mt-1 text-[0.625rem] font-medium leading-none">30 mL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandSystemScreen() {
  return (
    <div className="@container bg-[#fcf6f0] text-[#3f2a27]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#e9d9cf] px-4 py-3 @md:px-6">
        <span className="font-serif text-base font-semibold tracking-tight">I. laboratory</span>
        <div className="flex items-center gap-3 text-xs font-medium text-[#65473e]">
          <span>신제품</span>
          <span>사용 후기</span>
          <ShoppingBag size={15} aria-hidden="true" />
        </div>
      </div>
      <div className="grid @md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col items-start justify-center p-4 @md:p-6 @xl:p-8">
          <p className="text-xs font-bold tracking-[0.13em] text-[#965047]">DAILY SERUM · 30 mL</p>
          <p className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance @lg:text-[1.8rem]">매일 쓰는 수분 한 겹</p>
          <p className="mt-2 text-xs leading-relaxed text-[#674b45] @md:text-sm">가볍게 발리는 데일리 수분 세럼. 성분과 사용 후기를 살펴보고 선택하세요.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#774539] px-3 py-2 text-xs font-bold text-white">구매하기 <ChevronRight size={14} aria-hidden="true" /></span>
            <span className="text-xs font-bold tabular-nums">28,000원</span>
          </div>
        </div>
        <SerumBottle />
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[#e9d9cf] px-4 py-3 @md:px-6">
        <span className="text-xs font-bold text-[#965047]">사용 후기 예시</span>
        <span className="text-xs leading-relaxed text-[#5e433b]">“가볍게 발려 아침에도 쓰기 편해요.”</span>
      </div>
    </div>
  );
}

const quoteItems = [
  { name: "센서 모듈", code: "SN-240", stock: "120개", count: 4, amount: "384,000원" },
  { name: "장착 브래킷", code: "BK-110", stock: "48개", count: 2, amount: "98,000원" },
];

export function B2BSystemScreen() {
  return (
    <div className="@container bg-white text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-slate-200 bg-slate-50 px-4 py-3 @md:px-6">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className="grid size-7 place-items-center rounded-md bg-[#163b65] text-white"><Package size={16} aria-hidden="true" /></span>
          J 파트너 포털
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
          <span>재고 조회</span>
          <span className="font-bold text-[#204f80]">견적 관리</span>
          <span>발주 현황</span>
        </div>
      </div>
      <div className="p-4 @md:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 @md:mb-5">
          <p className="text-lg font-bold tracking-tight @md:text-xl">견적서 작성</p>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#204f80]">작성 중</span>
        </div>
        <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_11rem] @lg:gap-4">
          <div className="min-w-0">
            <table className="w-full text-left text-xs tabular-nums">
              <caption className="sr-only">견적에 포함된 품목과 수량</caption>
              <thead className="border-y border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-2 py-2 font-semibold">품목</th>
                  <th scope="col" className="hidden px-2 py-2 font-semibold @xl:table-cell">재고</th>
                  <th scope="col" className="px-2 py-2 text-right font-semibold">수량</th>
                  <th scope="col" className="px-2 py-2 text-right font-semibold">금액</th>
                </tr>
              </thead>
              <tbody>
                {quoteItems.map(({ name, code, stock, count, amount }) => (
                  <tr key={code} className="border-b border-slate-200">
                    <th scope="row" className="px-2 py-2.5 font-bold">
                      {name}<span className="block font-medium text-slate-500">{code}</span>
                      <span className="block font-medium text-slate-600 @xl:hidden">재고 {stock}</span>
                    </th>
                    <td className="hidden px-2 py-2.5 text-slate-600 @xl:table-cell">{stock}</td>
                    <td className="px-2 py-2.5 text-right">{count}</td>
                    <td className="px-2 py-2.5 text-right font-semibold">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs font-medium text-slate-600">선택 품목 2종 · 재고 확보</p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-[#f2f7fd] p-3">
            <p className="mb-2 text-sm font-bold">견적 요약</p>
            <dl className="space-y-1 text-xs tabular-nums text-slate-700">
              <div className="flex justify-between gap-2"><dt>공급가</dt><dd>482,000원</dd></div>
              <div className="flex justify-between gap-2"><dt>부가세</dt><dd>48,200원</dd></div>
              <div className="flex justify-between gap-2 border-t border-blue-100 pt-2 text-sm font-bold text-[#163b65]"><dt>합계</dt><dd>530,200원</dd></div>
            </dl>
            <div className="mt-3 flex justify-center gap-1 rounded-md bg-[#204f80] px-2 py-2 text-center text-xs font-bold text-white">견적서 생성 <ChevronRight size={14} aria-hidden="true" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const lessons = [
  { title: "강의 소개", time: "06:10", status: "완료" },
  { title: "읽는 사람 정하기", time: "11:20", status: "완료" },
  { title: "업무 문서의 구조", time: "14:30", status: "수강 중" },
  { title: "보고서 작성 실습", time: "18:40", status: "수강 전" },
];

export function EducationSystemScreen() {
  return (
    <div className="@container bg-white text-slate-900">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-slate-200 px-4 py-3 text-xs @md:px-6">
        <span className="text-sm font-bold">L 온라인 강의실</span>
        <ChevronRight size={14} className="text-slate-500" aria-hidden="true" />
        <span className="font-medium text-slate-600">실무 문서 작성</span>
      </div>
      <div className="grid gap-4 p-4 @lg:grid-cols-[minmax(0,1.24fr)_minmax(0,1fr)] @md:p-6">
        <div className="min-w-0">
          <div className="relative isolate flex aspect-video flex-col items-start justify-center overflow-hidden rounded-lg bg-[#162538] p-3 text-white @md:p-4">
            <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M194-10L326 111V-10ZM219 180L320 83v97Z" fill="#1e3b58" />
              <path d="M153 180L320 13M173 180L320 33M193 180L320 53M213 180L320 73" fill="none" stroke="#73a4cc" strokeOpacity="0.35" />
            </svg>
            <p className="text-xs font-bold tracking-wide text-[#a9d2ff]">LESSON 03</p>
            <p className="mt-1 max-w-[10rem] text-lg leading-tight font-bold tracking-tight @lg:text-xl">업무 문서의 구조</p>
            <span className="mt-2 grid size-7 place-items-center rounded-full bg-white text-[#162538] @md:size-8"><Play size={13} fill="currentColor" aria-hidden="true" /></span>
            <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-xs @md:inset-x-4">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/25" aria-hidden="true"><span className="block h-full w-[60%] rounded-full bg-[#a9d2ff]" /></span>
              <span className="text-white tabular-nums">08:42 / 14:30</span>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">03강 · 핵심 메시지와 문서 목차 구성</p>
        </div>
        <div className="min-w-0 border-t border-slate-200 pt-3 @lg:border-t-0 @lg:border-l @lg:pt-0 @lg:pl-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <p className="text-sm font-bold">차시 목록</p>
            <p className="text-xs font-bold text-[#245789]">진도 50% <span className="font-medium text-slate-600">· 2/4 완료</span></p>
          </div>
          <ul className="mt-2 space-y-1">
            {lessons.map(({ title, time, status }, index) => (
              <li key={title} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${status === "수강 중" ? "bg-[#eaf3ff] text-[#245789]" : "text-slate-700"}`}>
                <span className="shrink-0 font-medium tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 font-semibold">{title}</span>
                <span className="shrink-0 text-slate-600 tabular-nums">{time}</span>
                {status === "완료" ? <span aria-label="완료" className="grid size-4 shrink-0 place-items-center text-[#245789]"><Check size={13} aria-hidden="true" /></span> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
