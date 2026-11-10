import type { ReactNode } from "react";

type PortfolioFlow = {
  eyebrow: string;
  token: string;
  stages: readonly {
    title: string;
    detail: string;
    x: number;
    y: number;
    scene: ReactNode;
  }[];
};

const colors = {
  panel: "#102d4e",
  shadow: "#0b1d33",
  row: "#0a2039",
  edge: "#71a3c8",
  line: "#517a9d",
  text: "#c4e3f5",
  accent: "#9bedff",
};

function Panel({
  x, y, width, height, label,
}: {
  x: number; y: number; width: number; height: number; label: string;
}) {
  return (
    <g>
      <rect x={x + 5} y={y + 6} width={width} height={height} rx="10" fill={colors.shadow} stroke={colors.line} />
      <rect x={x} y={y} width={width} height={height} rx="10" fill={colors.panel} stroke={colors.edge} strokeWidth="1.4" />
      <path d={`M${x} ${y + 31}h${width}`} stroke={colors.line} />
      <Label x={x + 13} y={y + 21}>{label}</Label>
    </g>
  );
}

function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <text x={x} y={y} fill={colors.text} fontSize="13" fontWeight="650">{children}</text>;
}

function Row({
  x, y, width, children,
}: {
  x: number; y: number; width: number; children: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="25" rx="5" fill={colors.row} stroke={colors.line} />
      <Label x={x + 9} y={y + 17}>{children}</Label>
    </g>
  );
}

function Socket({ x, y }: { x: number; y: number }) {
  return (
    <rect x={x - 26} y={y - 10} width="52" height="20" rx="4"
      fill={colors.row} stroke={colors.edge} strokeDasharray="3 3" />
  );
}

function Arrow({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <path d={`M${x} ${y}h${width}m-7-5 7 5-7 5`} fill="none"
      stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  );
}

function Checks({ x, y, width, items }: { x: number; y: number; width: number; items: readonly string[] }) {
  return (
    <g>
      {items.map((item, index) => {
        const top = y + index * 33;
        return (
          <g key={item}>
            <Row x={x} y={top} width={width}>{item}</Row>
            <path d={`M${x + width - 22} ${top + 13}l4 4 7-8`} fill="none" stroke={colors.accent}
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
}

function Calendar({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="192" height="91" rx="5" fill={colors.row} stroke={colors.line} />
      <path d="M0 23h192M0 46h192M0 69h192M64 0v91M128 0v91" stroke={colors.line} />
      <path d="M20 12h24m40 0h24m40 0h24" stroke={colors.edge} strokeLinecap="round" />
    </g>
  );
}

function PlayScreen({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="120" height="70" rx="6" fill={colors.row} stroke={colors.line} />
      <circle cx="60" cy="34" r="15" fill={colors.panel} stroke={colors.edge} />
      <path d="m57 27 10 7-10 7z" fill={colors.accent} />
      <path d="M10 61h100" stroke={colors.line} />
      <path d="M10 61h36" stroke={colors.accent} strokeWidth="2" />
    </g>
  );
}

function stage(title: string, detail: string, x: number, y: number, scene: ReactNode) {
  return { title, detail, x, y, scene };
}

const portfolioFlows = new Map<string, PortfolioFlow>([
  ["medical-reservation", {
    eyebrow: "예약 시스템 · 의료",
    token: "14:00",
    stages: [
      stage("전화로 들어오는 예약을 살펴봅니다", "전화가 연결되지 않아 예약을 놓치는 상황과 노쇼가 생기는 지점을 정리합니다. 14:00 예약을 따라가며 필요한 기능을 정합니다.", 227, 99, <>
        <Panel x={66} y={41} width={220} height={137} label="전화 예약 메모" />
        <Row x={80} y={86} width={192}>예약 요청</Row>
        <Socket x={227} y={99} />
        <Row x={80} y={121} width={192}>연결 대기</Row>
        <path d="M90 160h85" stroke={colors.edge} strokeLinecap="round" />
      </>),
      stage("휴대폰에서 진료 시간을 고릅니다", "환자가 진료과와 의사를 선택하고 실시간으로 표시된 가용 시간 중 14:00을 고르는 화면을 설계합니다.", 177, 166, <>
        <Panel x={113} y={20} width={130} height={178} label="진료 예약" />
        <Row x={125} y={62} width={106}>1. 진료과 선택</Row>
        <Row x={125} y={96} width={106}>2. 의사 선택</Row>
        <Label x={134} y={140}>3. 시간 선택</Label>
        <Socket x={177} y={166} />
      </>),
      stage("예약을 저장하고 알림을 연결합니다", "예약한 14:00을 의사별 일정에 기록하고, 환자에게 예약 전 리마인더를 보낼 수 있도록 연결합니다.", 255, 108, <>
        <Panel x={29} y={57} width={120} height={94} label="온라인 접수" />
        <Row x={40} y={99} width={98}>시간 선택</Row>
        <Arrow x={151} y={112} width={39} />
        <Panel x={194} y={39} width={132} height={128} label="의사별 일정" />
        <Socket x={255} y={108} />
        <Row x={207} y={128} width={106}>리마인더</Row>
      </>),
      stage("예약 확정과 취소를 점검합니다", "출시 전에 예약이 확정되는지, 취소 시 대기자에게 예약 기회가 넘어가는지, 안내가 발송되는지 확인하는 시나리오입니다.", 247, 56, <>
        <Panel x={67} y={39} width={220} height={143} label="예약 흐름 점검" />
        <Socket x={247} y={56} />
        <Checks x={82} y={81} width={190} items={["예약 확정", "취소와 대기자 안내", "리마인더 발송"]} />
      </>),
      stage("확정된 예약을 운영 일정에 표시합니다", "관리자는 의사별 일정에서 확정된 14:00 예약과 남은 시간을 확인할 수 있습니다.", 198, 135, <>
        <Panel x={49} y={37} width={259} height={142} label="의사별 예약 현황" />
        <Calendar x={102} y={77} />
        <Label x={62} y={99}>진료</Label>
        <Label x={62} y={124}>예약</Label>
        <Socket x={198} y={135} />
      </>),
    ],
  }],
  ["brand-landing", {
    eyebrow: "랜딩페이지 · 뷰티",
    token: "구매",
    stages: [
      stage("광고를 클릭한 뒤의 이탈을 살펴봅니다", "신제품에 관심을 보인 방문자가 어디에서 이탈하는지 살피고, 구매 결정을 돕는 정보와 버튼이 빠져 있는 지점을 정리합니다.", 271, 132, <>
        <Panel x={42} y={43} width={276} height={130} label="광고 유입 경로" />
        <Row x={54} y={88} width={80}>광고 클릭</Row>
        <Arrow x={138} y={101} width={29} />
        <Row x={171} y={88} width={126}>기존 랜딩</Row>
        <path d="M234 115v17h11" fill="none" stroke={colors.line} strokeDasharray="4 3" />
        <Socket x={271} y={132} />
        <Label x={64} y={149}>구매 전 이탈</Label>
      </>),
      stage("스크롤 순서대로 구매 근거를 보여줍니다", "후기, 효과, 성분, 비교를 차례대로 읽고 구매 버튼에 도달하는 흐름을 설계합니다.", 174, 175, <>
        <Panel x={112} y={20} width={129} height={175} label="제품 랜딩" />
        <Row x={124} y={60} width={104}>후기 · 효과</Row>
        <Row x={124} y={94} width={104}>성분 · 비교</Row>
        <path d="M173 127v27m-5-6 5 6 5-6" fill="none" stroke={colors.accent} />
        <Socket x={174} y={175} />
      </>),
      stage("구매 버튼을 전환 추적에 연결합니다", "스크롤 위치에 맞춰 구매 버튼을 노출하고, 구매 전환을 GA4와 Meta Pixel에서 확인할 수 있도록 연동합니다.", 92, 128, <>
        <Panel x={31} y={54} width={124} height={106} label="구매 버튼" />
        <Socket x={92} y={128} />
        <Arrow x={159} y={128} width={36} />
        <Panel x={198} y={37} width={129} height={141} label="전환 추적" />
        <Row x={208} y={83} width={108}>GA4</Row>
        <Row x={208} y={118} width={108}>Meta Pixel</Row>
      </>),
      stage("모바일 구매 경로를 검수합니다", "페이지 로딩과 고정 버튼의 동작, 전환 이벤트 기록을 한 번의 모바일 탐색 흐름에서 확인합니다.", 266, 59, <>
        <Panel x={56} y={42} width={249} height={139} label="모바일 출시 점검" />
        <Socket x={266} y={59} />
        <Checks x={70} y={82} width={219} items={["첫 화면 로딩", "구매 버튼 이동", "전환 이벤트 기록"]} />
      </>),
      stage("구매 데이터를 다음 광고에 반영합니다", "운영자는 광고별 구매 전환율을 비교해 어떤 방문이 구매까지 이어졌는지 확인합니다.", 231, 91, <>
        <Panel x={53} y={37} width={253} height={145} label="구매 전환 리포트" />
        <path d="M69 152h143m-143 0V81" fill="none" stroke={colors.line} />
        <path d="M78 143l26-7 28 4 28-18 37-17" fill="none" stroke={colors.accent} strokeWidth="2" />
        <circle cx="197" cy="105" r="3" fill={colors.accent} />
        <Socket x={231} y={91} />
        <Label x={222} y={145}>전환율</Label>
      </>),
    ],
  }],
  ["b2b-portal", {
    eyebrow: "기업 홈페이지 · 제조업",
    token: "견적",
    stages: [
      stage("담당자에게 몰리는 요청을 정리합니다", "파트너가 재고 확인과 견적 요청을 할 때 담당자를 기다려야 하는 상황을 살펴봅니다.", 225, 130, <>
        <Panel x={54} y={40} width={250} height={138} label="파트너 요청서" />
        <Row x={68} y={81} width={222}>제품 · 요청 수량</Row>
        <Row x={68} y={118} width={222}>담당자 확인</Row>
        <Socket x={225} y={130} />
        <path d="M78 158h102" stroke={colors.line} strokeLinecap="round" />
      </>),
      stage("재고 확인에서 견적까지 연결합니다", "로그인한 파트너가 재고를 조회하고 제품과 수량을 선택해 견적을 만드는 화면을 설계합니다.", 250, 139, <>
        <Panel x={38} y={38} width={282} height={143} label="파트너 포털" />
        <Row x={52} y={83} width={112}>제품 선택</Row>
        <Row x={52} y={118} width={112}>재고 조회</Row>
        <Arrow x={168} y={130} width={26} />
        <Row x={200} y={84} width={104}>수량 입력</Row>
        <Socket x={250} y={139} />
      </>),
      stage("견적을 생성하고 발주와 연결합니다", "제품과 수량에 맞춰 견적을 자동 생성하고, 이후 같은 요청을 발주로 이어갈 수 있게 연결합니다.", 145, 128, <>
        <Panel x={30} y={50} width={146} height={112} label="견적 자동 생성" />
        <Row x={43} y={93} width={120}>제품 · 수량</Row>
        <Socket x={145} y={128} />
        <Arrow x={180} y={124} width={34} />
        <Panel x={218} y={62} width={111} height={90} label="발주 관리" />
        <Row x={229} y={107} width={88}>주문 등록</Row>
      </>),
      stage("조회 권한과 발주 흐름을 점검합니다", "파트너 로그인부터 재고 조회, 견적 생성, 발주 등록까지 순서대로 확인합니다.", 260, 57, <>
        <Panel x={58} y={40} width={245} height={142} label="파트너 기능 점검" />
        <Socket x={260} y={57} />
        <Checks x={72} y={82} width={216} items={["파트너 로그인", "재고와 견적 확인", "발주 등록"]} />
      </>),
      stage("파트너가 직접 발주를 관리합니다", "파트너는 생성한 견적을 기준으로 발주를 처리하고, 포털에서 요청과 진행 상태를 함께 확인합니다.", 199, 102, <>
        <Panel x={46} y={37} width={268} height={146} label="견적 · 발주 현황" />
        <Row x={60} y={89} width={240}>요청 품목</Row>
        <Row x={60} y={125} width={240}>진행 상태</Row>
        <Socket x={199} y={102} />
        <Label x={226} y={142}>발주 접수</Label>
      </>),
    ],
  }],
  ["fitness-saas", {
    eyebrow: "SaaS 개발 · 헬스케어",
    token: "PT 예약",
    stages: [
      stage("회원 명단과 PT 일정의 충돌을 찾습니다", "엑셀 회원 명단과 PT 일정이 따로 관리되는 상황을 정리하고, 같은 시간에 예약이 겹치는 지점을 살펴봅니다.", 250, 128, <>
        <Panel x={35} y={53} width={134} height={112} label="회원 명단" />
        <Row x={46} y={97} width={111}>등록 회원</Row>
        <Panel x={189} y={42} width={138} height={125} label="PT 일정표" />
        <Row x={201} y={84} width={113}>시간 중복</Row>
        <Socket x={250} y={128} />
      </>),
      stage("회원 화면과 PT 시간표를 설계합니다", "회원 등록 정보와 트레이너 일정을 함께 보여주고, 예약할 수 있는 시간에 PT를 등록하도록 설계합니다.", 197, 137, <>
        <Panel x={49} y={37} width={257} height={143} label="PT 스케줄" />
        <Calendar x={101} y={79} />
        <Label x={60} y={100}>회원</Label>
        <Label x={60} y={124}>일정</Label>
        <Socket x={197} y={137} />
      </>),
      stage("예약과 결제, 출석을 연동합니다", "회원의 PT 예약을 일정에 기록하고 결제 및 출석 정보를 같은 운영 화면에서 확인할 수 있게 연결합니다.", 93, 119, <>
        <Panel x={31} y={55} width={119} height={106} label="회원 일정" />
        <Socket x={93} y={119} />
        <Arrow x={155} y={119} width={36} />
        <Panel x={195} y={37} width={132} height={143} label="운영 기능" />
        <Row x={207} y={82} width={106}>Stripe 결제</Row>
        <Row x={207} y={117} width={106}>출석 기록</Row>
      </>),
      stage("일정과 결제 상태를 점검합니다", "예약 충돌이 생기는 상황과, 회원이 결제한 뒤 출석까지 기록되는 과정을 출시 전에 점검합니다.", 251, 57, <>
        <Panel x={60} y={40} width={241} height={144} label="센터 도입 점검" />
        <Socket x={251} y={57} />
        <Checks x={74} y={82} width={213} items={["시간 충돌 방지", "결제 결과 반영", "출석 기록"]} />
      </>),
      stage("센터의 오늘 일정을 한 화면에 모읍니다", "운영자는 오늘의 PT 예약과 출석 상태를 같은 화면에서 확인하고 회원 일정을 관리합니다.", 211, 104, <>
        <Panel x={45} y={36} width={269} height={147} label="오늘의 센터 운영" />
        <Row x={59} y={91} width={241}>10:00</Row>
        <Row x={59} y={126} width={241}>11:00</Row>
        <Socket x={211} y={104} />
        <Label x={248} y={108}>예정</Label>
        <Label x={248} y={143}>출석</Label>
      </>),
    ],
  }],
  ["education-platform", {
    eyebrow: "온라인 플랫폼 · 교육",
    token: "수강",
    stages: [
      stage("오프라인 강의를 온라인 과정으로 옮깁니다", "정해진 장소에서만 들을 수 있던 강의를 온라인에 제공하려면 어떤 수강 경험이 필요한지 정리합니다.", 261, 127, <>
        <Panel x={36} y={51} width={142} height={114} label="오프라인 강의" />
        <rect x="49" y="96" width="64" height="36" rx="4" fill={colors.row} stroke={colors.line} />
        <circle cx="135" cy="111" r="6" fill={colors.edge} />
        <path d="M125 132h20m-10-13v13" stroke={colors.edge} />
        <Arrow x={182} y={126} width={25} />
        <Panel x={211} y={59} width={113} height={97} label="온라인" />
        <Socket x={261} y={127} />
      </>),
      stage("강의와 진도를 한 화면에 배치합니다", "수강생이 강의를 열고, 차시 목록에서 어디까지 들었는지 확인할 수 있는 화면을 설계합니다.", 243, 144, <>
        <Panel x={44} y={37} width={270} height={143} label="강의실 화면" />
        <PlayScreen x={57} y={84} />
        <Row x={189} y={84} width={112}>차시 목록</Row>
        <Socket x={243} y={144} />
      </>),
      stage("스트리밍과 진도 기록을 연결합니다", "강의 영상을 스트리밍으로 제공하고, 수강 권한과 차시별 진도를 계정에 연결합니다.", 253, 129, <>
        <Panel x={29} y={38} width={146} height={140} label="영상 스트리밍" />
        <PlayScreen x={42} y={83} />
        <Arrow x={179} y={129} width={20} />
        <Panel x={202} y={49} width={129} height={117} label="수강생 계정" />
        <Row x={213} y={87} width={105}>진도 기록</Row>
        <Socket x={253} y={129} />
      </>),
      stage("구독부터 재생까지 점검합니다", "구독 결제 후 수강할 수 있는지, 영상이 재생되고 다음 접속에서 진도를 확인할 수 있는지 살펴봅니다.", 251, 57, <>
        <Panel x={62} y={40} width={240} height={142} label="온라인 강의 점검" />
        <Socket x={251} y={57} />
        <Checks x={76} y={82} width={212} items={["구독과 수강 권한", "강의 재생", "진도 반영"]} />
      </>),
      stage("수강생과 진도를 운영 화면에 모읍니다", "운영자는 과정별 수강생과 진행 상태를 확인하고, 수강생은 이전에 보던 차시를 찾을 수 있습니다.", 265, 106, <>
        <Panel x={47} y={36} width={263} height={145} label="과정별 운영 현황" />
        <Row x={60} y={92} width={237}>수강생 목록</Row>
        <Socket x={265} y={106} />
        <Label x={63} y={147}>차시별 진도</Label>
        <path d="M143 142h137" stroke={colors.line} strokeWidth="5" strokeLinecap="round" />
        <path d="M143 142h86" stroke={colors.accent} strokeWidth="5" strokeLinecap="round" />
      </>),
    ],
  }],
  ["restaurant-renewal", {
    eyebrow: "리뉴얼 · F&B",
    token: "예약",
    stages: [
      stage("모바일에서 예약까지 막히는 지점을 찾습니다", "구형 홈페이지를 작은 화면에서 열어 예약 버튼까지 도달하는 경로를 살펴봅니다.", 255, 133, <>
        <Panel x={41} y={47} width={166} height={114} label="기존 홈페이지" />
        <rect x="53" y="91" width="140" height="48" rx="4" fill={colors.row} stroke={colors.line} />
        <path d="M64 104h97m-97 10h86m-86 10h99" stroke={colors.line} strokeLinecap="round" />
        <Panel x={218} y={38} width={103} height={137} label="모바일" />
        <path d="M230 86h76m-76 12h89m-89 12h76" stroke={colors.line} strokeLinecap="round" />
        <Socket x={255} y={133} />
      </>),
      stage("휴대폰 첫 화면에 예약을 배치합니다", "메뉴와 매장 정보를 모바일에서 읽기 쉽게 정리하고, 방문 가능한 시간과 웨이팅 안내를 가까이 배치합니다.", 164, 146, <>
        <Panel x={105} y={18} width={140} height={184} label="매장 안내" />
        <rect x="118" y="61" width="113" height="43" rx="6" fill={colors.row} stroke={colors.line} />
        <path d="M126 91l21-18 16 13 15-9 19 14" fill="none" stroke={colors.edge} />
        <Label x={122} y={122}>가능 시간</Label>
        <Socket x={164} y={146} />
        <Row x={118} y={164} width={113}>웨이팅 안내</Row>
      </>),
      stage("실시간 예약과 웨이팅을 연결합니다", "예약 가능한 시간은 바로 선택하고, 자리가 없는 시간에는 웨이팅 정보를 확인할 수 있게 연결합니다.", 89, 112, <>
        <Panel x={29} y={56} width={120} height={97} label="방문 시간" />
        <Socket x={89} y={112} />
        <path d="M153 113h23v-20h20m-20 20v18h20" fill="none" stroke={colors.accent} strokeWidth="1.5" />
        <Panel x={199} y={39} width={129} height={134} label="좌석 상태" />
        <Row x={211} y={82} width={104}>예약 가능</Row>
        <Row x={211} y={119} width={104}>웨이팅</Row>
      </>),
      stage("모바일 접속과 현장 흐름을 검수합니다", "SNS에서 홈페이지로 들어와 시간을 조회하고, 가능한 경우 예약을 완료하거나 웨이팅을 확인하는 과정을 점검합니다.", 265, 57, <>
        <Panel x={54} y={40} width={252} height={142} label="모바일 리뉴얼 점검" />
        <Socket x={265} y={57} />
        <Checks x={68} y={82} width={224} items={["SNS에서 접속", "예약 시간 선택", "웨이팅 안내"]} />
      </>),
      stage("매장에서 예약과 웨이팅을 함께 봅니다", "직원은 확정 예약과 웨이팅을 구분해 확인하고 방문 고객을 안내합니다.", 130, 119, <>
        <Panel x={42} y={36} width={275} height={148} label="매장 운영 보드" />
        <path d="M184 68v115" stroke={colors.line} />
        <Label x={57} y={91}>확정 예약</Label>
        <Label x={197} y={91}>웨이팅</Label>
        <Row x={55} y={106} width={116}>18:30</Row>
        <Socket x={130} y={119} />
        <Row x={196} y={106} width={107}>대기 1</Row>
        <Row x={196} y={139} width={107}>대기 2</Row>
      </>),
    ],
  }],
]);

export function getPortfolioFlow(slug: string): PortfolioFlow | undefined {
  return portfolioFlows.get(slug);
}
