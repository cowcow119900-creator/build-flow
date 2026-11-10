const artOffset = "translate(20 18)";
const accent = "#9bedff";
const muted = "#6991b1";
const panel = { fill: "#102d4e", stroke: "#71a3c8", strokeWidth: 1.5 };
const shadow = { fill: "#0b1d33", stroke: "#365e87", strokeWidth: 1.25 };
const inset = { fill: "#0a2039", stroke: "#517a9d" };
const dashed = { fill: "#112c47", stroke: "#5d87a9", strokeDasharray: "4 3" };
const highlight = "#1c4c75";
const rule = { fill: "none", stroke: muted, strokeLinecap: "round" } as const;
const mark = {
  fill: "none",
  stroke: accent,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const label = {
  fill: "#d5f7ff",
  fontFamily: "ui-monospace, monospace",
  fontSize: 10,
  fontWeight: 700,
};

const planningScene = (
  <g transform={artOffset}>
    <path d="M94 23h132l26 27v110H94z" {...shadow} />
    <path d="M86 18h132l25 25v111H86z" {...panel} />
    <path d="M218 18v25h25M105 50h71m-71 14h93" {...rule} />
    <rect x="105" y="80" width="119" height="52" rx="6" {...inset} />
    <path d="M105 106h119m-69-26v52" {...rule} />
    <rect x="113" y="87" width="32" height="12" rx="3" fill={highlight} />
    <rect x="113" y="113" width="32" height="12" rx="3" fill={highlight} />
    <text x="129" y="122" textAnchor="middle" {...label}>14:00</text>
    <path d="M165 93h31m-31 26h31" {...rule} />
    <circle cx="210" cy="93" r="3" fill="#ffc39a" />
    <circle cx="210" cy="119" r="3" fill="#ffc39a" />
    <path d="M61 92h16m-8-8v16m187 27h15m-7-7v14" {...mark} />
  </g>
);

const designScene = (
  <g transform={artOffset}>
    <rect x="70" y="33" width="180" height="114" rx="9" {...dashed} />
    <path d="M79 49h161m-159 61h45m72-42h39m-39 13h29m-29 14h34" {...rule} />
    <rect x="132" y="12" width="92" height="163" rx="13" {...shadow} />
    <rect x="121" y="8" width="95" height="163" rx="13" {...panel} />
    <rect x="150" y="18" width="37" height="4" rx="2" fill={muted} />
    <path d="M134 38h42m-42 10h29" {...rule} />
    <rect x="134" y="59" width="69" height="43" rx="5" {...inset} />
    <path d="M141 72h55m-55 10h55m-55 10h55m13-28v33m14-33v33m14-33v33" opacity=".7" {...rule} />
    <rect x="134" y="111" width="32" height="16" rx="4" fill={highlight} />
    <rect x="172" y="111" width="31" height="16" rx="4" {...dashed} />
    <rect x="134" y="139" width="69" height="16" rx="5" fill={accent} />
    <path d="M159 147h19m60-31h24m-9-5 9 5-9 5" {...mark} />
  </g>
);

const developmentScene = (
  <g transform={artOffset}>
    <rect x="23" y="32" width="130" height="121" rx="8" {...panel} />
    <path d="M23 54h130" {...rule} />
    <circle cx="34" cy="44" r="2" fill={accent} />
    <circle cx="42" cy="44" r="2" fill={muted} />
    <circle cx="50" cy="44" r="2" fill={muted} />
    <path d="M39 69h37m-37 10h58m-58 36h71m-71 11h53m-53 11h30" {...rule} />
    <rect x="37" y="88" width="100" height="17" rx="4" fill={highlight} />
    <text x="45" y="100" {...label}>POST</text>
    <path d="M153 95h33m-7-5 7 5-7 5" {...mark} />
    <circle cx="168" cy="95" r="3" fill={accent} />
    <rect x="187" y="49" width="109" height="91" rx="8" {...panel} />
    <path d="M187 69h109m-96 14h81m-81 34h81m-81 11h81" {...rule} />
    <rect x="199" y="92" width="84" height="16" rx="4" fill={highlight} />
    <text x="206" y="103" {...label}>R-014</text>
    <path d="m270 100 3 3 5-6" {...mark} />
  </g>
);

const releaseScene = (
  <g transform={artOffset}>
    <rect x="69" y="28" width="183" height="130" rx="9" {...shadow} />
    <rect x="61" y="21" width="183" height="130" rx="9" {...panel} />
    <path d="M61 45h183m-169 13h55m-55 16h155m-155 26h155m-155 26h155" {...rule} />
    <circle cx="75" cy="33" r="2.5" fill={accent} />
    <circle cx="84" cy="33" r="2.5" fill={muted} />
    <text x="81" y="117" {...label}>14:00</text>
    <rect x="148" y="80" width="68" height="15" rx="4" fill={highlight} />
    <text x="161" y="91" {...label}>PASS</text>
    <path d="m202 87 3 3 6-6" {...mark} />
    <path d="M144 114h14m-4-4 4 4-4 4" {...mark} />
    <text x="171" y="118" {...label}>14:30</text>
    <rect x="204" y="132" width="65" height="28" rx="6" fill={highlight} />
    <text x="236" y="150" textAnchor="middle" {...label}>LIVE</text>
  </g>
);

const operationsScene = (
  <g transform={artOffset}>
    <rect x="38" y="31" width="246" height="130" rx="9" {...shadow} />
    <rect x="30" y="23" width="246" height="130" rx="9" {...panel} />
    <path d="M30 46h246m-205 0v107" {...rule} />
    <circle cx="42" cy="35" r="2.5" fill={accent} />
    <circle cx="51" cy="35" r="2.5" fill={muted} />
    <circle cx="60" cy="35" r="2.5" fill={muted} />
    <rect x="42" y="56" width="18" height="9" rx="2" fill={highlight} />
    <path d="M43 76h16m-16 10h16m-16 10h16" {...rule} />
    <rect x="84" y="61" width="177" height="76" rx="5" {...inset} />
    <path d="M84 78h177m-177 18h177m-177 18h177m-133-53v76m44-76v76m44-76v76" {...rule} />
    <rect x="132" y="99" width="36" height="12" rx="2" fill={accent} />
    <rect x="176" y="117" width="36" height="12" rx="2" fill={highlight} />
    <text x="194" y="126" textAnchor="middle" {...label}>14:30</text>
    <path d="M127 162h52m-28-9v9" {...rule} />
  </g>
);

export const bookingFlow = {
  token: "14:00",
  stages: [
    {
      output: "요구사항 초안",
      title: "겹치는 예약을 발견합니다",
      detail: "같은 14:00에 전화 예약이 두 건 들어옵니다. 한 시간대에는 한 건만 접수하도록 규칙을 정합니다.",
      x: 149,
      y: 111,
      scene: planningScene,
    },
    {
      output: "예약 화면 시안",
      title: "예약 규칙을 화면에 담습니다",
      detail: "고객이 휴대폰에서 14:00을 고르고 예약을 확인하는 흐름을 설계합니다.",
      x: 170,
      y: 137,
      scene: designScene,
    },
    {
      output: "중간 데모",
      title: "예약과 운영 화면을 연결합니다",
      detail: "고객이 고른 14:00을 서버로 보내고 관리자 화면에 예약 번호 R-014를 표시합니다.",
      x: 125,
      y: 114,
      scene: developmentScene,
    },
    {
      output: "검수 결과와 배포 화면",
      title: "같은 시간에 두 건이 들어오면?",
      detail: "한 건은 14:00에 확정하고, 다른 고객에게는 14:30을 안내하는지 검수합니다.",
      x: 116,
      y: 105,
      scene: releaseScene,
    },
    {
      output: "운영용 예약 달력",
      title: "설계가 운영으로 이어집니다",
      detail: "관리자는 확정된 14:00 예약과 다음 예약 가능 시간을 같은 달력에서 확인합니다.",
      x: 170,
      y: 123,
      scene: operationsScene,
    },
  ],
};
