"use client";

import { useId, useState } from "react";
import { ClipboardList, PackageCheck, Warehouse } from "lucide-react";
import { ERPSettlementScreen } from "./ERPSettlementSample";

const products = [
  { code: "BX-100", name: "포장 박스", stock: 24 },
  { code: "PD-200", name: "완충 패드", stock: 80 },
] as const;

const purchaseOrderNumber = "PO-001";
const maxOrderQuantity = 999;
const fieldClassName = "mt-1 flex min-h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2.5 text-sm text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:bg-slate-100 disabled:text-slate-600";
const buttonClassName = "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

type Product = (typeof products)[number];
type PurchaseOrder = {
  product: Product;
  quantity: number;
  received: boolean;
};

export function ERPSystemScreen() {
  const quantityHintId = useId();
  const moduleId = useId();
  const [activeModule, setActiveModule] = useState<"inventory" | "settlement">("inventory");
  const [productCode, setProductCode] = useState<string>(products[0].code);
  const [quantity, setQuantity] = useState("12");
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null);
  const selectedProduct = products.find(({ code }) => code === productCode) ?? products[0];
  const orderQuantity = Number(quantity);
  const quantityIsValid = Number.isInteger(orderQuantity) && orderQuantity >= 1 && orderQuantity <= maxOrderQuantity;
  const orderStatus = purchaseOrder ? (purchaseOrder.received ? "입고 완료" : "입고 대기") : "발주 전";

  function createPurchaseOrder() {
    if (!quantityIsValid) return;
    setPurchaseOrder((current) => current ?? { product: selectedProduct, quantity: orderQuantity, received: false });
  }

  function receivePurchaseOrder() {
    setPurchaseOrder((current) => current && !current.received ? { ...current, received: true } : current);
  }

  function reset() {
    setProductCode(products[0].code);
    setQuantity("12");
    setPurchaseOrder(null);
  }

  return (
    <div className="@container bg-slate-50 text-slate-950">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-slate-200 bg-white px-4 py-3 @md:px-6">
        <p className="flex min-w-0 items-center gap-2 text-sm font-extrabold">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-teal-900 text-white"><Warehouse size={17} aria-hidden="true" /></span>
          N유통 ERP
        </p>
        <p className="text-xs font-medium text-slate-600">본사 운영 · 재고와 정산</p>
      </header>

      <div role="group" aria-label="ERP 기능 선택" className="flex flex-wrap gap-2 border-b border-slate-200 bg-white px-4 py-2 @md:px-6">
        <button
          type="button"
          aria-pressed={activeModule === "inventory"}
          aria-controls={`${moduleId}-inventory`}
          onClick={() => setActiveModule("inventory")}
          className={`${buttonClassName} text-slate-700 hover:bg-slate-100 aria-pressed:bg-teal-50 aria-pressed:text-teal-950`}
        >
          발주·재고
        </button>
        <button
          type="button"
          aria-pressed={activeModule === "settlement"}
          aria-controls={`${moduleId}-settlement`}
          onClick={() => setActiveModule("settlement")}
          className={`${buttonClassName} text-slate-700 hover:bg-slate-100 aria-pressed:bg-teal-50 aria-pressed:text-teal-950`}
        >
          판매 정산
        </button>
      </div>

      <section id={`${moduleId}-inventory`} aria-label="발주·재고" hidden={activeModule !== "inventory"} className="grid gap-4 p-3.5 @lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] @md:p-6">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3.5 @md:p-4">
          <p className="mb-3 text-sm font-bold">현재 재고</p>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {products.map((product) => {
              const receivedQuantity = purchaseOrder?.received && purchaseOrder.product.code === product.code ? purchaseOrder.quantity : 0;
              return (
                <li key={product.code} className="flex items-center justify-between gap-2 py-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-slate-600">{product.code}</p>
                  </div>
                  <p className="shrink-0 text-right font-semibold tabular-nums">
                    {product.stock + receivedQuantity}개
                    {receivedQuantity > 0 && <span className="block text-xs font-medium text-teal-800">+{receivedQuantity}개 입고</span>}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="min-w-0 rounded-xl border border-teal-200 bg-teal-50/60 p-3.5 @md:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold">구매 발주</p>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-teal-900">{orderStatus}</span>
          </div>

          <form onSubmit={(event) => { event.preventDefault(); createPurchaseOrder(); }}>
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-2">
              <label className="min-w-0 text-xs font-semibold text-slate-700">
                발주 품목
                <select value={productCode} onChange={(event) => setProductCode(event.target.value)} disabled={purchaseOrder !== null} className={fieldClassName}>
                  {products.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
                </select>
              </label>
              <label className="min-w-0 text-xs font-semibold text-slate-700">
                발주 수량
                <input type="number" inputMode="numeric" min={1} max={maxOrderQuantity} step={1} required value={quantity} onChange={(event) => setQuantity(event.target.value)} disabled={purchaseOrder !== null} aria-describedby={quantityHintId} className={fieldClassName} />
              </label>
            </div>
            <p id={quantityHintId} className="mt-1.5 text-xs text-slate-600">1~{maxOrderQuantity}개 사이의 정수를 입력하세요.</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button type="submit" disabled={!quantityIsValid || purchaseOrder !== null} className={`${buttonClassName} bg-teal-800 text-white hover:bg-teal-900`}>
                <ClipboardList size={16} aria-hidden="true" /> 발주서 생성
              </button>
              <button type="button" disabled={!purchaseOrder || purchaseOrder.received} onClick={receivePurchaseOrder} className={`${buttonClassName} border border-teal-300 bg-white text-teal-900 hover:bg-teal-100 disabled:border-transparent`}>
                <PackageCheck size={16} aria-hidden="true" /> 입고 처리
              </button>
              <button type="button" onClick={reset} className={`${buttonClassName} text-slate-700 hover:bg-white`}>초기화</button>
            </div>
          </form>

          <div role="status" className="mt-3 min-h-10 border-t border-teal-200 pt-2 text-xs leading-relaxed text-slate-700">
            {purchaseOrder ? (
              <>
                <p className="font-semibold text-teal-950">{purchaseOrderNumber} · {purchaseOrder.product.name} {purchaseOrder.quantity}개</p>
                <p>{purchaseOrder.received ? `입고를 완료했습니다. 현재 재고는 ${purchaseOrder.product.stock + purchaseOrder.quantity}개입니다.` : "발주서를 생성했습니다. 입고 처리 후 재고에 반영됩니다."}</p>
              </>
            ) : "품목과 수량을 선택해 발주서를 생성해 보세요."}
          </div>
        </div>
      </section>
      <section id={`${moduleId}-settlement`} aria-label="판매 정산" hidden={activeModule !== "settlement"}>
        <ERPSettlementScreen />
      </section>
    </div>
  );
}
