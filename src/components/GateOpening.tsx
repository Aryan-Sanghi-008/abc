"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInvitationStore } from "@/store/useInvitationStore";

type Phase = "tap" | "playing" | "done";

interface GateOpeningProps {
  onComplete: () => void;
}

export function GateOpening({ onComplete }: GateOpeningProps) {
  const [phase, setPhase] = useState<Phase>("tap");
  const videoRef = useRef<HTMLVideoElement>(null);
  const initAudio = useInvitationStore((s) => s.initAudio);

  const handleTap = useCallback(() => {
    if (phase !== "tap") return;

    // The tap is a real user gesture — unlock audio in store (starts music).
    initAudio();

    setPhase("playing");
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Video failed — go straight to invite.
        setPhase("done");
        onComplete();
      });
    }
  }, [phase, initAudio, onComplete]);

  const handleVideoEnd = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  return (
    <div
      className="gate-root"
      onClick={handleTap}
      onTouchStart={handleTap}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        // Light peach / baby-pink background
        background: "#fdf0f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: phase === "tap" ? "pointer" : "default",
      }}
    >
      {/* Soft radial gradient wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, #fce8ef 0%, #faebd7 55%, #fdf0f3 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle floral / lattice pattern overlay */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 600"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.22,
          pointerEvents: "none",
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect x="36" y="36" width="828" height="528" rx="6" fill="none" stroke="#c9a96e" strokeWidth="1" />
        <rect x="56" y="56" width="788" height="488" rx="3" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
        {/* Corner ornaments */}
        <path d="M36 100 Q60 80 80 60" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        <path d="M864 100 Q840 80 820 60" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        <path d="M36 500 Q60 520 80 540" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        <path d="M864 500 Q840 520 820 540" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        {/* Centre divider */}
        <line x1="60" y1="300" x2="870" y2="300" stroke="#c9a96e" strokeWidth="0.35" strokeDasharray="4 6" />
        <circle cx="450" cy="300" r="10" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        <circle cx="450" cy="300" r="3.5" fill="#c9a96e" opacity="0.5" />
      </svg>

      {/* ─── Video (portrait phone ratio, centred / pillar-boxed on desktop) ─── */}
      <video
        ref={videoRef}
        src="/media/our-wedding-card-opening.mp4"
        playsInline
        muted
        preload="auto"
        onEnded={handleVideoEnd}
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(100vw, calc(100vh * 9 / 16))",
          maxWidth: "480px",
          height: "100%",
          objectFit: "cover",
          display: phase === "playing" || phase === "done" ? "block" : "none",
        }}
      />

      {/* ─── "Tap to Open" frosted card ─── */}
      {phase === "tap" && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.4rem",
            padding: "2.2rem 2.4rem",
            textAlign: "center",
            // Frosted peach card
            background: "rgba(253, 240, 243, 0.60)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderRadius: "2rem",
            border: "1px solid rgba(201,169,110,0.30)",
            boxShadow:
              "0 4px 32px rgba(180,100,120,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
            maxWidth: "min(90vw, 380px)",
          }}
        >
          {/* Infinity / floral motif */}
          <svg viewBox="0 0 80 36" width="72" aria-hidden="true">
            <path
              d="M40 18 C40 8 54 2 62 10 C70 18 62 30 52 26 C44 22 40 18 40 18 C40 18 36 14 28 10 C18 6 10 18 18 26 C26 34 40 28 40 18Z"
              fill="none"
              stroke="#b36b7a"
              strokeWidth="1.4"
            />
            <circle cx="40" cy="18" r="2" fill="#c9a96e" />
          </svg>

          {/* Sanskrit invocation */}
          <p
            style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontSize: "clamp(0.72rem, 2.4vw, 0.85rem)",
              color: "#b36b7a",
              letterSpacing: "0.18em",
              margin: 0,
              opacity: 0.85,
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </p>

          {/* Couple names */}
          <p
            style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 6.5vw, 2.1rem)",
              color: "#7c2d3e",
              letterSpacing: "0.04em",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Noopur &amp; Ishan
          </p>

          <p
            style={{
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              fontSize: "clamp(0.7rem, 2.6vw, 0.82rem)",
              color: "#9c6070",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            request the honour of your presence
          </p>

          {/* Thin rule */}
          <div
            style={{
              width: "60%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #c9a96e55, transparent)",
            }}
          />

          {/* Pulsing CTA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.55rem",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "2px solid rgba(179,107,122,0.55)",
                background: "rgba(253,240,243,0.7)",
                display: "grid",
                placeItems: "center",
                animation: "gate-pulse 1.8s ease-in-out infinite",
                boxShadow: "0 0 0 0 rgba(179,107,122,0.3)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                fill="none"
                stroke="#b36b7a"
                strokeWidth="1.6"
              >
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-sans, system-ui, sans-serif)",
                fontSize: "clamp(0.78rem, 2.8vw, 0.9rem)",
                color: "#9c6070",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Tap to Open Invitation
            </span>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes gate-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(179,107,122,0.3); }
          50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(179,107,122,0); }
        }
      `}</style>
    </div>
  );
}

