export const COMPANY_NAME = "Build Flow";
export const COMPANY_TAGLINE = "홈페이지가 아니라, 고객을 만드는 디지털 시스템을 만듭니다.";
export const COMPANY_PHONE = "02-1234-5678";
export const COMPANY_EMAIL = "hello@buildflow.kr";
export const KAKAO_LINK = "#";

export const SERVICES = [
  {
    id: "corporate-website",
    icon: "Building2",
    title: "기업 홈페이지 제작",
    desc: "브랜드 신뢰와 전환을 동시에 잡는 기업 대표 사이트",
    features: ["반응형 디자인", "SEO 최적화", "CMS 연동", "성과 분석"],
    priceFrom: 150,
  },
  {
    id: "landing-page",
    icon: "Rocket",
    title: "랜딩페이지 제작",
    desc: "광고 전환율을 극대화하는 단일 목적 페이지",
    features: ["A/B 테스트", "전환 최적화", "빠른 로딩", "리드 수집"],
    priceFrom: 80,
  },
  {
    id: "shopping-mall",
    icon: "ShoppingCart",
    title: "쇼핑몰 제작",
    desc: "상품 관리부터 결제까지 완전한 커머스 솔루션",
    features: ["상품 관리", "결제 연동", "재고 관리", "주문 추적"],
    priceFrom: 300,
  },
  {
    id: "reservation-system",
    icon: "Calendar",
    title: "예약 시스템 제작",
    desc: "병원, 강의, 서비스업 맞춤 예약·스케줄 관리",
    features: ["실시간 예약", "알림 발송", "캘린더 통합", "결제 연동"],
    priceFrom: 200,
  },
  {
    id: "admin-system",
    icon: "LayoutDashboard",
    title: "관리자 시스템 제작",
    desc: "사업 운영에 필요한 맞춤 백오피스 구축",
    features: ["대시보드", "데이터 관리", "권한 설정", "통계 리포트"],
    priceFrom: 250,
  },
  {
    id: "renewal",
    icon: "RefreshCw",
    title: "기존 홈페이지 리뉴얼",
    desc: "낡은 사이트를 현대적 성과 중심 구조로 개선",
    features: ["UX 개선", "성능 최적화", "모바일 대응", "콘텐츠 재구성"],
    priceFrom: 120,
  },
  {
    id: "saas-development",
    icon: "Code2",
    title: "SaaS / 웹서비스 개발",
    desc: "회원제 구독 서비스, 플랫폼 MVP 설계 및 개발",
    features: ["회원 인증", "구독 결제", "API 설계", "확장 구조"],
    priceFrom: 500,
  },
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI 자동화 및 챗봇 연동",
    desc: "반복 업무 자동화와 AI 상담 챗봇 도입",
    features: ["AI 챗봇", "업무 자동화", "데이터 분석", "CRM 연동"],
    priceFrom: 180,
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "무료 상담",
    desc: "사업 목표와 필요 기능을 파악합니다",
    duration: "1~2일",
    prepare: "사업 소개자료, 참고 사이트",
    icon: "MessageCircle",
  },
  {
    step: 2,
    title: "요구사항 분석",
    desc: "기능 범위와 기술 스택을 설계합니다",
    duration: "2~3일",
    prepare: "업무 흐름, 필요 기능 목록",
    icon: "Search",
  },
  {
    step: 3,
    title: "견적 및 일정 확정",
    desc: "명확한 범위와 비용을 계약서로 확인합니다",
    duration: "1일",
    prepare: "계약 검토",
    icon: "FileText",
  },
  {
    step: 4,
    title: "화면 설계",
    desc: "사용자 흐름과 정보 구조를 설계합니다",
    duration: "3~7일",
    prepare: "콘텐츠 자료 준비",
    icon: "Layers",
  },
  {
    step: 5,
    title: "디자인",
    desc: "브랜드 정체성을 반영한 UI를 완성합니다",
    duration: "5~10일",
    prepare: "로고, 브랜드 가이드",
    icon: "Palette",
  },
  {
    step: 6,
    title: "개발",
    desc: "검증된 기술 스택으로 구현합니다",
    duration: "10~30일",
    prepare: "콘텐츠 최종 확정",
    icon: "Code2",
  },
  {
    step: 7,
    title: "테스트",
    desc: "기기별, 기능별 품질 검수를 진행합니다",
    duration: "2~5일",
    prepare: "테스트 시나리오 검토",
    icon: "CheckCircle2",
  },
  {
    step: 8,
    title: "배포",
    desc: "안정적인 서버 환경에 출시합니다",
    duration: "1일",
    prepare: "도메인, 호스팅 정보",
    icon: "Globe",
  },
  {
    step: 9,
    title: "유지보수",
    desc: "출시 후 운영 지원과 기능 확장을 합니다",
    duration: "지속",
    prepare: "운영 담당자 지정",
    icon: "Wrench",
  },
];

export const WHY_US = [
  {
    icon: "Target",
    title: "사업 목적 중심 설계",
    desc: "예쁜 홈페이지보다 고객을 만드는 구조를 먼저 설계합니다. 전환 목표부터 역산해서 구축합니다.",
  },
  {
    icon: "Smartphone",
    title: "모바일 우선 반응형",
    desc: "모바일에서 먼저 완벽하게 동작하도록 개발합니다. 데스크탑은 그 다음입니다.",
  },
  {
    icon: "LayoutDashboard",
    title: "관리자 기능까지",
    desc: "운영에 필요한 관리자 페이지와 고객관리 시스템까지 함께 구축합니다.",
  },
  {
    icon: "TrendingUp",
    title: "SEO와 광고 전환 고려",
    desc: "검색 최적화와 광고 연동까지 고려한 구조로 유입부터 전환까지 설계합니다.",
  },
  {
    icon: "Zap",
    title: "빠르고 안정적인 인프라",
    desc: "Vercel, Supabase 기반의 현대적 인프라로 빠른 로딩과 높은 안정성을 보장합니다.",
  },
  {
    icon: "RefreshCw",
    title: "제작 후 확장 가능",
    desc: "처음부터 확장을 고려한 구조로 설계합니다. 기능 추가와 리뉴얼이 용이합니다.",
  },
];

export const FAQS = [
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "프로젝트 규모에 따라 다릅니다. 기업 홈페이지는 3~5주, 쇼핑몰은 6~10주, 관리 시스템은 8~16주 정도 소요됩니다. 무료 상담 후 정확한 일정을 확인하실 수 있습니다.",
  },
  {
    q: "비용은 어떻게 산정되나요?",
    a: "필요 기능, 디자인 수준, 페이지 수, 개발 복잡도에 따라 견적이 달라집니다. 견적 계산기로 예상 범위를 먼저 확인하신 후 상담을 신청하시면 더 정확한 견적을 드릴 수 있습니다.",
  },
  {
    q: "제작 후 유지보수는 어떻게 되나요?",
    a: "납품 후 1개월간 무상 유지보수를 제공합니다. 이후 월정액 유지보수 계약 또는 건별 수정 작업으로 운영 지원을 드립니다.",
  },
  {
    q: "콘텐츠(텍스트, 이미지)는 직접 준비해야 하나요?",
    a: "기본적으로 고객사에서 콘텐츠를 준비해 주시지만, 콘텐츠 기획과 카피라이팅을 추가 옵션으로 지원해 드릴 수 있습니다.",
  },
  {
    q: "호스팅과 도메인도 지원하나요?",
    a: "네, 도메인 등록과 호스팅 설정까지 대행해 드립니다. Vercel 기반의 안정적인 호스팅 환경을 기본으로 제공합니다.",
  },
  {
    q: "진행 중 수정이 가능한가요?",
    a: "화면 설계 확정 전까지 방향 수정이 자유롭습니다. 개발 진입 후 범위 변경은 별도 협의가 필요할 수 있습니다.",
  },
];
