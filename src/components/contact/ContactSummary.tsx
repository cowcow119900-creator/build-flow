"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";

export default function ContactSummary({ details }: { details: { label: string; value: string }[] }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const manualCopyRef = useRef<HTMLTextAreaElement>(null);
  const summaryText = details.map(({ label, value }) => `${label}: ${value}`).join("\n");

  useEffect(() => {
    if (copyStatus === "manual") {
      manualCopyRef.current?.focus();
      manualCopyRef.current?.select();
    }
  }, [copyStatus]);

  async function copySummary() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        setCopyStatus("copied");
        return;
      }
    } catch {
      // The clipboard may be blocked by the browser's permission settings.
    }

    setCopyStatus("manual");
  }

  return (
    <section aria-labelledby="contact-summary-title" className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <h3 id="contact-summary-title" className="font-bold text-gray-900">문의 내용 요약</h3>
      <p className="mt-1 text-sm text-gray-600">아래 내용을 복사한 뒤 상담 메시지에 직접 붙여넣으세요.</p>
      <dl className="mt-4 space-y-2 text-sm">
        {details.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[auto_1fr] gap-x-3">
            <dt className="font-semibold text-gray-700">{label}</dt>
            <dd className="text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
      <button type="button" onClick={copySummary} className="btn-secondary mt-4 text-sm">
        <Copy size={16} aria-hidden="true" />
        문의 내용 복사
      </button>
      <p id="contact-copy-status" role="status" className="mt-2 text-sm text-gray-600">
        {copyStatus === "copied" && "문의 내용을 복사했습니다."}
        {copyStatus === "manual" && "아래 텍스트를 선택해 직접 복사해 주세요."}
      </p>
      {copyStatus === "manual" && (
        <textarea
          ref={manualCopyRef}
          aria-label="복사할 문의 내용"
          aria-describedby="contact-copy-status"
          value={summaryText}
          readOnly
          rows={4}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900"
        />
      )}
    </section>
  );
}
