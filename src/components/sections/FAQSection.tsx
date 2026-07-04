"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import AnimatedSection from "@/components/motion/AnimatedSection";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="pt-16 pb-24 bg-white" id="faq">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              자주 묻는 질문
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              상담 전에 궁금하셨나요?
            </h2>
          </AnimatedSection>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0, 0, 0.2, 1] }}
                className={`rounded-2xl border-2 overflow-hidden transition-colors ${
                  open === i ? "border-blue-200" : "border-gray-100"
                }`}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex items-start gap-3">
                    <motion.span
                      animate={{ backgroundColor: open === i ? "#1d5be7" : "#eff6ff" }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6 text-white text-xs font-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ color: open === i ? "white" : "#1d5be7" }}
                    >
                      Q
                    </motion.span>
                    <span className="font-bold text-gray-900 text-base">{faq.q}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <ChevronDown size={20} className="text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="flex gap-3">
                          <span className="w-6 h-6 bg-gray-100 text-gray-500 text-xs font-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            A
                          </span>
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="mt-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white" delay={0.2}>
            <h3 className="font-black text-xl mb-2">더 궁금한 점이 있으신가요?</h3>
            <p className="text-blue-200 mb-6">무료 상담을 통해 프로젝트에 맞는 답변을 드립니다.</p>
            <motion.a
              href="/contact"
              className="btn-outline-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              무료 상담 신청하기
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
