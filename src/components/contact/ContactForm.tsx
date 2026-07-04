"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { trackEvent } from "@/lib/utils";

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  industry: string;
  purpose: string;
  features: string;
  budget: string;
  deadline: string;
  currentSite: string;
  refSites: string;
  detail: string;
  agree: boolean;
};

const INDUSTRIES = [
  "의료/헬스케어", "교육", "제조/B2B", "소매/이커머스", "부동산",
  "음식/F&B", "뷰티/패션", "IT/스타트업", "금융/보험", "기타",
];

const PURPOSE_OPTIONS = SERVICES.map((s) => s.title);

const BUDGET_OPTIONS = [
  "100만원 미만", "100~300만원", "300~500만원",
  "500~1000만원", "1000만원 이상", "미정 / 협의",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    phone: "",
    email: "",
    industry: "",
    purpose: "",
    features: "",
    budget: "",
    deadline: "",
    currentSite: "",
    refSites: "",
    detail: "",
    agree: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill from estimate calculator
  useEffect(() => {
    const purposeParam = searchParams.get("purpose");
    const budgetParam = searchParams.get("budget");
    const featuresParam = searchParams.get("features");

    if (purposeParam) {
      const svc = SERVICES.find((s) => s.id === purposeParam);
      if (svc) setForm((prev) => ({ ...prev, purpose: svc.title }));
    }
    if (budgetParam) {
      const budgetMap: Record<string, string> = {
        "under100": "100만원 미만",
        "100-300": "100~300만원",
        "300-500": "300~500만원",
        "500-1000": "500~1000만원",
        "over1000": "1000만원 이상",
        "undecided": "미정 / 협의",
      };
      setForm((prev) => ({ ...prev, budget: budgetMap[budgetParam] || "" }));
    }
    if (featuresParam) {
      setForm((prev) => ({ ...prev, features: featuresParam.split(",").join(", ") }));
    }

    trackEvent("contact_form_view");
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) {
      setError("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    setSubmitting(true);
    setError("");

    trackEvent("contact_form_submit", { purpose: form.purpose, budget: form.budget });

    // Simulate submission (replace with actual API call)
    await new Promise((r) => setTimeout(r, 1200));

    setSubmitting(false);
    router.push("/contact/success");
  };

  const inputClass =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Basic info */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black">1</span>
          기본 정보
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              회사명 / 브랜드명
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="(주)ABC 또는 개인"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="hello@company.com"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">업종</label>
            <select name="industry" value={form.industry} onChange={handleChange} className={inputClass}>
              <option value="">업종 선택</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Project info */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black">2</span>
          프로젝트 정보
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              제작 목적 <span className="text-red-500">*</span>
            </label>
            <select name="purpose" value={form.purpose} onChange={handleChange} required className={inputClass}>
              <option value="">제작 목적 선택</option>
              {PURPOSE_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">필요한 기능</label>
            <input
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="예: 관리자 페이지, 회원가입, 결제, 예약, AI 챗봇..."
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">예상 예산</label>
              <select name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
                <option value="">예산 선택</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">희망 오픈일</label>
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: References */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black">3</span>
          참고 자료
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">현재 홈페이지 주소</label>
            <input
              name="currentSite"
              value={form.currentSite}
              onChange={handleChange}
              placeholder="https://www.example.com (없으면 비워두세요)"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">참고 사이트</label>
            <input
              name="refSites"
              value={form.refSites}
              onChange={handleChange}
              placeholder="마음에 드는 사이트 URL (여러 개 입력 가능)"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              프로젝트 상세 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detail"
              value={form.detail}
              onChange={handleChange}
              required
              rows={5}
              placeholder="프로젝트 목적, 타겟 사용자, 필요한 기능, 특이 사항 등을 자유롭게 작성해 주세요."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Agreement */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              개인정보 수집·이용에 동의합니다. <span className="text-red-500">*</span>
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              상담 목적으로 이름, 연락처, 이메일을 수집합니다. 수집된 정보는 상담 종료 후 1년간 보관 후 파기됩니다.
              동의를 거부할 수 있으나, 거부 시 상담 신청이 제한됩니다.
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-4">
          <AlertCircle size={16} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full py-4 text-base justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            제출 중...
          </>
        ) : (
          <>
            <Send size={18} />
            상담 신청 완료하기
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        영업일 기준 1~2일 이내에 담당자가 연락드립니다.
      </p>
    </form>
  );
}
