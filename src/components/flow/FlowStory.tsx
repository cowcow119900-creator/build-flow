"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./FlowStory.module.css";

const STAGE_LABELS = ["기획", "설계", "개발", "출시", "운영"] as const;
const STAGE_INTERVAL = 2500;
const TRANSITION_LEAD = 430;

type FlowStage = {
  title: string;
  detail: string;
  output?: string;
  x: number;
  y: number;
  scene: ReactNode;
};

type FlowStoryProps = {
  stages: readonly FlowStage[];
  token: string;
  eyebrow?: string;
  autoPlay?: boolean;
  className?: string;
};

type Playback = "idle" | "playing" | "paused" | "finished";

const PLAY_LABELS: Record<Playback, string> = {
  idle: "흐름 재생",
  playing: "일시 정지",
  paused: "이어서 재생",
  finished: "다시 재생",
};

export function FlowStory({
  stages,
  token,
  eyebrow = "BUILD FLOW · 예약 시스템 예시",
  autoPlay = false,
  className,
}: FlowStoryProps) {
  const id = useId();
  const panel = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const autoplayHandled = useRef(false);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [playback, setPlayback] = useState<Playback>("idle");
  const [announcement, setAnnouncement] = useState("");
  const reducedMotion = useReducedMotion();
  const lastIndex = stages.length - 1;
  const duration = lastIndex * STAGE_INTERVAL;
  const { x, y } = stages[active];
  const tokenWidth = Math.max(38, Array.from(token).reduce(
    (width, character) => width + (character.charCodeAt(0) < 128 ? 6 : 10),
    8,
  ));

  const moveRail = useCallback((progress: number) => {
    rail.current?.style.setProperty("--flow-progress", String(progress));
  }, []);

  useEffect(() => {
    const target = panel.current;
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.intersectionRatio >= 0.4 && autoPlay && !reducedMotion && !autoplayHandled.current) {
        autoplayHandled.current = true;
        elapsed.current = -850;
        setPlayback("playing");
      }
    }, { threshold: [0, 0.4] });
    observer.observe(target);
    return () => observer.disconnect();
  }, [autoPlay, reducedMotion]);

  useEffect(() => {
    if (playback !== "playing" || !visible || reducedMotion || duration <= 0) return;

    const track = rail.current;
    let frame: number;
    let traveling = false;
    let previousTime: number | undefined;
    let previousStage = Math.min(lastIndex, Math.max(0,
      Math.floor((elapsed.current + TRANSITION_LEAD) / STAGE_INTERVAL),
    ));

    function resetClock() {
      previousTime = undefined;
    }

    function advance(now: number) {
      elapsed.current += now - (previousTime ?? now);
      previousTime = now;

      if (elapsed.current >= 0) {
        if (!traveling) {
          track?.setAttribute("data-traveling", "");
          traveling = true;
        }
        moveRail(Math.min(1, elapsed.current / duration));

        const next = Math.min(lastIndex, Math.floor((elapsed.current + TRANSITION_LEAD) / STAGE_INTERVAL));
        if (next !== previousStage) {
          previousStage = next;
          setActive(next);
        }

        if (elapsed.current >= duration) {
          setPlayback("finished");
          return;
        }
      }

      frame = requestAnimationFrame(advance);
    }

    document.addEventListener("visibilitychange", resetClock);
    frame = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frame);
      track?.removeAttribute("data-traveling");
      document.removeEventListener("visibilitychange", resetClock);
    };
  }, [duration, lastIndex, moveRail, playback, reducedMotion, visible]);

  function selectStage(index: number) {
    autoplayHandled.current = true;
    rail.current?.removeAttribute("data-traveling");
    setPlayback("idle");
    setActive(index);
    moveRail(lastIndex > 0 ? index / lastIndex : 0);
    setAnnouncement(`${STAGE_LABELS[index]}. ${stages[index].title}. ${stages[index].detail}`);
  }

  function togglePlayback() {
    autoplayHandled.current = true;
    setAnnouncement("");
    if (playback === "playing") {
      setPlayback("paused");
      return;
    }

    if (playback !== "paused") {
      elapsed.current = active > 0 ? -950 : 0;
      setActive(0);
      moveRail(0);
    }
    setPlayback("playing");
  }

  return (
    <section ref={panel} className={[styles.story, className].filter(Boolean).join(" ")} aria-labelledby={`${id}-heading`}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.heading} id={`${id}-heading`}>설계의 흐름</h2>
        </div>
        <button type="button" className={styles.play} onClick={togglePlayback}>{PLAY_LABELS[playback]}</button>
      </div>

      <div className={styles.scene}>
        <svg className={styles.art} viewBox="0 0 360 220" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${id}-ribbon`} x1="0" x2="1">
              <stop stopColor="#3375ac" />
              <stop offset="0.54" stopColor="#85ebf9" />
              <stop offset="1" stopColor="#537de5" />
            </linearGradient>
            {stages.map(({ scene }, index) => (
              <symbol key={STAGE_LABELS[index]} id={`${id}-scene-${index}`} viewBox="0 0 360 220">{scene}</symbol>
            ))}
          </defs>
          <path
            d="M22 146H62C82 146 83 163 102 163H230C268 163 258 77 295 77H338"
            fill="none"
            stroke={`url(#${id}-ribbon)`}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.43"
          />
          {stages.map((_, index) => (
            <use key={STAGE_LABELS[index]} className={styles.layer} data-active={active === index} href={`#${id}-scene-${index}`} width="360" height="220" />
          ))}
          <g className={styles.token} style={{ transform: `translate(${x}px, ${y}px)` }}>
            <rect x={-tokenWidth / 2} y="-8" width={tokenWidth} height="16" rx="4" />
            <text x="0" y="0.5" dominantBaseline="middle" textAnchor="middle">{token}</text>
          </g>
        </svg>

        <div className={styles.captions}>
          {stages.map(({ output, title, detail }, index) => (
            <div key={STAGE_LABELS[index]} className={styles.caption} data-active={active === index} aria-hidden={active !== index}>
              <p className={styles.output}>{output ?? STAGE_LABELS[index]}</p>
              <h3>{title}</h3>
              <p className={styles.detail}>{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.timeline} aria-label="제작 단계 선택" role="group">
        <div ref={rail} className={styles.rail} aria-hidden="true">
          <span className={styles.progress} />
          <span className={styles.signal} />
        </div>
        <ol className={styles.steps}>
          {stages.map((_, index) => (
            <li key={STAGE_LABELS[index]}>
              <button
                type="button"
                className={styles.step}
                aria-current={active === index ? "step" : undefined}
                onClick={() => selectStage(index)}
              >
                <svg viewBox="0 0 360 220" aria-hidden="true" focusable="false">
                  <use href={`#${id}-scene-${index}`} width="360" height="220" />
                </svg>
                {STAGE_LABELS[index]}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <p className="sr-only" role="status">{announcement}</p>
      <noscript>
        <details className={styles.transcript}>
          <summary>전체 제작 단계 읽기</summary>
          <ol>
            {stages.map(({ title, detail }, index) => (
              <li key={STAGE_LABELS[index]}><strong>{STAGE_LABELS[index]} · {title}</strong><p>{detail}</p></li>
            ))}
          </ol>
        </details>
      </noscript>
    </section>
  );
}
