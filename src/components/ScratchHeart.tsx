"use client";

import { useEffect, useRef } from "react";
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
  const revealed = useInvitationStore((state) => state.revealed);
  const reveal = useInvitationStore((state) => state.reveal);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
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
      ctx.arc(x - rect.left, y - rect.top, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const onDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      scratchAt(event.clientX, event.clientY);
    };
    const onMove = (event: PointerEvent) => {
      if (event.buttons !== 1) return;
      scratchAt(event.clientX, event.clientY);
    };
    const onUp = () => {
      if (countSolid(ctx, canvas) / solidAtStart.current < 0.46) reveal();
    };

    paint();
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    window.addEventListener("resize", paint);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", paint);
    };
  }, [reveal, revealed]);

  return (
    <div className="relative mx-auto mt-2 aspect-10/9 w-[min(340px,86%)]">
      <div className="heart-mask absolute inset-0 grid place-items-center bg-[#f7eef1]">
        <p className="mt-1 w-[62%] text-center text-[clamp(15px,3.6cqi,18px)] leading-snug text-[#7c2433]">
          <Tx item={copy.invited} />
          <strong className="mt-1.5 block text-[clamp(17px,4.4cqi,22px)] leading-tight">
            {copy.datesFirst}
            <br />
            {copy.datesSecond}
          </strong>
        </p>
      </div>
      <canvas
        ref={canvasRef}
        aria-label="Scratch the heart"
        className={`absolute inset-0 h-full w-full touch-none ${revealed ? "pointer-events-none opacity-0 transition-opacity duration-700" : "cursor-crosshair"}`}
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
