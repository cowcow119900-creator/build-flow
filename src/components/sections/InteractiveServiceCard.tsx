"use client";

import Link from "next/link";
import {
  AppWindow, Bot, CalendarCheck, ChevronRight, Layers, MousePointer2,
  RefreshCw, Settings, ShoppingCart, type LucideIcon,
} from "lucide-react";
import { trackEvent } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2: AppWindow,
  Rocket: MousePointer2,
  ShoppingCart,
  Calendar: CalendarCheck,
  LayoutDashboard: Settings,
  RefreshCw,
  Code2: Layers,
  Bot,
};

type ServiceData = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  features: readonly string[];
  priceFrom: number;
};

export default function InteractiveServiceCard({ svc }: { svc: ServiceData }) {
  const Icon = ICON_MAP[svc.icon] ?? AppWindow;

  return (
    <article className="flex h-full min-w-0 flex-col bg-white px-4 pt-5 sm:px-5 sm:pt-6">
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-blue-700">
          <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h3 className="text-base font-extrabold leading-snug text-slate-950">{svc.title}</h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">{svc.desc}</p>

      <ul className="mt-4 mb-5 grid grid-cols-2 gap-x-2 gap-y-1.5">
        {svc.features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5 text-xs leading-relaxed text-slate-700">
            <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-blue-600" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 border-t border-slate-200 py-0.5">
        <p className="py-1.5 text-xs font-semibold whitespace-nowrap text-slate-800">
          <strong className="text-lg font-extrabold tabular-nums text-blue-700">{svc.priceFrom}</strong>만원부터
        </p>
        <div className="flex items-center gap-2.5">
          <Link
            href={`/services#${svc.id}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-xs font-semibold whitespace-nowrap text-slate-700 underline-offset-4 hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => trackEvent("service_detail_view", { service: svc.id })}
          >
            자세히 보기
          </Link>
          <Link
            href={`/estimate?service=${svc.id}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-0.5 rounded-sm text-xs font-bold whitespace-nowrap text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => trackEvent("estimate_start", { service: svc.id })}
          >
            견적 계산 <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
