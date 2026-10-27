"use client";

import { useState } from "react";

type PetalKind = "rose" | "marigold" | "blush" | "gold";

type Petal = {
  id: number;
  kind: PetalKind;
  x: number; // 0 - 100%
  size: number;
  duration: number;
  delay: number;
  sway: number;
  variant: 1 | 2;
  depth: number; // 0 (background) or 1 (foreground)
};

export function PushpaVrishti() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [blessingCount, setBlessingCount] = useState<number>(0);
  const [isShowering, setIsShowering] = useState(false);

  const showerBlessings = () => {
    setBlessingCount((c) => c + 1);
    setIsShowering(true);

    const now = Date.now();
    const count = 38;
    const kinds: PetalKind[] = [
      "rose",
      "marigold",
      "rose",
      "marigold",
      "blush",
      "rose",
      "gold",
      "marigold",
    ];

    const batch: Petal[] = Array.from({ length: count }, (_, i) => {
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const isGold = kind === "gold";
      const size = isGold
        ? 10 + Math.floor(Math.random() * 8)
        : 18 + Math.floor(Math.random() * 14);

      return {
        id: now + i,
        kind,
        x: 3 + Math.random() * 94,
        size,
        duration: 3.4 + Math.random() * 1.8,
        delay: Math.random() * 0.75,
        sway: 20 + Math.floor(Math.random() * 28),
        variant: Math.random() > 0.5 ? 1 : 2,
        depth: Math.random() > 0.65 ? 0 : 1,
      };
    });

    setPetals((prev) => [...prev.slice(-35), ...batch]);

    setTimeout(() => {
      setIsShowering(false);
    }, 5500);
  };

  return (
    <>
      {/* Shower Petals Trigger Button */}
      <div className="flex flex-col items-center justify-center my-3">
        <button
          type="button"
          onClick={showerBlessings}
          className="group relative inline-flex items-center gap-2.5 rounded-full border border-[#d49a75]/50 bg-linear-to-b from-[#ffffff] via-[#fffbf7] to-[#fbf1ed] px-5 py-2.5 text-sm font-medium text-[#7c2433] shadow-[0_4px_18px_rgba(141,61,78,0.14)] transition-all hover:scale-105 hover:border-[#d49a75] active:scale-95 cursor-pointer"
          aria-label="Shower flower petals as blessing"
        >
          <span
            className={`text-base transition-transform duration-300 ${
              isShowering ? "scale-125 rotate-24" : "group-hover:rotate-12"
            }`}
          >
            🌸
          </span>
          <span className="font-serif tracking-wide text-[14px]">
            Shower Blessings{" "}
            <span className="opacity-75 text-xs text-[#a34b5c] font-serif">
              ॥ पुष्पवृष्टि ॥
            </span>
          </span>
        </button>
      </div>

      {/* Floating 3D Petals Layer */}
      {petals.length > 0 && (
        <div
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          aria-hidden="true"
        >
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute top-0 will-change-transform"
              style={{
                left: `${petal.x}%`,
                animation: `petalFallDown ${petal.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${petal.delay}s forwards`,
                opacity: petal.depth === 0 ? 0.8 : 0.98,
                filter:
                  petal.depth === 0
                    ? "blur(0.5px)"
                    : "drop-shadow(0 3px 6px rgba(0,0,0,0.16))",
              }}
            >
              <div
                style={{
                  "--sway": `${petal.sway}px`,
                  animation: `petalSway${petal.variant} ${
                    petal.duration * 0.9
                  }s ease-in-out infinite alternate`,
                  transformStyle: "preserve-3d",
                } as React.CSSProperties}
              >
                <PetalShape kind={petal.kind} size={petal.size} id={petal.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function PetalShape({
  kind,
  size,
  id,
}: {
  kind: PetalKind;
  size: number;
  id: number;
}) {
  if (kind === "rose") {
    // Velvety Royal Crimson Rose Petal with multi-stop radial gradient & curved edge
    return (
      <svg
        viewBox="0 0 32 38"
        width={size}
        height={Math.round(size * 1.18)}
        className="overflow-visible block"
      >
        <defs>
          <radialGradient
            id={`roseG-${id}`}
            cx="45%"
            cy="35%"
            r="65%"
            fx="40%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="35%" stopColor="#e11d48" />
            <stop offset="70%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
          <linearGradient id={`roseSheen-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#e11d48" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4c0519" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Curled organic petal silhouette */}
        <path
          d="M16 2 C23 2, 31 7, 30 18 C29 27, 21 34, 16 37 C11 34, 3 27, 2 18 C1 7, 9 2, 16 2 Z"
          fill={`url(#roseG-${id})`}
        />
        {/* Curved petal highlight & delicate fold */}
        <path
          d="M16 4 C21 5, 28 10, 27 18 C26 23, 21 29, 16 34 C12 28, 5 21, 6 14 C7 9, 11 4, 16 4 Z"
          fill={`url(#roseSheen-${id})`}
        />
        {/* Delicate inner ridge spine */}
        <path
          d="M16 7 C17 15, 17 25, 16 34"
          stroke="#fecdd3"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.45"
          fill="none"
        />
      </svg>
    );
  }

  if (kind === "marigold") {
    // Traditional Indian Wedding Genda Phool (Marigold) floret
    return (
      <svg
        viewBox="0 0 28 38"
        width={Math.round(size * 0.88)}
        height={Math.round(size * 1.2)}
        className="overflow-visible block"
      >
        <defs>
          <linearGradient id={`marigoldG-${id}`} x1="25%" y1="0%" x2="75%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        {/* Wavy fluted marigold petal */}
        <path
          d="M14 2 C18 2, 22 5, 24 10 C26 15, 25 21, 21 28 C18 33, 16 37, 14 38 C12 37, 10 33, 7 28 C3 21, 2 15, 4 10 C6 5, 10 2, 14 2 Z"
          fill={`url(#marigoldG-${id})`}
        />
        {/* Petal flute texture */}
        <path
          d="M14 5 C15.5 15, 15.5 26, 14 36"
          stroke="#fef9c3"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.55"
          fill="none"
        />
        <path
          d="M9 11 C11 18, 12 26, 13 33"
          stroke="#fed7aa"
          strokeWidth="0.6"
          opacity="0.4"
          fill="none"
        />
      </svg>
    );
  }

  if (kind === "blush") {
    // Gentle Blush / Lotus Petal
    return (
      <svg
        viewBox="0 0 30 36"
        width={Math.round(size * 0.95)}
        height={Math.round(size * 1.14)}
        className="overflow-visible block"
      >
        <defs>
          <radialGradient id={`blushG-${id}`} cx="45%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fce7f3" />
            <stop offset="75%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#be185d" />
          </radialGradient>
        </defs>
        <path
          d="M15 2 C21 4, 28 10, 27 19 C26 27, 20 32, 15 35 C10 32, 4 27, 3 19 C2 10, 9 4, 15 2 Z"
          fill={`url(#blushG-${id})`}
        />
        <path
          d="M15 6 C16 16, 16 26, 15 33"
          stroke="#ffffff"
          strokeWidth="0.75"
          opacity="0.6"
          fill="none"
        />
      </svg>
    );
  }

  // Auspicious Gold Foil Flake (Soneri Zari Confetti)
  return (
    <svg
      viewBox="0 0 20 20"
      width={Math.round(size * 0.7)}
      height={Math.round(size * 0.7)}
      className="overflow-visible block"
    >
      <defs>
        <radialGradient id={`goldG-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fde047" />
          <stop offset="85%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <polygon
        points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7"
        fill={`url(#goldG-${id})`}
        filter="drop-shadow(0 0 3px rgba(234,179,8,0.7))"
      />
    </svg>
  );
}
