"use client";

import { CalendarDays, Clock3, Dumbbell, Stethoscope, Users } from "lucide-react";
import { useId, useState } from "react";

const demoSelect = "mt-1 min-h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:bg-slate-100";
const demoButton = "min-h-11 rounded-md px-3 py-2 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 disabled:cursor-not-allowed disabled:opacity-55";
const demoResetButton = "min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700";

const clinicDays = [
  { date: "9", label: "월" },
  { date: "10", label: "화" },
  { date: "11", label: "수" },
] as const;

const clinicSchedule = [
  { time: "13:30", slots: ["진료 중", "예약 가능", "재진"] },
  { time: "14:00", slots: ["재진", "온라인 초진", "예약 가능"] },
  { time: "14:30", slots: ["예약 가능", "예약 가능", "온라인 초진"] },
] as const;

export function MedicalSystemScreen() {
  const [dayIndex, setDayIndex] = useState(1);
  const [time, setTime] = useState("13:30");
  const [reservation, setReservation] = useState<{ dayIndex: number; time: string } | null>(null);
  const availableTimes = clinicSchedule.filter(({ slots }) => slots[dayIndex] === "예약 가능");

  function changeDay(nextDay: number) {
    setDayIndex(nextDay);
    const firstAvailableTime = clinicSchedule.find(({ slots }) => slots[nextDay] === "예약 가능");
    setTime(firstAvailableTime?.time ?? "");
  }

  function resetReservation() {
    changeDay(1);
    setReservation(null);
  }

  return (
    <div className="@container bg-slate-50 text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-slate-200 bg-white px-3 py-2.5 @md:px-5">
        <p className="flex items-center gap-2 text-sm font-bold">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-700">
            <Stethoscope size={15} aria-hidden="true" />
          </span>
          H의원 예약 관리
        </p>
        <p className="text-xs text-slate-600">의료진용</p>
      </div>

      <div className="p-3 @md:p-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
          <div>
            <p className="text-xs font-medium text-slate-600">내과 · 담당의 A</p>
            <p className="mt-0.5 text-base font-bold @md:text-lg">11월 9일 – 11일</p>
          </div>
          <p className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
            <CalendarDays size={13} aria-hidden="true" />
            의사별 일정
          </p>
        </div>

        <table className="w-full table-fixed overflow-hidden rounded-lg border-collapse bg-white text-xs ring-1 ring-slate-200">
          <caption className="sr-only">11월 9일부터 11일까지 담당의 A 예약 일정</caption>
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" className="w-12 px-1 py-2 font-medium @md:w-16">시간</th>
              {clinicDays.map(({ date, label }, index) => (
                <th scope="col" key={date} className={`border-l border-slate-200 px-1 py-2 font-semibold ${index === dayIndex ? "bg-blue-50 text-blue-800" : ""}`}>
                  {date}일 {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clinicSchedule.map(({ time, slots }) => (
              <tr key={time} className="border-t border-slate-200">
                <th scope="row" className="px-1 py-2 text-center font-medium text-slate-600 tabular-nums">{time}</th>
                {slots.map((slot, index) => {
                  const confirmed = time === "14:00" && index === 1;
                  const newReservation = reservation?.time === time && reservation.dayIndex === index;
                  return (
                    <td key={clinicDays[index].date} className="border-l border-slate-200 p-1 @md:p-1.5">
                      <div className={`flex min-h-8 items-center justify-center rounded px-1 py-1 text-center leading-tight ${confirmed || newReservation ? "bg-blue-700 font-bold text-white" : slot === "예약 가능" ? "text-slate-600" : "bg-slate-100 font-medium text-slate-700"}`}>
                        {newReservation ? "예약 확정" : slot}{confirmed ? <span className="sr-only"> · 확정</span> : null}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-l-2 border-blue-700 bg-blue-50 px-2.5 py-2 text-xs leading-relaxed text-blue-950">
          <p><strong className="font-bold">14:00 예약 확정</strong> <span className="text-blue-900">· 온라인 초진</span></p>
          <p className="text-blue-900">리마인더 발송 예정</p>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="min-w-0 text-xs font-semibold text-slate-700">
              예약 날짜
              <select className={demoSelect} value={dayIndex} onChange={(event) => changeDay(Number(event.target.value))} disabled={reservation !== null}>
                {clinicDays.map(({ date, label }, index) => <option key={date} value={index}>11월 {date}일 ({label})</option>)}
              </select>
            </label>
            <label className="min-w-0 text-xs font-semibold text-slate-700">
              예약 시간
              <select className={demoSelect} value={time} onChange={(event) => setTime(event.target.value)} disabled={reservation !== null}>
                {availableTimes.map((slot) => <option key={slot.time}>{slot.time}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className={`${demoButton} bg-blue-700 hover:bg-blue-800`} disabled={reservation !== null} onClick={() => setReservation({ dayIndex, time })}>예약 확정</button>
            <button type="button" className={demoResetButton} onClick={resetReservation}>초기화</button>
          </div>
          <p role="status" className="mt-2 min-h-5 text-xs font-medium leading-relaxed text-blue-900">
            {reservation
              ? `11월 ${clinicDays[reservation.dayIndex].date}일 ${reservation.time} 예약이 확정되었습니다.`
              : "빈 시간대를 선택해 진료 일정을 등록해 보세요."}
          </p>
        </div>
      </div>
    </div>
  );
}

const fitnessSessions = [
  { time: "10:00", member: "회원 A", trainer: "트레이너 A", status: "출석 완료" },
  { time: "11:00", member: "회원 B", trainer: "트레이너 B", status: "예약 확정" },
  { time: "12:30", member: "회원 C", trainer: "트레이너 A", status: "예약 확정" },
] as const;

export function FitnessSystemScreen() {
  const [selection, setSelection] = useState<string>("11:00");
  const [checkIns, setCheckIns] = useState<string[]>([]);
  const pendingSessions = fitnessSessions.filter(({ time, status }) => status === "예약 확정" && !checkIns.includes(time));
  const selectedSession = pendingSessions.find(({ time }) => time === selection) ?? pendingSessions[0];
  const lastCheckIn = fitnessSessions.find(({ time }) => time === checkIns.at(-1));

  return (
    <div className="@container bg-white text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 px-3 py-2.5 text-slate-100 @md:px-5">
        <p className="flex items-center gap-2 text-sm font-extrabold tracking-wide">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-emerald-300 text-slate-950">
            <Dumbbell size={15} aria-hidden="true" />
          </span>
          K FITNESS
        </p>
        <p className="text-xs text-slate-300">센터 운영 · 본점</p>
      </div>

      <div className="p-3 @md:p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-1">
          <p className="text-base font-bold @md:text-lg">오늘의 PT 일정</p>
          <p className="text-xs font-medium text-slate-600">11월 10일 화요일</p>
        </div>

        <div className="grid gap-3 @lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
          <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
            {fitnessSessions.map(({ time, member, trainer, status }) => {
              const attended = status === "출석 완료" || checkIns.includes(time);
              return (
                <li key={time} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-2.5 py-2.5 @md:px-3">
                  <span className="text-sm font-bold tabular-nums">{time}</span>
                  <p className="text-xs leading-snug text-slate-700">
                    <strong className="block font-semibold text-slate-900">{member}</strong>
                    {trainer}
                  </p>
                  <span className={`rounded-full px-2 py-1 text-center text-xs font-semibold leading-tight ${attended ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700"}`}>
                    {attended ? "출석 완료" : status}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="grid grid-cols-2 gap-2 rounded-lg bg-emerald-50 p-2.5 text-slate-800 @lg:grid-cols-1 @lg:content-center @lg:p-3">
            <p className="flex items-start gap-2 text-xs leading-snug">
              <Users size={15} className="shrink-0 text-emerald-800" aria-hidden="true" />
              <span><strong className="block font-semibold text-slate-900">오늘 출석</strong>{checkIns.length + 1}명 체크인</span>
            </p>
            <p className="flex items-start gap-2 text-xs leading-snug">
              <Clock3 size={15} className="shrink-0 text-emerald-800" aria-hidden="true" />
              <span>
                <strong className="block font-semibold text-slate-900">다음 수업</strong>
                {pendingSessions[0] ? `${pendingSessions[0].time} · ${pendingSessions[0].member}` : "남은 일정 없음"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-3">
          <label className="block text-xs font-semibold text-slate-700">
            PT 일정 선택
            <select className={demoSelect} value={selectedSession?.time ?? ""} onChange={(event) => setSelection(event.target.value)} disabled={!selectedSession}>
              {pendingSessions.length === 0 ? <option value="">남은 일정 없음</option> : pendingSessions.map(({ time, member }) => (
                <option key={time} value={time}>{time} · {member}</option>
              ))}
            </select>
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className={`${demoButton} bg-emerald-800 hover:bg-emerald-900`} disabled={!selectedSession} onClick={() => {
              if (selectedSession) setCheckIns((previous) => [...previous, selectedSession.time]);
            }}>출석 처리</button>
            <button type="button" className={demoResetButton} onClick={() => {
              setSelection("11:00");
              setCheckIns([]);
            }}>초기화</button>
          </div>
          <p role="status" className="mt-2 min-h-5 text-xs font-medium leading-relaxed text-emerald-900">
            {lastCheckIn ? `${lastCheckIn.time} ${lastCheckIn.member} 출석을 처리했습니다.` : "PT 일정을 선택해 회원의 출석을 기록해 보세요."}
          </p>
        </div>
      </div>
    </div>
  );
}

const diningTimes = [
  { time: "17:30", label: "예약 가능" },
  { time: "18:30", label: "예약 가능" },
  { time: "19:30", label: "웨이팅" },
] as const;

export function RestaurantSystemScreen() {
  const radioName = useId();
  const [partySize, setPartySize] = useState("2");
  const [selectedTime, setSelectedTime] = useState<(typeof diningTimes)[number]["time"]>("18:30");
  const [confirmed, setConfirmed] = useState(false);
  const waiting = selectedTime === "19:30";

  return (
    <div className="@container bg-[#fbf8f0] text-stone-900">
      <div className="grid @lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="relative isolate flex min-h-34 flex-col justify-between overflow-hidden bg-[#26332a] p-4 text-[#fff5dd] @lg:p-5">
          <svg viewBox="0 0 180 180" className="pointer-events-none absolute -right-5 -bottom-11 -z-10 size-45 @lg:-right-14 @lg:-bottom-9 @lg:size-55" aria-hidden="true">
            <circle cx="95" cy="94" r="75" fill="#c7b392" />
            <circle cx="95" cy="94" r="64" fill="#f1dfbb" stroke="#e6cea8" strokeWidth="2" />
            <circle cx="95" cy="94" r="53" fill="#e1c8a0" opacity=".65" />
            <path fill="#a8774f" d="M64 105c4-9 13-11 12-21-2-13 14-15 22-13 8 2 8 8 17 10 15 4 22 13 17 24-5 10-17 12-27 13-13 1-21 8-33 3-6-2-10-9-8-16Z" />
            <path fill="#7d8a55" d="M74 112c-2-15 17-36 34-32 17 4 11 25-8 32-8 3-17 5-26 0Z" />
            <path d="M79 109c11-10 17-17 29-24m-18 13-1-12m8 6 14 2" stroke="#d6d097" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="118" cy="104" r="5" fill="#ac663f" />
            <circle cx="82" cy="91" r="4" fill="#dfb76d" />
            <circle cx="103" cy="116" r="4" fill="#dfb76d" />
          </svg>
          <p className="text-xs font-semibold tracking-[0.15em]">M RESTAURANT</p>
          <p className="mt-4 max-w-[10ch] text-xl leading-tight font-bold @lg:text-2xl">테이블 예약</p>
        </div>

        <div className="min-w-0 p-3 @md:p-5">
          <p className="mb-2 text-xs font-semibold text-stone-700">11월 10일 화요일</p>
          <label className="mb-3 block text-xs font-semibold text-stone-700">
            방문 인원
            <select className={demoSelect} value={partySize} onChange={(event) => setPartySize(event.target.value)} disabled={confirmed}>
              {[1, 2, 3, 4].map((count) => <option key={count} value={count}>성인 {count}명</option>)}
            </select>
          </label>
          <fieldset className="min-w-0" disabled={confirmed}>
            <legend className="mb-2 text-sm font-bold">방문 시간 선택</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {diningTimes.map(({ time, label }) => (
                <label key={time} className="min-w-0 cursor-pointer has-disabled:cursor-default">
                  <input type="radio" name={radioName} value={time} checked={time === selectedTime} onChange={() => setSelectedTime(time)} aria-label={`${time} ${label}`} className="peer sr-only" />
                  <span className="flex min-h-11 flex-col items-center justify-center rounded-md border border-stone-300 bg-white px-1 py-2 text-center text-xs leading-tight text-stone-700 peer-checked:border-[#394737] peer-checked:bg-[#394737] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-stone-800">
                    <strong className="block text-sm font-bold tabular-nums">{time}</strong>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-stone-300 pt-2 text-xs text-stone-700">
            <p className="flex items-center gap-1.5 font-semibold"><Clock3 size={13} aria-hidden="true" />19:30 웨이팅</p>
            <p>예상 대기 15분</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={`${demoButton} bg-[#394737] hover:bg-[#26332a]`} disabled={confirmed} onClick={() => setConfirmed(true)}>{waiting ? "웨이팅 등록" : "예약 확정"}</button>
            <button type="button" className={demoResetButton} onClick={() => {
              setPartySize("2");
              setSelectedTime("18:30");
              setConfirmed(false);
            }}>초기화</button>
          </div>
          <p role="status" className="mt-2 min-h-5 text-xs font-medium leading-relaxed text-stone-800">
            {confirmed
              ? `${selectedTime} 성인 ${partySize}명 ${waiting ? "웨이팅을 등록했습니다. 예상 대기 15분입니다." : "예약이 확정되었습니다."}`
              : "인원과 시간을 선택해 방문을 등록해 보세요."}
          </p>
        </div>
      </div>
    </div>
  );
}
