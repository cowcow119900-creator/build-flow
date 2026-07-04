"use client";

import { useState } from "react";
import { Calculator, MessageCircle, Phone, X, ChevronUp } from "lucide-react";
import Link from "next/link";
import { COMPANY_PHONE, KAKAO_LINK } from "@/lib/constants";
import { trackEvent } from "@/lib/utils";

export default function MobileBottomCTA() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Expanded options */}
      {expanded && (
        <div className="bg-white border-t border-gray-200 shadow-xl px-4 py-3">
          <div className="flex gap-2 mb-3">
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm"
              onClick={() => trackEvent("mobile_cta_click", { type: "phone" })}
            >
              <Phone size={16} className="text-blue-600" />
              전화 상담
            </a>
            <a
              href={KAKAO_LINK}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-400 text-gray-900 font-semibold text-sm"
              onClick={() => trackEvent("mobile_cta_click", { type: "kakao" })}
            >
              <MessageCircle size={16} />
              카카오 상담
            </a>
          </div>
        </div>
      )}

      {/* Main bar */}
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-2 flex items-center gap-2">
        <Link
          href="/estimate"
          className="flex-1 btn-primary py-3 text-sm justify-center"
          data-track="mobile_cta_estimate"
          onClick={() => trackEvent("mobile_cta_click", { type: "estimate" })}
        >
          <Calculator size={16} />
          무료 견적
        </Link>
        <button
          onClick={() => {
            setExpanded(!expanded);
            trackEvent("mobile_cta_click", { type: "expand" });
          }}
          className="flex items-center gap-1 bg-gray-100 rounded-xl py-3 px-4 text-gray-700 font-semibold text-sm"
        >
          {expanded ? <X size={16} /> : <ChevronUp size={16} />}
          {expanded ? "닫기" : "상담"}
        </button>
      </div>
    </div>
  );
}
