"use client";

import { Check, ChevronRight, Package, Play, ShoppingBag } from "lucide-react";
import { useId, useState } from "react";

const won = new Intl.NumberFormat("ko-KR");
const controlFocus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
const serumPrice = 28_000;
const serumQuantities = [1, 2, 3, 4, 5];

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
  const reviewsId = useId();
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);

  return (
    <div className="@container bg-[#fcf6f0] text-[#3f2a27]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#e9d9cf] px-4 py-3 @md:px-6">
        <span className="font-serif text-base font-semibold tracking-tight">I. laboratory</span>
        <div className="flex items-center gap-3 text-xs font-medium text-[#65473e]">
          <span>신제품</span>
          <span className="inline-flex items-center gap-1.5"><ShoppingBag size={15} aria-hidden="true" /> 장바구니 {cartQuantity}</span>
        </div>
      </div>
      <div className="grid @md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col items-start justify-center p-4 @md:p-6 @xl:p-8">
          <p className="text-xs font-bold tracking-[0.13em] text-[#965047]">DAILY SERUM · 30 mL</p>
          <p className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance @lg:text-[1.8rem]">매일 쓰는 수분 한 겹</p>
          <p className="mt-2 text-xs leading-relaxed text-[#674b45] @md:text-sm">가볍게 발리는 데일리 수분 세럼. 성분과 사용 후기를 살펴보고 선택하세요.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold tabular-nums">28,000원</span>
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold">
              수량
              <select aria-label="세럼 수량" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className={`min-h-11 rounded-md border border-[#e1beab] bg-white px-2 text-xs ${controlFocus}`}>
                {serumQuantities.map((count) => <option key={count} value={count}>{count}개</option>)}
              </select>
            </label>
            <button type="button" onClick={() => setCartQuantity((count) => count + quantity)} className={`inline-flex min-h-11 items-center gap-1.5 rounded-md bg-[#774539] px-3 py-2 text-xs font-bold text-white hover:bg-[#623a30] ${controlFocus}`}>
              장바구니 담기 <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
        <SerumBottle />
      </div>
      <div className="space-y-2 border-t border-[#e9d9cf] px-4 py-3 @md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3">
          <p role="status" className="text-xs font-semibold leading-relaxed text-[#65473e]">
            {cartQuantity > 0 ? `장바구니 ${cartQuantity}개 · ${won.format(cartQuantity * serumPrice)}원` : "장바구니가 비어 있습니다."}
          </p>
          {cartQuantity > 0 ? (
            <button type="button" onClick={() => setCartQuantity(0)} className={`min-h-11 rounded px-1 text-xs font-semibold underline underline-offset-2 ${controlFocus}`}>
              장바구니 비우기
            </button>
          ) : null}
        </div>
        <p className="text-xs text-[#65473e]">샘플 장바구니에서는 실제 주문이나 결제가 진행되지 않습니다.</p>
      </div>
      <div className="border-t border-[#e9d9cf] px-4 py-1 @md:px-6">
        <button type="button" aria-expanded={showReviews} aria-controls={reviewsId} onClick={() => setShowReviews((open) => !open)} className={`inline-flex min-h-11 items-center gap-1.5 rounded px-1 text-xs font-bold text-[#965047] hover:underline ${controlFocus}`}>
          {showReviews ? "사용 후기 접기" : "사용 후기 보기"} <ChevronRight size={14} aria-hidden="true" className={showReviews ? "rotate-90" : undefined} />
        </button>
        <ul id={reviewsId} hidden={!showReviews} className="space-y-1 pb-3 pl-1 text-xs leading-relaxed text-[#5e433b]">
          <li>“가볍게 발려 아침에도 쓰기 편해요.”</li>
          <li>“향이 은은하고 끈적임이 적어요.”</li>
        </ul>
      </div>
    </div>
  );
}

const quoteItems = [
  { name: "센서 모듈", code: "SN-240", stock: 120, initialCount: 4, unitPrice: 96_000 },
  { name: "장착 브래킷", code: "BK-110", stock: 48, initialCount: 2, unitPrice: 49_000 },
];
const initialQuoteQuantities = quoteItems.map((item) => item.initialCount);

export function B2BSystemScreen() {
  const [quantities, setQuantities] = useState<(number | "")[]>(initialQuoteQuantities);
  const [quoteCreated, setQuoteCreated] = useState(false);
  const subtotal = quoteItems.reduce((sum, item, index) => sum + item.unitPrice * Number(quantities[index]), 0);
  const vat = Math.round(subtotal * 0.1);
  const selectedItemCount = quantities.filter((quantity) => Number(quantity) > 0).length;

  function changeQuantity(index: number, value: number) {
    const quantity = Number.isFinite(value) ? Math.min(quoteItems[index].stock, Math.max(0, Math.trunc(value))) : "";
    setQuantities((previous) => previous.map((count, itemIndex) => itemIndex === index ? quantity : count));
    setQuoteCreated(false);
  }

  function resetQuote() {
    setQuantities(initialQuoteQuantities);
    setQuoteCreated(false);
  }

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
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#204f80]">{quoteCreated ? "생성 완료" : "작성 중"}</span>
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
                {quoteItems.map(({ name, code, stock, unitPrice }, index) => (
                  <tr key={code} className="border-b border-slate-200">
                    <th scope="row" className="px-2 py-2.5 font-bold">
                      {name}<span className="block font-medium text-slate-500">{code}</span>
                      <span className="block font-medium text-slate-600 @xl:hidden">재고 {stock}개</span>
                    </th>
                    <td className="hidden px-2 py-2.5 text-slate-600 @xl:table-cell">{stock}개</td>
                    <td className="px-1 py-2.5 text-right @md:px-2">
                      <input type="number" min={0} max={stock} step={1} inputMode="numeric" aria-label={`${name} 수량`} value={quantities[index]} onChange={(event) => changeQuantity(index, event.currentTarget.valueAsNumber)} className={`min-h-11 w-[3.4rem] rounded-md border border-slate-300 px-1 text-center font-semibold @md:w-16 ${controlFocus}`} />
                    </td>
                    <td className="px-2 py-2.5 text-right font-semibold">{won.format(unitPrice * Number(quantities[index]))}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs font-medium text-slate-600">선택 품목 {selectedItemCount}종 · 재고 내 수량 조정 가능</p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-[#f2f7fd] p-3">
            <p className="mb-2 text-sm font-bold">견적 요약</p>
            <dl className="space-y-1 text-xs tabular-nums text-slate-700">
              <div className="flex justify-between gap-2"><dt>공급가</dt><dd>{won.format(subtotal)}원</dd></div>
              <div className="flex justify-between gap-2"><dt>부가세</dt><dd>{won.format(vat)}원</dd></div>
              <div className="flex justify-between gap-2 border-t border-blue-100 pt-2 text-sm font-bold text-[#163b65]"><dt>합계</dt><dd aria-live="polite">{won.format(subtotal + vat)}원</dd></div>
            </dl>
            <button type="button" disabled={!selectedItemCount || quoteCreated} onClick={() => setQuoteCreated(true)} className={`mt-3 flex min-h-11 w-full items-center justify-center gap-1 rounded-md bg-[#204f80] px-2 py-2 text-center text-xs font-bold text-white hover:bg-[#163b65] disabled:bg-slate-500 ${controlFocus}`}>
              견적서 생성 <ChevronRight size={14} aria-hidden="true" />
            </button>
            <p role="status" className="mt-2 text-xs leading-relaxed text-slate-600">
              {quoteCreated
                ? `샘플 견적서를 생성했습니다. Q-001 · ${selectedItemCount}개 품목 · ${won.format(subtotal + vat)}원`
                : "재고 범위에서 수량을 조정하고 견적서를 만들어 보세요."}
            </p>
            <button type="button" onClick={resetQuote} className={`mt-1 min-h-11 rounded px-1 text-xs font-semibold text-[#204f80] underline underline-offset-2 ${controlFocus}`}>
              견적 초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const lessons = [
  { title: "강의 소개", time: "06:10", description: "과정 목표와 차시별 학습 방법 소개" },
  { title: "읽는 사람 정하기", time: "11:20", description: "문서를 읽는 사람과 결정해야 할 사항 정의" },
  { title: "업무 문서의 구조", time: "14:30", description: "핵심 메시지와 문서 목차 구성" },
  { title: "보고서 작성 실습", time: "18:40", description: "주어진 자료로 보고서 초안 작성" },
];
const initialCompletedLessons = [0, 1];
const initialSelectedLesson = 2;

export function EducationSystemScreen() {
  const [selectedLesson, setSelectedLesson] = useState(initialSelectedLesson);
  const [completedLessons, setCompletedLessons] = useState(initialCompletedLessons);
  const lesson = lessons[selectedLesson];
  const lessonNumber = String(selectedLesson + 1).padStart(2, "0");
  const lessonCompleted = completedLessons.includes(selectedLesson);
  const lessonStarted = selectedLesson === initialSelectedLesson;
  const playbackTime = lessonCompleted ? lesson.time : lessonStarted ? "08:42" : "00:00";
  const playbackWidth = lessonCompleted ? "w-full" : lessonStarted ? "w-[60%]" : "w-0";
  const courseProgress = Math.round(completedLessons.length * 100 / lessons.length);

  function resetProgress() {
    setSelectedLesson(initialSelectedLesson);
    setCompletedLessons(initialCompletedLessons);
  }

  return (
    <div className="@container bg-white text-slate-900">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-slate-200 px-4 py-3 text-xs @md:px-6">
        <span className="text-sm font-bold">L 온라인 강의실</span>
        <ChevronRight size={14} className="text-slate-500" aria-hidden="true" />
        <span className="font-medium text-slate-600">실무 문서 작성</span>
      </div>
      <div className="grid gap-4 p-4 @lg:grid-cols-[minmax(0,1.24fr)_minmax(0,1fr)] @md:p-6">
        <div className="min-w-0">
          <div className="relative isolate flex aspect-video min-h-32 flex-col items-start justify-center overflow-hidden rounded-lg bg-[#162538] px-3 pt-2 pb-7 text-white @md:px-4">
            <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M194-10L326 111V-10ZM219 180L320 83v97Z" fill="#1e3b58" />
              <path d="M153 180L320 13M173 180L320 33M193 180L320 53M213 180L320 73" fill="none" stroke="#73a4cc" strokeOpacity="0.35" />
            </svg>
            <p className="text-xs font-bold tracking-wide text-[#a9d2ff]">LESSON {lessonNumber}</p>
            <p className="mt-1 max-w-[12rem] text-lg leading-tight font-bold tracking-tight @lg:text-xl">{lesson.title}</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#dcecff]"><Play size={12} fill="currentColor" aria-hidden="true" /> 영상 화면 예시</p>
            <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-xs @md:inset-x-4">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/25" aria-hidden="true"><span className={`block h-full rounded-full bg-[#a9d2ff] ${playbackWidth}`} /></span>
              <span className="text-white tabular-nums">{playbackTime} / {lesson.time}</span>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{lessonNumber}강 · {lesson.description}</p>
          <button type="button" disabled={lessonCompleted} onClick={() => setCompletedLessons((completed) => completed.includes(selectedLesson) ? completed : [...completed, selectedLesson])} className={`mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-md bg-[#245789] px-3 py-2 text-xs font-bold text-white hover:bg-[#163b65] disabled:bg-slate-500 ${controlFocus}`}>
            <Check size={14} aria-hidden="true" /> {lessonCompleted ? "수강 완료" : "수강 완료 표시"}
          </button>
        </div>
        <div className="min-w-0 border-t border-slate-200 pt-3 @lg:border-t-0 @lg:border-l @lg:pt-0 @lg:pl-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <p className="text-sm font-bold">차시 목록</p>
            <p role="status" className="text-xs font-bold text-[#245789]">진도 {courseProgress}% <span className="font-medium text-slate-600">· {completedLessons.length}/{lessons.length} 완료</span></p>
          </div>
          <ul className="mt-2 space-y-1">
            {lessons.map(({ title, time }, index) => (
              <li key={title}>
                <button type="button" aria-pressed={selectedLesson === index} onClick={() => setSelectedLesson(index)} className={`flex min-h-11 w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs hover:bg-slate-100 ${controlFocus} ${selectedLesson === index ? "bg-[#eaf3ff] text-[#245789]" : "text-slate-700"}`}>
                  <span aria-hidden="true" className="shrink-0 font-medium tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 font-semibold">{title}</span>
                  <span className="shrink-0 text-slate-600 tabular-nums">{time}</span>
                  {completedLessons.includes(index) ? <span className="grid size-4 shrink-0 place-items-center text-[#245789]"><span className="sr-only">완료</span><Check size={13} aria-hidden="true" /></span> : null}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={resetProgress} className={`mt-1 min-h-11 rounded px-1 text-xs font-semibold text-[#245789] underline underline-offset-2 ${controlFocus}`}>
            진도 초기화
          </button>
        </div>
      </div>
    </div>
  );
}
