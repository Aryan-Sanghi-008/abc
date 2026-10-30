"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

const WEDDING = new Date("2026-11-21T11:00:00+05:30").getTime();

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

// Split a padded number into individual digit characters for flip animation
function Digit({ value, prev }: { value: string; prev: string }) {
  const changed = value !== prev;
  return (
    <span
      key={changed ? value : undefined}
      className={`inline-block tabular-nums transition-all duration-300 ${changed ? "animate-[countFlip_0.35s_ease-out_both]" : ""}`}
    >
      {value}
    </span>
  );
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  const [prev, setPrev] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => {
      const t = Date.now();
      setPrev(parts(t - 1000));
      setNow(t);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = parts(now ?? WEDDING);
  const prevLeft = prev ?? left;

  const cells = [
    { value: left.days, prevValue: prevLeft.days, label: copy.days, icon: "☀️" },
    { value: left.hours, prevValue: prevLeft.hours, label: copy.hours, icon: "🕐" },
    { value: left.minutes, prevValue: prevLeft.minutes, label: copy.minutes, icon: "⏳" },
    { value: left.seconds, prevValue: prevLeft.seconds, label: copy.seconds, icon: "✨" },
  ];

  return (
    <div className="mx-auto w-full max-w-[360px]">
      {/* Countdown Tiles Row */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cells.map((cell, i) => {
          const valStr = pad(cell.value);
          const prevStr = pad(cell.prevValue);
          const isSeconds = i === 3;

          return (
            <div
              key={cell.label}
              className="group relative rounded-2xl flex flex-col items-center overflow-hidden"
            >
              {/* Card face */}
              <div
                className={`relative w-full rounded-2xl px-1 pt-4 pb-3 text-center ${
                  isSeconds
                    ? "bg-gradient-to-br from-[#8d3d4e] to-[#6b2438] shadow-[0_8px_24px_rgba(141,61,78,0.35)]"
                    : "bg-gradient-to-br from-[#faf5f7] to-[#f3e6ea] shadow-[0_6px_18px_rgba(120,60,75,0.1)] ring-1 ring-[#e8d0d6]/60"
                }`}
              >

                {/* Number display */}
                <b
                  className={`block font-display text-[clamp(1.4rem,6cqi,2rem)] font-bold tabular-nums leading-none ${
                    isSeconds ? "text-[#fae5b6]" : "text-[#7c2433]"
                  }`}
                >
                  <Digit value={valStr[0]} prev={prevStr[0]} />
                  <Digit value={valStr[1]} prev={prevStr[1]} />
                </b>

                {/* Label */}
                <small
                  className={`mt-1.5 block font-sans text-[clamp(7px,1.6cqi,9px)] font-semibold tracking-[0.14em] uppercase ${
                    isSeconds ? "text-[#fae5b6]/80" : "text-[#a56a78]"
                  }`}
                >
                  {cell.label}
                </small>

                {/* Bottom corner dot accents */}
                <span
                  className={`absolute bottom-1.5 left-2 h-1 w-1 rounded-full opacity-40 ${
                    isSeconds ? "bg-[#fae5b6]" : "bg-[#c98b96]"
                  }`}
                />
                <span
                  className={`absolute bottom-1.5 right-2 h-1 w-1 rounded-full opacity-40 ${
                    isSeconds ? "bg-[#fae5b6]" : "bg-[#c98b96]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Separator colons between tiles */}
      <style>{`
        @keyframes countFlip {
          0%   { opacity: 0.4; transform: translateY(-6px) scale(0.9); }
          60%  { opacity: 1;   transform: translateY(1px)  scale(1.05); }
          100% { opacity: 1;   transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  );
}
