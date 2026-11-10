"use client";

import { useState } from "react";
import { BarChart3, ChevronDown } from "lucide-react";

type RawMetrics = {
  impressions: number | null;
  clicks: number | null;
  cost: number | null;
  conversions: number | null;
  revenue: number | null;
};

type Campaign = RawMetrics & {
  id: string;
  name: string;
  channel: "검색 광고" | "소셜 광고";
  source: string;
  raw: Record<string, number | string | null>;
};

const searchExport = [
  { 캠페인ID: "S-101", 캠페인명: "브랜드 검색", 노출수: 10_000, 클릭수: 500, "비용(원)": 250_000, 전환수: 25, "전환 가치(원)": 1_250_000 },
  { 캠페인ID: "S-102", 캠페인명: "상품 검색", 노출수: 30_000, 클릭수: 600, "비용(원)": 360_000, 전환수: 18, "전환 가치(원)": 900_000 },
];

const socialExport = [
  { "광고 캠페인 ID": "C-201", "캠페인 이름": "신규 고객 유입", 노출: 20_000, "링크 클릭": 500, "지출 금액(원)": 200_000, 구매: 0, "구매 전환값(원)": 0 },
  { "광고 캠페인 ID": "C-202", "캠페인 이름": "리타겟팅", 노출: 15_000, "링크 클릭": 300, "지출 금액(원)": 150_000, 구매: null, "구매 전환값(원)": null },
];

const channels = ["전체 채널", "검색 광고", "소셜 광고"];
const integerFormat = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
const percentFormat = new Intl.NumberFormat("ko-KR", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
const buttonClass = `inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${focusClass}`;

function loadCampaigns(): Campaign[] {
  return [
    ...searchExport.map((row, index): Campaign => ({
      id: row.캠페인ID,
      name: row.캠페인명,
      channel: "검색 광고",
      source: `검색광고_샘플.csv · ${index + 2}행`,
      raw: row,
      impressions: row.노출수,
      clicks: row.클릭수,
      cost: row["비용(원)"],
      conversions: row.전환수,
      revenue: row["전환 가치(원)"],
    })),
    ...socialExport.map((row, index): Campaign => ({
      id: row["광고 캠페인 ID"],
      name: row["캠페인 이름"],
      channel: "소셜 광고",
      source: `소셜광고_샘플.csv · ${index + 2}행`,
      raw: row,
      impressions: row.노출,
      clicks: row["링크 클릭"],
      cost: row["지출 금액(원)"],
      conversions: row.구매,
      revenue: row["구매 전환값(원)"],
    })),
  ];
}

function formatCount(value: number | null) {
  return value === null ? "누락" : integerFormat.format(value);
}

function formatWon(value: number | null) {
  return value === null ? "누락" : `${integerFormat.format(value)}원`;
}

function ratio(numerator: number | null, denominator: number | null, format: (value: number) => string) {
  if (numerator === null || denominator === null) return "누락으로 계산 보류";
  if (denominator === 0) return "분모 0으로 계산 불가";
  return format(numerator / denominator);
}

function performance({ impressions, clicks, cost, conversions, revenue }: RawMetrics) {
  return {
    ctr: ratio(clicks, impressions, (value) => percentFormat.format(value)),
    cpa: ratio(cost, conversions, formatWon),
    roas: ratio(revenue, cost, (value) => percentFormat.format(value)),
  };
}

function sumField(rows: readonly Campaign[], field: keyof RawMetrics) {
  let total = 0;
  for (const row of rows) {
    const value = row[field];
    if (value === null) return null;
    total += value;
  }
  return total;
}

function rawFields({ impressions, clicks, cost, conversions, revenue }: RawMetrics) {
  return [
    { label: "노출", value: formatCount(impressions) },
    { label: "클릭", value: formatCount(clicks) },
    { label: "광고비", value: formatWon(cost) },
    { label: "전환", value: formatCount(conversions) },
    { label: "전환 매출", value: formatWon(revenue) },
  ];
}

function hasMissingData(campaign: Campaign) {
  return campaign.impressions === null || campaign.clicks === null || campaign.cost === null || campaign.conversions === null || campaign.revenue === null;
}

function CampaignDetails({ campaign }: { campaign: Campaign }) {
  const values = performance(campaign);

  return (
    <details data-campaign-id={campaign.id} className="group border-b border-slate-200 last:border-b-0">
      <summary className={`flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-2 gap-y-1 px-3 py-3 [&::-webkit-details-marker]:hidden @md:px-4 ${focusClass}`}>
        <span className="text-sm font-bold text-slate-950">{campaign.name}</span>
        <span className="text-xs text-slate-600">{campaign.channel} · {campaign.id}</span>
        {hasMissingData(campaign) && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-900">누락 있음</span>}
        <span className="ml-auto flex items-center gap-0.5 text-xs font-medium text-slate-600">
          상세 보기 <ChevronDown size={15} className="group-open:rotate-180" aria-hidden="true" />
        </span>
        <span className="grid w-full grid-cols-3 gap-x-2 pt-1 text-xs tabular-nums text-slate-700">
          <span><span className="block font-semibold">CTR</span>{values.ctr}</span>
          <span><span className="block font-semibold">CPA</span>{values.cpa}</span>
          <span><span className="block font-semibold">ROAS</span>{values.roas}</span>
        </span>
      </summary>

      <div className="border-t border-slate-200 bg-slate-50 px-3 py-3 @md:px-4">
        <p className="text-xs font-semibold text-slate-950">원본 샘플 행</p>
        <p className="mt-1 text-xs text-slate-700 [overflow-wrap:anywhere]">{campaign.source} · {campaign.id}</p>
        <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-xs tabular-nums @sm:grid-cols-3">
          {Object.entries(campaign.raw).map(([column, value]) => (
            <div key={column}>
              <dt className="text-slate-600">{column}</dt>
              <dd className={value === null ? "font-semibold text-amber-900" : "font-semibold text-slate-950"}>
                {typeof value === "string" ? value : formatCount(value)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-950">지표 계산식</p>
        <ul className="mt-1 space-y-1 text-xs leading-relaxed tabular-nums text-slate-700">
          <li><strong>CTR</strong> · 클릭 {formatCount(campaign.clicks)} ÷ 노출 {formatCount(campaign.impressions)} × 100 → {values.ctr}</li>
          <li><strong>CPA</strong> · 광고비 {formatWon(campaign.cost)} ÷ 전환 {formatCount(campaign.conversions)} → {values.cpa}</li>
          <li><strong>ROAS</strong> · 전환 매출 {formatWon(campaign.revenue)} ÷ 광고비 {formatWon(campaign.cost)} × 100 → {values.roas}</li>
        </ul>
      </div>
    </details>
  );
}

export function AdDataResearchScreen() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [channel, setChannel] = useState(channels[0]);
  const loaded = campaigns.length > 0;
  const visibleCampaigns = campaigns.filter((campaign) => channel === channels[0] || campaign.channel === channel);
  const missingCount = visibleCampaigns.filter(hasMissingData).length;
  const totals = {
    impressions: sumField(visibleCampaigns, "impressions"),
    clicks: sumField(visibleCampaigns, "clicks"),
    cost: sumField(visibleCampaigns, "cost"),
    conversions: sumField(visibleCampaigns, "conversions"),
    revenue: sumField(visibleCampaigns, "revenue"),
  };
  const values = performance(totals);

  function reset() {
    setCampaigns([]);
    setChannel(channels[0]);
  }

  return (
    <section aria-label="광고 데이터 리서치 체험" className="@container bg-slate-50 text-slate-950">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-slate-200 bg-white px-4 py-3 @md:px-6">
        <h3 className="flex min-w-0 items-center gap-2 text-sm font-extrabold">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-900 text-white"><BarChart3 size={17} aria-hidden="true" /></span>
          광고 채널 성과
        </h3>
        <p className="text-xs font-medium text-slate-600">검색 · 소셜 광고 샘플</p>
      </header>

      <div className="p-3.5 @md:p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 @md:p-4">
          <p className="text-sm leading-relaxed text-slate-700">검색 광고와 소셜 광고의 샘플 파일을 불러와 캠페인별 성과와 누락 항목을 확인합니다.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" disabled={loaded} onClick={() => setCampaigns(loadCampaigns())} className={`${buttonClass} bg-blue-800 text-white hover:bg-blue-900`}>
              광고 샘플 데이터 불러오기
            </button>
            {loaded && <button type="button" onClick={reset} className={`${buttonClass} text-slate-700 hover:bg-slate-100`}>광고 체험 초기화</button>}
          </div>
          <p role="status" className="mt-2 text-xs font-medium text-slate-700">
            {loaded ? `${channel} 캠페인 ${visibleCampaigns.length}건 · 누락 항목이 있는 캠페인 ${missingCount}건` : "샘플 데이터를 불러와 체험을 시작하세요."}
          </p>
        </div>

        {loaded && (
          <>
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3.5 @md:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold">채널 성과 합계</p>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  광고 채널
                  <select value={channel} onChange={(event) => setChannel(event.target.value)} className={`min-h-11 rounded-md border border-slate-300 bg-white px-2 text-sm ${focusClass}`}>
                    {channels.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-slate-200 pt-3 text-xs tabular-nums @sm:grid-cols-3 @lg:grid-cols-5">
                {rawFields(totals).map(({ label, value }) => (
                  <div key={label}><dt className="text-slate-600">{label}</dt><dd className={value === "누락" ? "font-semibold text-amber-900" : "font-semibold text-slate-950"}>{value}</dd></div>
                ))}
              </dl>
              <dl aria-label="합계 성과 지표" className="mt-3 grid grid-cols-3 gap-1.5 rounded-lg bg-blue-50 px-2.5 py-2.5 text-xs tabular-nums @md:px-3">
                <div><dt className="font-semibold text-blue-900">CTR</dt><dd className="mt-0.5 font-bold text-slate-950">{values.ctr}</dd></div>
                <div><dt className="font-semibold text-blue-900">CPA</dt><dd className="mt-0.5 font-bold text-slate-950">{values.cpa}</dd></div>
                <div><dt className="font-semibold text-blue-900">ROAS</dt><dd className="mt-0.5 font-bold text-slate-950">{values.roas}</dd></div>
              </dl>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">채널마다 다른 원본 열을 공통 항목으로 맞추고, 항목별 합계로 지표를 계산합니다. 필요한 값이 누락된 지표는 계산을 보류합니다.</p>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white">
              <p className="border-b border-slate-200 px-3 py-2.5 text-sm font-bold @md:px-4">캠페인별 성과</p>
              {visibleCampaigns.map((campaign) => <CampaignDetails key={campaign.id} campaign={campaign} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
