import type { ComponentType } from "react";
import {
  FitnessSystemScreen,
  MedicalSystemScreen,
  RestaurantSystemScreen,
} from "./ReservationSystemSamples";
import {
  B2BSystemScreen,
  BrandSystemScreen,
  EducationSystemScreen,
} from "./ServiceSystemSamples";

type SystemPreview = {
  workspace: string;
  title: string;
  description: string;
  highlights: readonly string[];
  screen: ComponentType;
};

const previews = new Map<string, SystemPreview>([
  ["medical-reservation", {
    workspace: "H의원 예약 관리",
    title: "진료 일정과 예약을 한눈에",
    description: "관리자는 진료 일정에서 환자가 선택한 시간과 예약 상태를 확인합니다.",
    highlights: ["의사별 진료 일정", "14:00 예약과 알림 상태"],
    screen: MedicalSystemScreen,
  }],
  ["brand-landing", {
    workspace: "I브랜드 신제품 출시",
    title: "제품 탐색에서 구매까지",
    description: "광고에서 들어온 방문자가 제품 정보와 후기를 살펴보고 구매로 이동하는 화면입니다.",
    highlights: ["제품 소개와 리뷰", "구매로 이어지는 버튼"],
    screen: BrandSystemScreen,
  }],
  ["b2b-portal", {
    workspace: "J제조사 파트너 포털",
    title: "재고를 확인하고 견적을 작성",
    description: "파트너가 재고와 품목을 조회한 뒤 선택한 품목을 견적에 담습니다.",
    highlights: ["품목별 재고와 수량", "견적 합계와 견적서 생성"],
    screen: B2BSystemScreen,
  }],
  ["fitness-saas", {
    workspace: "K피트니스 센터 운영",
    title: "PT 일정과 출석을 한 곳에서",
    description: "센터 직원이 트레이너별 PT 예약을 확인하고 회원의 출석 상태를 관리합니다.",
    highlights: ["트레이너별 예약 일정", "회원 체크인 현황"],
    screen: FitnessSystemScreen,
  }],
  ["education-platform", {
    workspace: "L교육원 온라인 강의실",
    title: "강의를 보며 수강 진도 확인",
    description: "수강생이 강의 영상과 차시 목록을 보고 다음 학습을 이어갑니다.",
    highlights: ["강의 영상과 차시 목록", "수강 진도와 완료 표시"],
    screen: EducationSystemScreen,
  }],
  ["restaurant-renewal", {
    workspace: "M레스토랑 모바일 예약",
    title: "방문 시간을 고르고 대기 확인",
    description: "고객이 휴대폰에서 방문 인원과 예약 시간을 고르고, 마감된 시간의 대기 옵션을 확인합니다.",
    highlights: ["인원별 예약 시간 선택", "마감 시간대와 웨이팅 안내"],
    screen: RestaurantSystemScreen,
  }],
]);

export function getPortfolioSystemPreview(slug: string) {
  return previews.get(slug);
}

export function PortfolioSystemPreview({ preview }: { preview: SystemPreview }) {
  const Screen = preview.screen;

  return (
    <section
      id="system-preview"
      aria-labelledby="system-preview-title"
      className="grid scroll-mt-22 items-start gap-6 border-b border-slate-200 pt-9 pb-8 sm:pt-12 sm:pb-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:gap-10"
    >
      <div className="lg:pt-4">
        <p className="flow-label mb-2.5">시스템 화면 미리보기</p>
        <h2 id="system-preview-title" className="text-[clamp(1.45rem,3.2vw,2rem)] leading-tight font-extrabold tracking-tight text-slate-950">
          {preview.title}
        </h2>
        <p className="mt-3 max-w-96 text-sm leading-relaxed text-slate-600 sm:text-base">{preview.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700 lg:mt-5 lg:grid lg:gap-2.5">
          {preview.highlights.map((highlight) => (
            <li key={highlight} className="flex items-baseline gap-2">
              <span className="size-1.5 shrink-0 self-center rounded-full bg-blue-600" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <figure className="min-w-0">
        <div
          role="img"
          aria-label={`${preview.workspace} 예시 화면. ${preview.highlights.join(", ")}.`}
          className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-[0_14px_38px_-26px_rgba(15,36,69,0.48)] sm:rounded-2xl"
        >
          <div aria-hidden="true" className="flex min-h-10 items-center gap-2 border-b border-slate-200 bg-slate-100 px-2.5 text-xs text-slate-600 sm:min-h-11 sm:gap-3 sm:px-3.5">
            <span className="flex shrink-0 gap-1">
              <span className="size-1.5 rounded-full bg-slate-400" />
              <span className="size-1.5 rounded-full bg-slate-400" />
              <span className="size-1.5 rounded-full bg-slate-400" />
            </span>
            <span className="min-w-0 flex-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-semibold">{preview.workspace}</span>
            <span className="shrink-0 font-medium">DEMO</span>
          </div>
          <div className="@container min-w-0">
            <Screen />
          </div>
        </div>
        <figcaption className="mt-2.5 text-xs leading-relaxed text-slate-600">가상 시나리오와 예시 데이터로 구성한 화면입니다.</figcaption>
      </figure>
    </section>
  );
}
