import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowRight, ChevronDown, Clock, Layers, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { FlowStory } from "@/components/flow/FlowStory";
import { getPortfolioFlow } from "@/components/flow/PortfolioFlowScenes";
import { getPortfolioSystemPreview, PortfolioSystemPreview } from "@/components/portfolio/PortfolioSystemPreview";
import { getPortfolioItem, PORTFOLIO_ITEMS } from "@/lib/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return { title: "페이지를 찾을 수 없습니다 | Build Flow" };
  return {
    title: `${item.title} | Build Flow 포트폴리오`,
    description: `${item.title}의 설계 배경과 사용 흐름을 살펴보고 핵심 기능을 체험하는 가상 구축 예시입니다.`,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();
  const { detail } = item;
  const flow = getPortfolioFlow(item.id);
  const systemPreview = getPortfolioSystemPreview(item.id);
  const features = detail?.features ?? item.features.map((name) => ({ name, desc: undefined }));
  const results = detail?.results ?? [item.result];
  const caseIndex = PORTFOLIO_ITEMS.indexOf(item);
  const nextCases = PORTFOLIO_ITEMS.concat(PORTFOLIO_ITEMS).slice(caseIndex + 1, caseIndex + 3);
  const overview = detail ? [
    { title: "해결해야 할 문제", description: detail.problem },
    { title: "분석과 접근 방향", description: detail.analysis },
    { title: "설계 방향", description: detail.design },
  ] : [];

  return (
    <div className="bg-gray-50 pb-20">
      <section aria-labelledby="project-title" className="flow-hero pt-21 pb-8 text-white md:pt-25 md:pb-12">
        <div className="section-container">
          <Link
            href="/portfolio"
            className="mb-4 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 md:mb-6"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            포트폴리오로 돌아가기
          </Link>

          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-10">
            <div className="min-w-0">
              <p className="flow-label mb-3">{item.category} · {item.industry}</p>
              <h1 id="project-title" className="text-3xl leading-tight font-black tracking-tight md:text-4xl xl:text-[2.75rem]">
                {item.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-slate-200 md:text-lg">{item.problem}</p>

              <dl className="mt-5 grid gap-2 border-t border-white/15 pt-4 text-sm text-slate-200">
                <div className="flex items-start gap-2">
                  <Clock size={15} className="mt-0.5 shrink-0 text-cyan-200" aria-hidden="true" />
                  <dt className="shrink-0 font-semibold">예시 제작 기간</dt>
                  <dd>{item.period}</dd>
                </div>
                <div className="flex items-start gap-2">
                  <Layers size={15} className="mt-0.5 shrink-0 text-cyan-200" aria-hidden="true" />
                  <dt className="shrink-0 font-semibold">기술 스택</dt>
                  <dd>{item.stack.join(", ")}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-slate-400">가상 시나리오 기반 데모</p>
              <div className="mt-2 flex flex-wrap gap-x-5">
                {systemPreview && (
                  <a
                    href="#system-preview"
                    className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-cyan-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                  >
                    시스템 직접 체험 <ArrowDownRight size={16} aria-hidden="true" />
                  </a>
                )}
                {detail && (
                  <a
                    href="#case-study"
                    className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-slate-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                  >
                    설계 배경 읽기 <ArrowDownRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {flow && <FlowStory {...flow} autoPlay className="min-w-0" />}
          </div>
        </div>
      </section>

      <div className="section-container">
        {systemPreview && <PortfolioSystemPreview preview={systemPreview} />}
        <div className="grid grid-cols-1 gap-6 pt-8 lg:grid-cols-3 lg:gap-8 lg:pt-10">
          <div className="lg:col-span-2 space-y-8">
            {detail && (
              <section id="case-study" aria-labelledby="case-study-title" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <p className="flow-label mb-2">설계 배경</p>
                <h2 id="case-study-title" className="text-2xl font-black tracking-tight text-slate-950">어떻게 문제를 풀었나요?</h2>
                <div className="mt-4 divide-y divide-slate-200">
                  {overview.map(({ title, description }) => (
                    <div key={title} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="mb-1.5 text-base font-bold text-slate-950">{title}</h3>
                      <p className="text-sm leading-7 text-slate-700 sm:text-base">{description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {detail && (
              <section aria-labelledby="case-journey-title">
                <h2 id="case-journey-title" className="mb-4 text-xl font-black tracking-tight text-slate-950">서비스 사용 흐름</h2>
                <ol className="divide-y divide-slate-200 border-y border-slate-200">
                  {detail.journey.map(({ title, desc }, index) => (
                    <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 py-4 sm:gap-4">
                      <span className="grid size-8 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-800" aria-hidden="true">{index + 1}</span>
                      <div>
                        <h3 className="mb-1 font-bold text-slate-900">{title}</h3>
                        <p className="text-sm leading-relaxed text-slate-700">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span aria-hidden="true" className="w-7 h-7 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xs font-black">기</span>
                핵심 기능
              </h2>
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f.name} className="flex gap-3">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{f.name}</p>
                      {f.desc && <p className="text-gray-500 text-sm">{f.desc}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {detail && (
              <section aria-labelledby="case-questions-title">
                <h2 id="case-questions-title" className="mb-4 text-xl font-black tracking-tight text-slate-950">구축 전 자주 묻는 질문</h2>
                <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                  {detail.questions.map(({ question, answer }) => (
                    <details key={question} className="group px-4 sm:px-5">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded py-3 text-sm font-bold text-slate-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 [&::-webkit-details-marker]:hidden">
                        {question}
                        <ChevronDown size={16} className="shrink-0 text-slate-500 group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <p className="pb-4 text-sm leading-relaxed text-slate-700">{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Results */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <h2 className="font-black text-green-800 mb-4">시나리오의 예시 성과</h2>
              <ul className="space-y-2">
                {results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-green-700">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Effects */}
            {detail && (
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h2 className="font-black text-blue-800 mb-4">기대 효과</h2>
                <ul className="space-y-2">
                  {detail.effects.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm text-blue-700">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white text-center">
              <p className="font-black text-base mb-2">유사 프로젝트 상담</p>
              <p className="text-blue-200 text-sm mb-4">이런 솔루션이 필요하신가요?</p>
              <Link
                href={`/contact?ref=${item.id}`}
                className="btn-outline-white text-sm w-full justify-center"
              >
                무료 상담 신청
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <section aria-labelledby="next-cases-title" className="mt-10 border-t border-slate-200 pt-7 sm:mt-12 sm:pt-9">
          <h2 id="next-cases-title" className="mb-4 text-xl font-black tracking-tight text-slate-950">다른 시스템도 둘러보세요</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {nextCases.map((nextCase) => (
              <li key={nextCase.id}>
                <Link href={`/portfolio/${nextCase.id}`} className="group flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                  <span>
                    <span className="block text-xs font-semibold text-blue-700">{nextCase.category} · {nextCase.industry}</span>
                    <span className="mt-0.5 block text-sm font-bold text-slate-900 group-hover:text-blue-700">{nextCase.title}</span>
                  </span>
                  <ArrowRight size={17} className="shrink-0 text-blue-700" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
