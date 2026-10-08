export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string; source: string }
  | { type: "callout"; title: string; text: string };

export type InsightSource = { label: string; url: string };

export type Insight = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: InsightBlock[];
  sources: InsightSource[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "landing-page-conversion",
    tag: "전환 최적화",
    title: "랜딩페이지 전환율을 높이는 5가지 설계 원칙",
    excerpt:
      "광고비를 늘리기 전에, 랜딩페이지 구조를 먼저 점검하세요. 전환율 1%를 5%로 올리면 광고비 5배 효과와 같습니다.",
    date: "2025.11.15",
    readTime: "6분",
    body: [
      {
        type: "p",
        text: "광고 성과가 나오지 않을 때 가장 먼저 떠올리는 해결책은 예산 증액입니다. 하지만 같은 광고비로 들어온 방문자가 두 배 더 문의한다면, 광고비를 두 배로 늘린 것과 같은 결과를 얻습니다. 랜딩페이지는 광고비의 효율을 결정하는 '곱셈 계수'입니다.",
      },
      {
        type: "stat",
        value: "6.6%",
        label: "전 업종 랜딩페이지 전환율 중앙값 (41,000개 페이지, 4억 6,400만 페이지뷰 분석)",
        source: "Unbounce Conversion Benchmark Report 2024",
      },
      {
        type: "p",
        text: "중앙값이 6.6%라는 것은, 절반의 랜딩페이지가 이보다 낮은 성과를 내고 있다는 뜻입니다. 아래 다섯 가지 원칙은 실제 연구 결과를 바탕으로, 전환율 차이를 만드는 구조적 요인을 정리한 것입니다.",
      },
      { type: "h", text: "1. 첫 화면에서 '무엇을, 누구에게, 왜'를 끝낸다" },
      {
        type: "p",
        text: "Nielsen Norman Group의 시선 추적 연구에 따르면 사용자는 페이지 열람 시간의 57%를 첫 화면(스크롤 전 영역)에서 보내고, 처음 두 화면까지 합치면 74%에 이릅니다. 스크롤 아래에 핵심 메시지를 숨겨두면 대부분의 방문자는 그것을 보지 못하고 떠납니다.",
      },
      {
        type: "list",
        items: [
          "헤드라인: 우리가 무엇을 하는지가 아니라, 고객이 무엇을 얻는지",
          "서브카피: 누구를 위한 서비스인지 구체적으로 (예: '병·의원 전용 예약 시스템')",
          "CTA: 다음 행동을 첫 화면 안에 하나 배치",
        ],
      },
      { type: "h", text: "2. 한 페이지에는 하나의 목표만 둔다" },
      {
        type: "p",
        text: "상담 신청, 자료 다운로드, 뉴스레터 구독, SNS 팔로우를 한 페이지에 모두 넣으면 방문자는 무엇을 해야 할지 고민하게 됩니다. 랜딩페이지의 메뉴와 외부 링크를 줄이고, 모든 버튼이 같은 행동을 가리키도록 설계하세요. 버튼이 여러 개여도 목적지는 하나여야 합니다.",
      },
      { type: "h", text: "3. 입력 항목은 '꼭 필요한 것'만 남긴다" },
      {
        type: "p",
        text: "Expedia는 예약 폼에서 선택 항목이던 '회사명' 필드 하나를 삭제한 뒤 연간 약 1,200만 달러의 이익이 늘었다고 밝혔습니다. 해당 칸을 은행 주소로 오해해 결제 정보를 잘못 입력하는 사용자가 많았기 때문입니다. 입력 항목 하나하나가 이탈 지점이 될 수 있습니다.",
      },
      {
        type: "callout",
        title: "실무 팁",
        text: "첫 문의 단계에서는 이름·연락처·문의 내용 정도만 받고, 예산이나 일정 같은 세부 정보는 상담 과정에서 확인하세요. 영업에 필요한 정보와 문의에 필요한 정보는 다릅니다.",
      },
      { type: "h", text: "4. 속도는 디자인보다 먼저다" },
      {
        type: "stat",
        value: "+32%",
        label: "페이지 로딩이 1초에서 3초로 늘어날 때 이탈 확률 증가",
        source: "Google / SOASTA Research, 2017",
      },
      {
        type: "p",
        text: "Google 의뢰로 Deloitte가 37개 브랜드의 모바일 세션 3,000만 건을 분석한 연구에서는, 모바일 사이트 속도를 0.1초 개선했을 때 리테일 전환율이 8.4%, 여행 업종 전환율이 10.1% 상승했습니다. 무거운 배경 영상과 고해상도 이미지가 오히려 전환을 깎아먹을 수 있다는 뜻입니다.",
      },
      { type: "h", text: "5. 신뢰 요소는 CTA 바로 옆에 둔다" },
      {
        type: "p",
        text: "스탠퍼드 대학교 설득기술연구소(B.J. Fogg)가 2,684명을 대상으로 진행한 웹 신뢰도 연구에서, 사이트의 신뢰도를 평가한 코멘트 중 46.1%가 '디자인과 외관'을 언급했습니다. 사람들은 내용을 읽기 전에 겉모습으로 먼저 판단합니다.",
      },
      {
        type: "p",
        text: "그래서 고객사 로고, 수치화된 성과, 실제 후기는 페이지 하단의 별도 섹션이 아니라 '결정하는 순간', 즉 CTA 버튼 근처에 배치해야 효과가 큽니다.",
      },
      {
        type: "callout",
        title: "점검 체크리스트",
        text: "① 첫 화면만 보고 무슨 서비스인지 알 수 있는가 ② 페이지의 목표가 하나인가 ③ 폼 항목이 5개 이하인가 ④ 모바일 로딩이 3초 이내인가 ⑤ CTA 옆에 신뢰 근거가 있는가",
      },
    ],
    sources: [
      {
        label: "Unbounce — What's a Good Conversion Rate? (Conversion Benchmark Report)",
        url: "https://unbounce.com/landing-page-articles/what-is-a-good-conversion-rate/",
      },
      {
        label: "Nielsen Norman Group — Scrolling and Attention",
        url: "https://www.nngroup.com/articles/scrolling-and-attention/",
      },
      {
        label: "Think with Google — Find out how you stack up to new industry benchmarks for mobile page speed",
        url: "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/",
      },
      {
        label: "web.dev — Milliseconds make millions (Deloitte)",
        url: "https://web.dev/case-studies/milliseconds-make-millions",
      },
      {
        label: "Consumer Reports WebWatch — How Do People Evaluate a Web Site's Credibility? (Stanford)",
        url: "https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility",
      },
    ],
  },
  {
    slug: "renewal-no-inquiries",
    tag: "웹 개발",
    title: "기업 홈페이지, 왜 리뉴얼 후에도 문의가 없을까?",
    excerpt:
      "예쁜 디자인은 신뢰를 줄 수 있지만, 문의를 만들어 주지 않습니다. 전환 구조가 설계되지 않은 홈페이지의 공통 문제점을 분석합니다.",
    date: "2025.10.28",
    readTime: "7분",
    body: [
      {
        type: "p",
        text: "수천만 원을 들여 홈페이지를 리뉴얼했는데, 문의 수는 그대로인 경우가 많습니다. 디자인은 확실히 좋아졌는데 왜 결과는 달라지지 않을까요? 대부분의 원인은 '보이는 것'이 아니라 '설계되지 않은 것'에 있습니다.",
      },
      {
        type: "stat",
        value: "17%",
        label: "B2B 구매자가 전체 구매 과정 중 공급업체 영업 담당자와 만나는 데 쓰는 시간의 비율",
        source: "Gartner, B2B Buying Journey",
      },
      {
        type: "p",
        text: "Gartner 조사에 따르면 B2B 구매자는 구매 과정의 대부분을 영업 담당자와 대화하지 않고 스스로 정보를 찾는 데 씁니다. 즉, 고객은 연락하기 전에 이미 홈페이지에서 '이 회사에 문의할지'를 결정합니다.",
      },
      { type: "h", text: "원인 1. 디자인은 신뢰의 입장권일 뿐, 행동의 이유가 아니다" },
      {
        type: "p",
        text: "스탠퍼드 웹 신뢰도 연구에서 사람들은 사이트 신뢰도를 판단할 때 디자인을 가장 많이 언급했습니다(코멘트의 46.1%). 낡은 디자인은 분명 신뢰를 떨어뜨립니다. 하지만 신뢰를 얻는 것과 '지금 문의해야 할 이유'를 주는 것은 별개의 문제입니다. 리뉴얼이 전자만 해결하고 후자를 놓치면 문의는 늘지 않습니다.",
      },
      { type: "h", text: "원인 2. 회사의 언어로 쓰여 있다" },
      {
        type: "p",
        text: "'고객 만족을 최우선으로', '최고의 기술력' 같은 문구는 어느 회사 홈페이지에나 있습니다. 방문자가 찾는 것은 '내 문제를 해결해 줄 수 있는가'에 대한 답입니다.",
      },
      {
        type: "list",
        items: [
          "회사 연혁·조직도보다 고객이 겪는 문제와 해결 사례를 먼저",
          "'다양한 서비스' 대신 '누구를 위한 어떤 결과'인지 구체적으로",
          "추상적 형용사 대신 숫자: 납기, 처리 건수, 개선 수치",
        ],
      },
      { type: "h", text: "원인 3. 문의까지 가는 길이 막혀 있다" },
      {
        type: "p",
        text: "Google 조사에 따르면 모바일 사이트 방문의 53%는 로딩이 3초를 넘으면 이탈합니다. 여기에 문의 버튼이 메뉴 깊숙이 숨어 있거나, 모바일에서 전화번호를 눌러도 전화가 걸리지 않거나, 문의 폼이 10개 이상의 항목을 요구한다면 관심 있던 고객도 중간에 포기합니다.",
      },
      {
        type: "callout",
        title: "지금 바로 해볼 수 있는 테스트",
        text: "스마트폰으로 우리 홈페이지에 접속해, 메인 화면에서 문의 완료까지 몇 번 탭해야 하는지 세어보세요. 3번을 넘는다면 구조를 다시 봐야 합니다.",
      },
      { type: "h", text: "원인 4. 측정하지 않으니 개선할 수 없다" },
      {
        type: "p",
        text: "많은 기업 홈페이지가 방문자 수만 확인하고, 어떤 페이지에서 이탈하는지, 어떤 버튼이 눌리는지는 추적하지 않습니다. 전환 이벤트(문의 버튼 클릭, 폼 제출, 전화 탭)를 측정하지 않으면 리뉴얼의 효과를 판단할 근거도, 다음 개선의 방향도 없습니다.",
      },
      { type: "h", text: "리뉴얼 전에 먼저 정의해야 할 것" },
      {
        type: "list",
        items: [
          "홈페이지의 단 하나의 목표 (예: 월 상담 신청 30건)",
          "주요 고객층과 그들이 사이트에서 찾는 질문 3가지",
          "문의까지의 동선과 각 단계의 측정 지표",
          "리뉴얼 전 현재 수치 (비교 기준)",
        ],
      },
      {
        type: "p",
        text: "디자인은 이 설계 위에 입혀질 때 비로소 성과로 이어집니다. 리뉴얼의 출발점은 시안이 아니라 목표와 동선이어야 합니다.",
      },
    ],
    sources: [
      {
        label: "Gartner — The B2B Buying Journey",
        url: "https://www.gartner.com/en/sales/insights/b2b-buying-journey",
      },
      {
        label: "Consumer Reports WebWatch — How Do People Evaluate a Web Site's Credibility? (Stanford)",
        url: "https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility",
      },
      {
        label: "Think with Google — Mobile page speed industry benchmarks",
        url: "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/",
      },
    ],
  },
  {
    slug: "nextjs-seo-checklist",
    tag: "SEO",
    title: "Next.js로 만드는 SEO 최적화 홈페이지의 기술 조건",
    excerpt:
      "서버사이드 렌더링, 메타 태그, 구조화 데이터, Core Web Vitals까지. 검색 상위 노출을 위한 기술 체크리스트를 정리했습니다.",
    date: "2025.10.10",
    readTime: "7분",
    body: [
      {
        type: "p",
        text: "검색 노출은 좋은 콘텐츠에서 시작하지만, 기술적 기반이 없으면 좋은 콘텐츠도 검색엔진에 제대로 전달되지 않습니다. Next.js는 이 기반을 갖추기에 유리한 프레임워크입니다. 다만 '쓰기만 하면 자동으로' 되는 것은 아닙니다.",
      },
      {
        type: "stat",
        value: "90.63%",
        label: "Google 검색에서 유입이 전혀 없는 웹페이지의 비율 (약 10억 개 페이지 분석)",
        source: "Ahrefs Search Traffic Study, 2020",
      },
      {
        type: "p",
        text: "대부분의 페이지는 검색에서 단 한 명의 방문자도 얻지 못합니다. 기술적 조건은 상위 노출을 보장하지는 않지만, 이 조건이 갖춰지지 않으면 경쟁에 참여조차 할 수 없습니다.",
      },
      { type: "h", text: "1. 서버에서 완성된 HTML을 내려준다" },
      {
        type: "p",
        text: "Google은 JavaScript를 실행해 페이지를 렌더링할 수 있지만, 공식 문서에서 렌더링이 크롤링 이후 별도 대기열에서 처리될 수 있다고 설명합니다. 다른 검색엔진과 SNS 미리보기 봇은 JavaScript를 실행하지 않는 경우도 많습니다. 핵심 콘텐츠는 서버 렌더링(SSR)이나 정적 생성(SSG)으로 HTML에 포함시키는 것이 가장 안전합니다.",
      },
      {
        type: "callout",
        title: "Next.js에서는",
        text: "App Router의 서버 컴포넌트는 기본적으로 서버에서 렌더링됩니다. 'use client'는 상호작용이 필요한 부분에만 사용하고, 본문 텍스트는 서버 컴포넌트에 두세요.",
      },
      { type: "h", text: "2. 페이지마다 고유한 메타데이터" },
      {
        type: "list",
        items: [
          "title과 description을 페이지별로 다르게 작성 (Metadata API의 metadata / generateMetadata)",
          "중복 URL이 있다면 canonical 지정",
          "Open Graph 이미지로 공유 시 클릭률 확보",
          "sitemap.ts, robots.ts로 크롤링 경로 안내",
        ],
      },
      { type: "h", text: "3. 구조화 데이터(JSON-LD)" },
      {
        type: "p",
        text: "구조화 데이터는 페이지가 '무엇에 관한 것인지'를 검색엔진에 명시적으로 알려주는 표준 형식입니다. Google은 JSON-LD 형식을 권장하며, 조건을 충족하면 FAQ, 리뷰 별점, 이벤트 정보 등이 검색 결과에 풍부한 형태(리치 결과)로 표시될 수 있습니다. 기업 홈페이지라면 Organization, LocalBusiness 스키마부터 적용하는 것을 권합니다.",
      },
      { type: "h", text: "4. Core Web Vitals 기준 충족" },
      {
        type: "p",
        text: "Google은 실제 사용자 경험을 세 가지 지표로 측정하며, 방문의 75% 이상이 아래 기준을 충족하면 '좋음'으로 평가합니다. 2024년 3월부터 반응성 지표는 FID에서 INP로 교체되었습니다.",
      },
      {
        type: "list",
        items: [
          "LCP(최대 콘텐츠 렌더링): 2.5초 이하 — next/image의 preload와 적절한 이미지 크기",
          "INP(다음 페인트까지의 상호작용): 200ms 이하 — 클라이언트 JavaScript 최소화",
          "CLS(누적 레이아웃 이동): 0.1 이하 — 이미지 크기 지정, next/font로 폰트 교체 시 흔들림 방지",
        ],
      },
      {
        type: "p",
        text: "Google은 페이지 경험이 순위에 반영되지만, 관련성 높은 콘텐츠가 더 중요한 요소라고 밝히고 있습니다. Core Web Vitals는 '이기는 조건'이라기보다 '지지 않는 조건'으로 보는 것이 정확합니다.",
      },
      { type: "h", text: "5. 결국 콘텐츠가 순위를 만든다" },
      {
        type: "p",
        text: "기술 조건을 모두 갖춘 뒤에는 고객이 실제로 검색하는 질문에 답하는 콘텐츠가 필요합니다. 서비스 페이지를 키워드별로 분리하고, 자주 받는 질문을 글로 정리하는 것만으로도 검색 유입의 기반이 만들어집니다.",
      },
      {
        type: "callout",
        title: "출시 전 체크리스트",
        text: "① 핵심 텍스트가 페이지 소스(HTML)에 있는가 ② 페이지별 title·description이 고유한가 ③ sitemap과 robots가 있는가 ④ 구조화 데이터가 Google 리치 결과 테스트를 통과하는가 ⑤ PageSpeed Insights에서 세 지표가 모두 '좋음'인가",
      },
    ],
    sources: [
      {
        label: "Google Search Central — Understand JavaScript SEO Basics",
        url: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics",
      },
      {
        label: "Google Search Central — Introduction to structured data",
        url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
      },
      {
        label: "web.dev — Web Vitals",
        url: "https://web.dev/articles/vitals",
      },
      {
        label: "Next.js Docs — Metadata and OG images",
        url: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images",
      },
      {
        label: "Ahrefs — 90.63% of Content Gets No Traffic From Google",
        url: "https://ahrefs.com/blog/search-traffic-study/",
      },
    ],
  },
  {
    slug: "saas-mvp-strategy",
    tag: "SaaS",
    title: "MVP 먼저? 풀 스택 먼저? SaaS 개발 전략 비교",
    excerpt:
      "1000만원으로 SaaS를 만들어야 한다면 무엇부터 해야 할까요? 실제 고객 피드백을 받을 수 있는 최소한의 SaaS 구조를 설명합니다.",
    date: "2025.09.22",
    readTime: "8분",
    body: [
      {
        type: "p",
        text: "SaaS를 처음 만드는 창업자에게 가장 큰 유혹은 '제대로 된 제품'을 한 번에 만드는 것입니다. 회원 등급, 관리자 대시보드, 결제, 알림, 모바일 앱까지. 하지만 데이터는 다른 방향을 가리킵니다.",
      },
      {
        type: "stat",
        value: "35%",
        label: "실패한 스타트업 창업자들이 꼽은 실패 원인 중 '시장의 필요가 없었다'는 응답 비율 (1위는 자금 소진 38%)",
        source: "CB Insights, Startup Post-Mortem Analysis",
      },
      {
        type: "p",
        text: "CB Insights가 실패한 스타트업들의 사후 분석을 정리한 결과, 자금 소진(38%)과 시장 수요 부재(35%)가 가장 많이 꼽혔습니다. CB Insights는 자금 소진이 원인이라기보다 '증상'인 경우가 많다고 지적합니다. 아무도 원하지 않는 제품을 만드느라 돈이 바닥나는 것입니다.",
      },
      { type: "h", text: "만든 기능의 대부분은 쓰이지 않는다" },
      {
        type: "stat",
        value: "80%",
        label: "평균적인 소프트웨어 제품에서 거의 또는 전혀 사용되지 않는 기능의 비율",
        source: "Pendo, Feature Adoption Report 2019",
      },
      {
        type: "p",
        text: "제품 분석 기업 Pendo가 615개 고객사의 사용 데이터를 분석한 결과, 평균적으로 기능의 80%는 거의 사용되지 않았습니다. 처음부터 모든 기능을 갖추려는 전략은 예산의 대부분을 아무도 쓰지 않을 기능에 쓰게 될 가능성이 높습니다.",
      },
      { type: "h", text: "MVP는 '작은 제품'이 아니라 '배우는 도구'다" },
      {
        type: "p",
        text: "에릭 리스는 『린 스타트업』에서 MVP를 '최소한의 노력으로 고객에 대해 검증된 학습을 최대로 얻게 해주는 버전'으로 정의했습니다. 대표적인 사례가 Dropbox입니다. Dropbox는 제품을 완성하기 전에 작동 방식을 보여주는 3분짜리 데모 영상을 공개했고, 대기자 명단이 하룻밤 사이 5,000명에서 75,000명으로 늘었습니다. 개발 전에 수요를 확인한 것입니다.",
      },
      { type: "h", text: "1,000만 원 예산이라면 이렇게 나눕니다" },
      {
        type: "list",
        items: [
          "포함: 고객의 핵심 문제를 해결하는 단 하나의 업무 흐름",
          "포함: 회원가입·로그인, 최소한의 관리자 화면",
          "포함: 사용 행동 분석(어떤 기능을 쓰고, 어디서 멈추는지)",
          "보류: 세분화된 권한 체계, 다국어, 네이티브 앱",
          "보류: 자동 결제 — 초기에는 계좌이체·수동 청구로도 충분히 검증 가능",
        ],
      },
      {
        type: "callout",
        title: "검증은 많은 사용자보다 '적절한 소수'로",
        text: "Nielsen Norman Group은 5명의 사용자 테스트만으로 사용성 문제의 약 85%를 발견할 수 있다고 설명합니다. 초기 MVP는 실제 고객 5~10명이 매주 사용하는 것을 목표로 시작해도 충분합니다.",
      },
      { type: "h", text: "그렇다면 풀 스택 먼저가 맞는 경우는?" },
      {
        type: "list",
        items: [
          "이미 계약된 고객이 있고, 요구사항이 명확하게 정의된 경우",
          "금융·의료처럼 규제상 처음부터 보안·감사 기능이 필수인 경우",
          "기존에 사용 중인 시스템을 대체하는 프로젝트인 경우",
        ],
      },
      {
        type: "p",
        text: "이 경우에도 핵심은 같습니다. '무엇을 만들까'보다 '무엇을 확인해야 하는가'를 먼저 정의하고, 그 답을 가장 빨리 얻을 수 있는 범위부터 개발하는 것입니다. MVP 이후의 확장을 고려해 데이터 구조와 아키텍처만큼은 처음부터 탄탄하게 설계하면, 검증 후 확장 비용도 크게 줄일 수 있습니다.",
      },
    ],
    sources: [
      {
        label: "CB Insights — The Top Reasons Startups Fail",
        url: "https://www.cbinsights.com/research/report/startup-failure-reasons-top/",
      },
      {
        label: "Pendo — The 2019 Feature Adoption Report",
        url: "https://www.pendo.io/resources/the-2019-feature-adoption-report/",
      },
      {
        label: "Nielsen Norman Group — Why You Only Need to Test with 5 Users",
        url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
      },
      {
        label: "Eric Ries — The Lean Startup (2011)",
        url: "https://theleanstartup.com/",
      },
    ],
  },
];
