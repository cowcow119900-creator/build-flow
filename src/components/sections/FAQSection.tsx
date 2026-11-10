"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="pt-16 pb-24 bg-white" id="faq">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              자주 묻는 질문
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              상담 전에 궁금하셨나요?
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              const questionId = `${id}-question-${i}`;
              const answerId = `${id}-answer-${i}`;

              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border-2 overflow-hidden motion-safe:transition-colors ${
                    isOpen ? "border-blue-200" : "border-gray-100"
                  }`}
                >
                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      aria-controls={answerId}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-4 p-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
                      onClick={() => setOpen((current) => current === i ? null : i)}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className={`w-6 h-6 text-xs font-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 motion-safe:transition-colors ${
                            isOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          Q
                        </span>
                        <span className="font-bold text-gray-900 text-base">{faq.q}</span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        size={20}
                        className={`flex-shrink-0 mt-0.5 text-gray-400 motion-safe:transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    aria-hidden={!isOpen}
                    className={`grid motion-safe:transition-[grid-template-rows,opacity,visibility] motion-safe:duration-300 ${
                      isOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="flex gap-3 px-6 pb-6">
                        <span aria-hidden="true" className="w-6 h-6 bg-gray-100 text-gray-500 text-xs font-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          A
                        </span>
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h3 className="font-black text-xl mb-2">더 궁금한 점이 있으신가요?</h3>
            <p className="text-blue-200 mb-6">무료 상담을 통해 프로젝트에 맞는 답변을 드립니다.</p>
            <Link
              href="/contact"
              className="btn-outline-white motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.97]"
            >
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
