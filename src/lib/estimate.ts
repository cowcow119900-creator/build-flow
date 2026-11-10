import { SERVICES } from "./constants";

const estimatedServices = SERVICES.filter((service) => service.estimate !== null);
type EstimatedServiceId = (typeof estimatedServices)[number]["id"];

export const PURPOSES = estimatedServices.map(({ id, estimate, priceFrom }) => ({
  value: id,
  label: estimate.label,
  icon: estimate.icon,
  baseMin: priceFrom,
  baseMax: estimate.max,
}));

export const DESIGN_LEVELS = [
  { value: "standard", label: "스탠다드", desc: "기능 중심 깔끔한 디자인", add: 0 },
  { value: "premium", label: "프리미엄", desc: "브랜드 맞춤 고퀄리티", add: 80 },
  { value: "enterprise", label: "엔터프라이즈", desc: "모션·인터랙션 포함 최상급", add: 200 },
] as const;

export const CORE_FEATURES = [
  { key: "hasAdmin", label: "관리자 페이지", min: 80, max: 150 },
  { key: "hasMember", label: "회원가입 / 로그인", min: 60, max: 100 },
  { key: "hasPayment", label: "결제 기능", min: 80, max: 150 },
  { key: "hasReservation", label: "예약 기능", min: 100, max: 180 },
] as const;

export const EXTRA_FEATURES = [
  { value: "cms", label: "CMS 콘텐츠 관리", add: 50 },
  { value: "multilang", label: "다국어 지원", add: 80 },
  { value: "seo", label: "SEO 최적화", add: 60 },
  { value: "analytics", label: "GA4 / 통계", add: 40 },
  { value: "chatbot", label: "AI 챗봇 연동", add: 120 },
  { value: "email", label: "이메일 자동화", add: 50 },
] as const;

export const TIMELINES = [
  { value: "urgent", label: "1개월 이내", surcharge: 30 },
  { value: "normal", label: "1~2개월", surcharge: 0 },
  { value: "relaxed", label: "2~3개월", surcharge: 0 },
  { value: "flexible", label: "일정 협의", surcharge: 0 },
] as const;

export const BUDGETS = [
  { value: "under100", label: "100만원 미만" },
  { value: "100-300", label: "100~300만원" },
  { value: "300-500", label: "300~500만원" },
  { value: "500-1000", label: "500~1000만원" },
  { value: "over1000", label: "1000만원 이상" },
  { value: "undecided", label: "미정 / 협의" },
] as const;

export type ExtraFeature = (typeof EXTRA_FEATURES)[number]["value"];

export type EstimateState = {
  purpose: EstimatedServiceId | "";
  designLevel: (typeof DESIGN_LEVELS)[number]["value"];
  features: ExtraFeature[];
  timeline: (typeof TIMELINES)[number]["value"];
  budget: (typeof BUDGETS)[number]["value"];
} & Record<(typeof CORE_FEATURES)[number]["key"], boolean>;

export function normalizeServiceId(value: string | null): EstimatedServiceId | "" {
  return estimatedServices.find((service) => service.id === value || service.estimate.legacyId === value)?.id ?? "";
}

export function createEstimateState(purpose: EstimateState["purpose"]): EstimateState {
  return {
    purpose,
    designLevel: "standard",
    features: [],
    hasAdmin: false,
    hasMember: false,
    hasPayment: false,
    hasReservation: false,
    timeline: "normal",
    budget: "undecided",
  };
}

export function computeRange(state: EstimateState) {
  const service = estimatedServices.find(({ id }) => id === state.purpose);
  if (!service) return { min: 0, max: 0, weeks: "-", difficulty: "-", approach: "-" };

  const design = DESIGN_LEVELS.find(({ value }) => value === state.designLevel);
  let min: number = service.priceFrom + (design?.add ?? 0);
  let max: number = service.estimate.max + (design ? design.add + 50 : 0);

  for (const option of CORE_FEATURES) {
    if (state[option.key]) {
      min += option.min;
      max += option.max;
    }
  }

  for (const option of EXTRA_FEATURES) {
    if (state.features.includes(option.value)) {
      min += option.add;
      max += option.add + 20;
    }
  }

  const surcharge = TIMELINES.find(({ value }) => value === state.timeline)?.surcharge ?? 0;
  min += surcharge;
  max += surcharge;

  const difficulty = min > 600 ? "높음" : min > 300 ? "중간" : "낮음";
  return { min, max, weeks: service.estimate.weeks, difficulty, approach: service.estimate.approach };
}

export function getEstimateContactHref(state: EstimateState) {
  const params = new URLSearchParams({
    purpose: state.purpose,
    designLevel: state.designLevel,
    features: state.features.join(","),
    timeline: state.timeline,
    budget: state.budget,
  });
  for (const { key } of CORE_FEATURES) params.set(key, String(state[key]));
  return `/contact?${params.toString()}`;
}

export function getEstimateContactDetails(params: URLSearchParams) {
  const requestedServiceId = params.get("purpose");
  const requestedService = SERVICES.find(({ id }) => id === requestedServiceId);
  if (requestedService?.estimate === null) {
    return [{ label: "제작 유형", value: requestedService.title }];
  }

  const purpose = normalizeServiceId(requestedServiceId);
  const service = PURPOSES.find(({ value }) => value === purpose);
  if (!service) return [];

  const details: { label: string; value: string }[] = [{ label: "제작 유형", value: service.label }];
  const design = DESIGN_LEVELS.find(({ value }) => value === params.get("designLevel"));
  const timeline = TIMELINES.find(({ value }) => value === params.get("timeline"));
  const budget = BUDGETS.find(({ value }) => value === params.get("budget"));
  const chosenFeatures = params.get("features")?.split(",") ?? [];
  const extraFeatures = EXTRA_FEATURES.filter(({ value }) => chosenFeatures.includes(value));
  const coreFeatures = CORE_FEATURES.filter(({ key }) => params.get(key) === "true");
  const features = [...coreFeatures, ...extraFeatures].map(({ label }) => label);

  if (design) details.push({ label: "디자인", value: design.label });
  if (features.length) details.push({ label: "선택 기능", value: features.join(", ") });
  if (timeline) details.push({ label: "희망 일정", value: timeline.label });
  if (budget) details.push({ label: "예산", value: budget.label });

  if (design && timeline && budget) {
    const state = createEstimateState(purpose);
    state.designLevel = design.value;
    state.timeline = timeline.value;
    state.budget = budget.value;
    state.features = extraFeatures.map(({ value }) => value);
    for (const { key } of coreFeatures) state[key] = true;

    const { min, max, weeks } = computeRange(state);
    details.push({ label: "예상 견적", value: `${min.toLocaleString("ko-KR")}~${max.toLocaleString("ko-KR")}만원 (VAT 별도)` });
    details.push({ label: "예상 제작 기간", value: weeks });
  }

  return details;
}
