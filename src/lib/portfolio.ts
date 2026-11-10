type PortfolioSummary = {
  id: string;
  category: string;
  industry: string;
  title: string;
  problem: string;
  features: string[];
  period: string;
  stack: string[];
  result: string;
  colorClass: string;
};

type PortfolioDetail = {
  problem: string;
  analysis: string;
  design: string;
  features: Array<{ name: string; desc: string }>;
  results: string[];
  effects: string[];
};

type PortfolioItem = PortfolioSummary & { detail?: PortfolioDetail };

export type PortfolioCardData = PortfolioSummary & { hasDetails: boolean };

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "medical-reservation",
    category: "예약 시스템",
    industry: "의료",
    title: "H의원 온라인 예약 시스템",
    problem: "전화 예약으로 인한 업무 과부하와 노쇼 발생",
    features: ["실시간 예약", "SMS 리마인더", "의사별 스케줄 관리", "관리자 대시보드"],
    period: "6주",
    stack: ["Next.js", "Supabase", "Vercel", "Coolsms API"],
    result: "예약 전화 70% 감소, 노쇼율 35% 개선",
    colorClass: "from-blue-500 to-blue-700",
    detail: {
      problem: "H의원은 하루 평균 60건 이상의 전화 예약을 처리했습니다. 간호사 2명이 예약 전화 응대에 대부분의 시간을 소비했고, 전화가 연결되지 않아 예약 기회를 놓치는 경우도 빈번했습니다. 또한 노쇼율이 20%를 넘어 진료 공백이 지속되었습니다.",
      analysis: "문제의 핵심은 '예약 진입 장벽'이었습니다. 환자 입장에서 전화를 걸어야만 예약이 가능한 구조는 바쁜 시간대에 이탈을 유발했습니다. 실시간 온라인 예약과 자동 리마인더 발송으로 이 문제를 해결할 수 있다고 분석했습니다.",
      design: "모바일 우선 설계로 스마트폰에서 30초 이내에 예약 완료가 가능하도록 UX를 설계했습니다. 진료과별 → 의사별 → 날짜/시간 순서의 직관적인 흐름을 구성했습니다.",
      features: [
        { name: "실시간 예약", desc: "진료과별 · 의사별 가용 시간을 실시간으로 표시하고 즉시 예약 확정" },
        { name: "SMS/카카오 리마인더", desc: "예약 1일 전, 2시간 전 자동 알림 발송으로 노쇼 방지" },
        { name: "의사별 스케줄 관리", desc: "관리자 페이지에서 진료 일정과 예약 현황을 한눈에 관리" },
        { name: "대기자 자동 배정", desc: "취소 발생 시 대기자에게 자동으로 예약 기회 부여" },
      ],
      results: [
        "예약 전화 건수 70% 감소",
        "노쇼율 20% → 13%로 35% 개선",
        "온라인 예약 비중 0% → 68%",
        "간호사 예약 처리 업무 80% 절감",
      ],
      effects: [
        "진료 효율 증가로 실질 수익 개선",
        "환자 편의성 향상으로 재방문율 증가",
        "스태프 업무 부담 감소",
      ],
    },
  },
  {
    id: "brand-landing",
    category: "랜딩페이지",
    industry: "뷰티",
    title: "I브랜드 신제품 출시 랜딩페이지",
    problem: "광고 클릭 후 전환율이 1% 미만으로 ROAS 저조",
    features: ["단계형 스크롤 스토리", "리뷰 소셜 증거", "즉시 구매 CTA", "픽셀 추적"],
    period: "2주",
    stack: ["Next.js", "Vercel", "GA4", "Meta Pixel"],
    result: "광고 전환율 0.8% → 4.8% 개선",
    colorClass: "from-rose-400 to-pink-600",
    detail: {
      problem: "인스타그램 광고를 월 300만원씩 집행했지만, 랜딩페이지 전환율이 1% 미만이었습니다. ROAS가 1.2 수준에 머물러 광고를 늘릴수록 손실이 쌓이는 구조였습니다.",
      analysis: "기존 랜딩페이지는 제품 설명은 길었지만 구매 결정을 유도하는 사회적 증거, 긴급성 요소, 명확한 CTA가 없었습니다. 또한 페이지 로딩이 느려 모바일 이탈률이 높았습니다.",
      design: "스크롤 하나하나에 구매 설득의 단계를 배치했습니다. 후기 → 효과 → 성분 → 비교 → 한정 CTA의 순서로 자연스럽게 구매 의향을 높이는 구조로 설계했습니다.",
      features: [
        { name: "스크롤 스토리텔링", desc: "스크롤 단계마다 설득 요소를 배치한 세일즈 퍼널 구조" },
        { name: "소셜 증거 섹션", desc: "실제 구매 후기와 SNS 인증샷 자동 수집 및 표시" },
        { name: "즉시 구매 CTA", desc: "스크롤 위치에 따라 노출되는 고정 구매 버튼" },
        { name: "픽셀·GA4 추적", desc: "Meta 픽셀과 GA4 연동으로 광고 전환 정확 추적" },
      ],
      results: [
        "전환율 0.8% → 4.8% (6배 개선)",
        "ROAS 1.2 → 5.8 달성",
        "페이지 로딩 속도 4.2초 → 1.1초",
        "모바일 이탈률 75% → 48%",
      ],
      effects: [
        "같은 광고비로 6배 더 많은 전환 달성",
        "광고 예산을 늘릴 수 있는 구조 확보",
        "정확한 전환 추적으로 광고 최적화 가능",
      ],
    },
  },
  {
    id: "b2b-portal",
    category: "기업 홈페이지",
    industry: "제조업",
    title: "J제조사 B2B 파트너 포털",
    problem: "영업 담당자 없이도 파트너사가 견적과 발주를 처리할 수 없었음",
    features: ["파트너 로그인", "견적 자동 생성", "발주 관리", "재고 조회"],
    period: "10주",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    result: "영업 처리 시간 60% 단축",
    colorClass: "from-slate-600 to-slate-800",
  },
  {
    id: "fitness-saas",
    category: "SaaS 개발",
    industry: "헬스케어",
    title: "K피트니스 센터 회원 관리 SaaS",
    problem: "엑셀로 회원 관리, PT 스케줄 충돌 잦음",
    features: ["회원 등록/관리", "PT 예약", "결제 연동", "출석 관리"],
    period: "14주",
    stack: ["Next.js", "Supabase", "Stripe", "Vercel"],
    result: "관리 시간 80% 절감, 센터 3곳 도입",
    colorClass: "from-emerald-500 to-teal-700",
  },
  {
    id: "education-platform",
    category: "온라인 플랫폼",
    industry: "교육",
    title: "L교육원 온라인 강의 플랫폼",
    problem: "오프라인 강의만 운영, 수강생 확장에 한계",
    features: ["강의 스트리밍", "수강생 관리", "결제 구독", "진도 관리"],
    period: "12주",
    stack: ["Next.js", "Supabase", "Cloudflare Stream"],
    result: "온라인 수강생 0 → 350명 달성",
    colorClass: "from-violet-500 to-purple-700",
  },
  {
    id: "restaurant-renewal",
    category: "리뉴얼",
    industry: "F&B",
    title: "M레스토랑 예약 시스템 리뉴얼",
    problem: "구형 홈페이지로 모바일 접속 시 이탈률 80%",
    features: ["모바일 최적화", "실시간 예약", "웨이팅 시스템", "SNS 연동"],
    period: "4주",
    stack: ["Next.js", "Supabase", "Vercel"],
    result: "모바일 이탈률 80% → 35% 개선",
    colorClass: "from-amber-400 to-orange-600",
  },
];

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.id === slug);
}

export function getFeaturedPortfolioItems(): PortfolioCardData[] {
  return PORTFOLIO_ITEMS.slice(0, 4).map(({ detail, ...summary }) => ({
    ...summary,
    hasDetails: detail !== undefined,
  }));
}
