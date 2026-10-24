"use client";

import { useEffect, useState } from "react";

const FRAME_COUNT = 64;
const FRAME_MS = 50;

function frameSrc(index: number) {
  return `/envelope/f${String(index).padStart(3, "0")}.jpg`;
}

export function Envelope({
  opening,
  onOpen,
  onFinished,
}: {
  opening: boolean;
  onOpen: () => void;
  onFinished: () => void;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i += 1) {
      const image = new Image();
      image.src = frameSrc(i);
    }
  }, []);

  useEffect(() => {
    if (!opening) return;
    setFrame(1);
    let current = 1;
    const id = window.setInterval(() => {
      current += 1;
      if (current > FRAME_COUNT) {
        window.clearInterval(id);
        return;
      }
      setFrame(current);
    }, FRAME_MS);
    const done = window.setTimeout(onFinished, FRAME_COUNT * FRAME_MS + 280);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(done);
    };
  }, [opening, onFinished]);

  const src = frame === 0 ? "/envelope/closed.jpg" : frameSrc(frame);

  return (
    <button
      type="button"
      className="envelope-film"
      onClick={onOpen}
      disabled={opening}
      aria-label="Tap to open"
    >
      <img src={src} alt="" className={frame > 56 ? "is-dissolving" : ""} draggable={false} />
    </button>
  );
}
