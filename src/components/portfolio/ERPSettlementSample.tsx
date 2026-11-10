"use client";

import { useState } from "react";
import { ChevronDown, FileSpreadsheet } from "lucide-react";

const orders = [
  { id: "SO-1001", sales: 120_000, refund: 0, fee: 6_000, sourceRow: 2 },
  { id: "SO-1002", sales: 100_000, refund: 10_000, fee: 5_000, sourceRow: 3 },
  { id: "SO-1003", sales: 60_000, refund: 0, fee: 3_000, sourceRow: 4 },
];

const deposits = [
  { orderId: "SO-1002", amount: 83_000, sourceRow: 2 },
  { orderId: "SO-1001", amount: 114_000, sourceRow: 3 },
];

const statusStyles = {
  일치: "bg-teal-50 text-teal-900",
  "금액 차이": "bg-amber-50 text-amber-900",
  미입금: "bg-rose-50 text-rose-900",
};

type ReconciliationStatus = keyof typeof statusStyles;
type ReconciliationRow = {
  order: (typeof orders)[number];
  deposit?: (typeof deposits)[number];
  expected: number;
  difference: number;
  status: ReconciliationStatus;
};

const moneyFormat = new Intl.NumberFormat("ko-KR");
const memoMaxLength = 120;
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";
const actionClass = `inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${focusClass}`;

function won(amount: number) {
  return `${moneyFormat.format(amount)}원`;
}

function describeDifference(difference: number) {
  if (difference === 0) return won(0);
  return `${won(Math.abs(difference))} ${difference > 0 ? "부족" : "초과"}`;
}

function reconcileOrders(): ReconciliationRow[] {
  const depositsByOrderId = new Map(deposits.map((deposit) => [deposit.orderId, deposit]));

  return orders.map((order) => {
    const deposit = depositsByOrderId.get(order.id);
    const expected = order.sales - order.refund - order.fee;
    const difference = expected - (deposit?.amount ?? 0);

    return {
      order,
      deposit,
      expected,
      difference,
      status: deposit === undefined ? "미입금" : difference === 0 ? "일치" : "금액 차이",
    };
  });
}

function ReconciliationDetails({
  row,
  confirmedMemo,
  onConfirm,
}: {
  row: ReconciliationRow;
  confirmedMemo: string | undefined;
  onConfirm: (memo: string) => void;
}) {
  const [memo, setMemo] = useState(confirmedMemo ?? "");
  const { order, deposit, expected, difference, status } = row;

  return (
    <details className="group border-b border-slate-200 last:border-b-0" data-order-id={order.id}>
      <summary className={`flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-2 px-3 py-3 [&::-webkit-details-marker]:hidden @md:px-4 ${focusClass}`}>
        <span className="text-sm font-semibold text-slate-950">{order.id}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>{status}</span>
        {confirmedMemo && <span className="text-xs font-semibold text-teal-800">확인 완료</span>}
        <span className="ml-auto flex items-center gap-0.5 text-xs font-medium text-slate-600">
          상세 보기 <ChevronDown size={15} className="group-open:rotate-180" aria-hidden="true" />
        </span>
        <span className="grid w-full grid-cols-3 gap-x-1.5 text-xs tabular-nums text-slate-700">
          <span><span className="block text-slate-600">예상 입금</span>{won(expected)}</span>
          <span><span className="block text-slate-600">실제 입금</span>{deposit ? won(deposit.amount) : "—"}</span>
          <span><span className="block text-slate-600">차액</span><span className="font-semibold">{describeDifference(difference)}</span></span>
        </span>
      </summary>

      <div className="border-t border-slate-200 bg-slate-50 px-3 py-3 @md:px-4">
        <p className="text-xs font-semibold text-slate-950">예상 입금 계산</p>
        <p className="mt-1 text-sm leading-relaxed tabular-nums text-slate-800">
          {won(order.sales)} 판매액 − {won(order.refund)} 환불액 − {won(order.fee)} 수수료 = <strong>{won(expected)}</strong>
        </p>

        <p className="mt-3 text-xs font-semibold text-slate-950">원본 샘플 행</p>
        <ul className="mt-1 space-y-1 text-xs leading-relaxed tabular-nums text-slate-700">
          <li><strong>주문.xlsx · 판매내역 {order.sourceRow}행</strong> · {order.id} · 판매액 {won(order.sales)} · 환불액 {won(order.refund)} · 수수료 {won(order.fee)}</li>
          <li>
            {deposit ? (
              <><strong>입금.xlsx · 입금내역 {deposit.sourceRow}행</strong> · {deposit.orderId} · 입금액 {won(deposit.amount)}</>
            ) : "입금.xlsx · 이 주문번호에 해당하는 입금 행이 없습니다."}
          </li>
        </ul>

        <form className="mt-3 border-t border-slate-200 pt-3" onSubmit={(event) => {
          event.preventDefault();
          const cleanedMemo = memo.trim();
          if (cleanedMemo) onConfirm(cleanedMemo);
        }}>
          <label className="block text-xs font-semibold text-slate-700">
            확인 메모
            <textarea
              className={`mt-1 block min-h-16 w-full resize-y rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm ${focusClass}`}
              maxLength={memoMaxLength}
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
            />
          </label>
          <button type="submit" disabled={!memo.trim() || memo.trim() === confirmedMemo} className={`${actionClass} mt-2 bg-teal-800 text-white hover:bg-teal-900`}>
            확인 메모 저장
          </button>
          <p role="status" className="mt-2 text-xs text-teal-900 [overflow-wrap:anywhere]">
            {confirmedMemo && <><strong>저장된 확인 메모</strong> · {confirmedMemo}</>}
          </p>
        </form>
      </div>
    </details>
  );
}

export function ERPSettlementScreen() {
  const [sampleLoaded, setSampleLoaded] = useState(false);
  const [rows, setRows] = useState<ReconciliationRow[] | null>(null);
  const [filter, setFilter] = useState("전체");
  const [confirmedMemos, setConfirmedMemos] = useState<Record<string, string>>({});
  const visibleRows = rows?.filter(({ status }) => filter === "전체" || status === filter);
  const expectedTotal = rows?.reduce((sum, { expected }) => sum + expected, 0) ?? 0;
  const depositTotal = rows?.reduce((sum, { deposit }) => sum + (deposit?.amount ?? 0), 0) ?? 0;
  const needsReview = rows?.filter(({ order, status }) => status !== "일치" && !confirmedMemos[order.id]).length ?? 0;

  function resetSettlement() {
    setSampleLoaded(false);
    setRows(null);
    setFilter("전체");
    setConfirmedMemos({});
  }

  return (
    <section className="border-t border-slate-200 bg-slate-50 p-3.5 text-slate-950 @md:p-6" aria-label="정산 대사 체험">
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 @md:p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-teal-900 text-white"><FileSpreadsheet size={17} aria-hidden="true" /></span>
          <h3 className="text-sm font-extrabold">정산 대사</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">샘플 엑셀의 주문과 입금 내역을 주문번호로 맞춰 보고, 정산 차액이 생긴 주문을 확인합니다.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" disabled={sampleLoaded} onClick={() => setSampleLoaded(true)} className={`${actionClass} border border-teal-300 bg-white text-teal-900 hover:bg-teal-50 disabled:border-transparent`}>
            샘플 엑셀 데이터 불러오기
          </button>
          <button type="button" disabled={!sampleLoaded || rows !== null} onClick={() => setRows(reconcileOrders())} className={`${actionClass} bg-teal-800 text-white hover:bg-teal-900`}>
            대사 실행
          </button>
          <button type="button" disabled={!sampleLoaded} onClick={resetSettlement} className={`${actionClass} text-slate-700 hover:bg-slate-100`}>
            정산 체험 초기화
          </button>
        </div>
        <p role="status" className="mt-2 text-xs font-medium text-slate-700">
          {rows ? `${rows.length}건의 주문 대사를 완료했습니다.` : sampleLoaded ? `주문.xlsx ${orders.length}행 · 입금.xlsx ${deposits.length}행을 불러왔습니다.` : "샘플 데이터를 불러와 체험을 시작하세요."}
        </p>
      </div>

      {rows && (
        <>
          <dl className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-sm tabular-nums @md:grid @md:grid-cols-3 @md:divide-x @md:divide-y-0">
            <div className="flex flex-wrap justify-between gap-1 px-3 py-2.5 @md:block"><dt className="text-xs text-slate-700">예상 입금 합계</dt><dd className="font-semibold">{won(expectedTotal)}</dd></div>
            <div className="flex flex-wrap justify-between gap-1 px-3 py-2.5 @md:block"><dt className="text-xs text-slate-700">실제 입금 합계</dt><dd className="font-semibold">{won(depositTotal)}</dd></div>
            <div className="flex flex-wrap justify-between gap-1 px-3 py-2.5 @md:block"><dt className="text-xs text-slate-700">차액 합계</dt><dd className="font-semibold text-teal-900">{describeDifference(expectedTotal - depositTotal)}</dd></div>
          </dl>

          <div className="mt-3 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-slate-200 px-3 py-2 @md:px-4">
              <div>
                <p className="text-sm font-bold">주문별 대사 결과</p>
                <p aria-live="polite" aria-atomic="true" className="mt-0.5 text-xs font-medium text-slate-700">확인 필요 {needsReview}건</p>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                대사 상태
                <select value={filter} onChange={(event) => setFilter(event.target.value)} className={`min-h-11 rounded-md border border-slate-300 bg-white px-2 text-sm ${focusClass}`}>
                  <option>전체</option>
                  {Object.keys(statusStyles).map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
            </div>

            {visibleRows?.map((row) => (
              <ReconciliationDetails
                key={row.order.id}
                row={row}
                confirmedMemo={confirmedMemos[row.order.id]}
                onConfirm={(memo) => setConfirmedMemos((previous) => ({ ...previous, [row.order.id]: memo }))}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
