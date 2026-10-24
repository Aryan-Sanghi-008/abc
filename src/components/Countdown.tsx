"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import { Tx } from "./Tx";

const WEDDING = new Date("2026-11-21T10:00:00+05:30").getTime();

function parts(now: number) {
  const total = Math.floor(Math.max(0, WEDDING - now) / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = parts(now ?? WEDDING);
  const cells = [
    { value: left.days, label: copy.days },
    { value: left.hours, label: copy.hours },
    { value: left.minutes, label: copy.minutes },
    { value: left.seconds, label: copy.seconds },
  ];

  return (
    <div className="mx-auto grid max-w-85 grid-cols-4 gap-2">
      {cells.map((cell) => (
        <div key={cell.label} className="rounded-2xl bg-[#f3dfe4] px-1 pb-2 pt-3">
          <b className="block text-[28px] font-semibold text-[#a56a78]">{pad(cell.value)}</b>
          <small className="font-sans text-[10px] tracking-[0.12em] text-[#b08992]">
            <Tx item={cell.label} />
          </small>
        </div>
      ))}
    </div>
  );
}
