"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { useInvitationStore } from "@/store/useInvitationStore";
import { Tx } from "./Tx";

function heartPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const x = (n: number) => (n / 100) * w;
  const y = (n: number) => (n / 90) * h;
  ctx.beginPath();
  ctx.moveTo(x(50), y(82));
  ctx.bezierCurveTo(x(20), y(62), x(6), y(46), x(6), y(30));
  ctx.bezierCurveTo(x(6), y(16), x(16), y(6), x(30), y(6));
  ctx.bezierCurveTo(x(38), y(6), x(45), y(10), x(50), y(17));
  ctx.bezierCurveTo(x(55), y(10), x(62), y(6), x(70), y(6));
  ctx.bezierCurveTo(x(84), y(6), x(94), y(16), x(94), y(30));
  ctx.bezierCurveTo(x(94), y(46), x(80), y(62), x(50), y(82));
  ctx.closePath();
}

export function ScratchHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const solidAtStart = useRef(1);
  const isDragging = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const storeReveal = useInvitationStore((state) => state.reveal);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const paint = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      heartPath(ctx, w, h);
      ctx.clip();
      const grad = ctx.createRadialGradient(
        w * 0.48,
        h * 0.38,
        w * 0.04,
        w * 0.5,
        h * 0.46,
        w * 0.52,
      );
      grad.addColorStop(0, "#f3c3d0");
      grad.addColorStop(0.42, "#d56b84");
      grad.addColorStop(1, "#9a3352");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 90; i += 1) {
        const px = Math.random() * w;
        const py = Math.random() * h;
        const radius = 0.4 + Math.random() * 1.1;
        ctx.fillStyle = `rgba(255,255,255,${0.35 + Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      solidAtStart.current = Math.max(1, countSolid(ctx, canvas));
    };

    const scratchAt = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x - rect.left, y - rect.top, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const onDown = (event: PointerEvent) => {
      isDragging.current = true;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {}
      scratchAt(event.clientX, event.clientY);
    };

    const onMove = (event: PointerEvent) => {
      if (!isDragging.current && event.buttons !== 1) return;
      scratchAt(event.clientX, event.clientY);
    };

    const onUp = (event: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {}
      const solid = countSolid(ctx, canvas);
      if (solid / solidAtStart.current < 0.6) {
        setRevealed(true);
        storeReveal();
      }
    };

    paint();
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", paint);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", paint);
    };
  }, [revealed, storeReveal]);

  return (
    <div className="relative mx-auto mt-2 aspect-10/9 w-[min(340px,86%)]">
      {/* Heart-Shaped UI Enclosing the Dates (Behind Canvas) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center select-none">
        {/* Heart shaped card with outer stroke and soft inner dashed outline */}
        <svg
          viewBox="0 0 100 90"
          className="absolute inset-0 h-full w-full drop-shadow-[0_4px_16px_rgba(141,61,78,0.1)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heartBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fdf3f5" />
            </linearGradient>
          </defs>

          {/* Main Heart Shape Body */}
          <path
            d="M50 82C20 62 6 46 6 30 6 16 16 6 30 6c8 0 15 4 20 11C55 10 62 6 70 6c14 0 24 10 24 24 0 16-14 32-44 52z"
            fill="url(#heartBgGrad)"
            stroke="#d57689"
            strokeWidth="1.5"
          />

          {/* Decorative Inner Stitched Heart */}
          <path
            d="M50 77C24 60 11 46 11 32 11 20 18 11 30 11c7 0 13 3 17 9 1 1 5 1 6 0 4-6 10-9 17-9 12 0 19 9 19 21 0 14-13 28-39 45z"
            fill="none"
            stroke="#eab2bc"
            strokeWidth="0.8"
            strokeDasharray="2.5 2.5"
            opacity="0.75"
          />
        </svg>

        {/* Dates Enclosed Inside the Heart */}
        <div className="pointer-events-none relative z-0 -mt-2.5 flex w-[72%] flex-col items-center justify-center px-3 text-center">
          <p className="mb-0.5 font-serif text-[clamp(13px,3.8cqi,16px)] font-medium tracking-wide text-[#8d3d4e]">
            <Tx item={copy.invited} />
          </p>

          <div className="my-1 flex items-center justify-center gap-1.5 text-[#c98b96]">
            <span className="h-px w-6 bg-current opacity-60" />
            <i className="text-[9px] not-italic text-[#8d3d4e]">♥</i>
            <span className="h-px w-6 bg-current opacity-60" />
          </div>

          <strong className="block font-serif text-[clamp(17px,4.8cqi,22px)] font-bold leading-snug text-[#7c2433]">
            {copy.datesLine1}
          </strong>
          <span className="mt-0.5 block font-serif text-[clamp(15px,4.2cqi,19px)] font-semibold leading-snug text-[#8d3d4e]">
            {copy.datesLine2}
          </span>
        </div>
      </div>

      {/* Original Scratch Canvas Sitting on Top */}
      <canvas
        ref={canvasRef}
        aria-label="Scratch the heart"
        className={`absolute inset-0 z-10 h-full w-full touch-none ${
          revealed
            ? "pointer-events-none opacity-0 transition-opacity duration-700"
            : "cursor-crosshair"
        }`}
      />
    </div>
  );
}

function countSolid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const { width, height } = canvas;
  if (!width || !height) return 1;
  const data = ctx.getImageData(0, 0, width, height).data;
  let solid = 0;
  for (let i = 3; i < data.length; i += 24) {
    if (data[i] > 24) solid += 1;
  }
  return solid;
}
