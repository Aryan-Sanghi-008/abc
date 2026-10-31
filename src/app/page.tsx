"use client";

import { useEffect, useState } from "react";
import { GateOpening } from "@/components/GateOpening";
import { Invitation } from "@/components/Invitation";

const SESSION_KEY = "wedding_gate_opened";

export default function Page() {
  // null = still reading sessionStorage
  const [ready, setReady] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(SESSION_KEY) === "1";
    if (alreadyOpened) {
      setShowInvite(true);
      setShowGate(false);
    }
    setReady(true);
  }, []);

  const handleReveal = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowInvite(true);
  };

  const handleGateComplete = () => {
    setShowGate(false);
  };

  if (!ready) return null;

  return (
    <>
      {showInvite ? <Invitation /> : null}
      {showGate ? (
        <GateOpening onReveal={handleReveal} onComplete={handleGateComplete} />
      ) : null}
    </>
  );
}
