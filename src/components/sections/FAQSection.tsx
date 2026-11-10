"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="home-section bg-white" id="faq">
      <div className="section-container home-container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 text-center md:mb-8">
            <span className="flow-label mb-3">자주 묻는 질문</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              제작 전에 알아둘 점
            </h2>
          </div>

          <div className="space-y-2.5">
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
                      className="flex min-h-12 w-full items-start justify-between gap-3 px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 sm:px-5 sm:py-4"
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
                      <div className="flex gap-3 px-4 pb-4 sm:px-5">
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

          <div className="mt-6 flex flex-col items-start gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-gray-900">더 궁금한 점이 있으신가요?</h3>
              <p className="mt-1 text-sm text-gray-600">무료 상담을 통해 프로젝트에 맞는 답변을 드립니다.</p>
            </div>
            <Link
              href="/contact"
              className="btn-secondary min-h-11 px-4 py-2.5 text-sm"
            >
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
