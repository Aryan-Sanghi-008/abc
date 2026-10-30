"use client";

import { useEffect, useState } from "react";
import { GateOpening } from "@/components/GateOpening";
import { Invitation } from "@/components/Invitation";

const SESSION_KEY = "wedding_gate_opened";

export default function Page() {
  // null = still checking sessionStorage (avoid flash), true/false = decided
  const [showInvite, setShowInvite] = useState<boolean | null>(null);

  useEffect(() => {
    // sessionStorage lives only for the current tab session.
    // A page refresh keeps the value; opening a new tab starts fresh.
    const alreadyOpened = sessionStorage.getItem(SESSION_KEY) === "1";
    setShowInvite(alreadyOpened);
  }, []);

  const handleGateComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowInvite(true);
  };

  // Avoid rendering anything until we know which screen to show (prevents flash).
  if (showInvite === null) return null;

  return (
    <>
      {!showInvite && <GateOpening onComplete={handleGateComplete} />}
      {/* Only mount Invitation after gate completes so entry animations
          (animate-royal-fade-in-*, etc.) fire fresh when they become visible. */}
      {showInvite && <Invitation />}
    </>
  );
}