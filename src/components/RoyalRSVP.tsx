"use client";

import { useState } from "react";

// Wedding event date-time bounds for the datetime-local input
const MIN_DATETIME = "2026-11-10T10:00"; // Haldi starts
const MAX_DATETIME = "2026-11-21T23:59"; // Reception ends

export function RoyalRSVP() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // Single datetime-local value: "YYYY-MM-DDTHH:MM"
  const [arrivalDateTime, setArrivalDateTime] = useState("2026-11-20T10:30");
  const [blessing, setBlessing] = useState("");

  // Human-readable formatted arrival for display in ticket
  const formatArrivalDisplay = (dt: string) => {
    if (!dt) return "";
    try {
      const d = new Date(dt);
      return d.toLocaleString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dt;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage("Please share your name and mobile number.");
      return;
    }
    if (!arrivalDateTime) {
      setErrorMessage("Please select your expected arrival date & time.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      arrivalDateTime,
      arrivalFormatted: formatArrivalDisplay(arrivalDateTime),
      notes: blessing.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      // 1. Server API route
      try {
        const res = await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) console.warn("API route returned non-OK status");
      } catch (err) {
        console.warn("Could not reach /api/rsvp:", err);
      }

      // 2. Direct Google Sheets Web App submission (if configured)
      const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
      if (googleSheetUrl && googleSheetUrl.startsWith("http")) {
        try {
          await fetch(googleSheetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.warn("Direct Google Sheet submission notice:", err);
        }
      }

      setSubmitted(true);
    } catch {
      setErrorMessage("Unable to submit at this moment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setArrivalDateTime("2026-11-20T10:30");
    setBlessing("");
    setErrorMessage(null);
  };

  return (
    <div className="mx-auto w-full max-w-[520px] px-1 py-3">
      <div className="relative overflow-hidden rounded-3xl border border-[#dcc49a]/60 bg-[#fdfaf5] shadow-[0_20px_50px_rgba(74,38,24,0.13)]">

        {/* ── Top ornamental gold bar ── */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#7a4908] via-[#f0c97a] via-50% to-[#7a4908]" />

        {/* ── Background ambient glows ── */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#f6e8d2]/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#eeddc8]/35 blur-2xl" />

        {/* Subtle trellis / lattice watermark */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#b37e28 0,#b37e28 1px,transparent 0,transparent 50%)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-7">

          {/* ════════════════════════════════════════════════
              STATE 1 — WAX-SEALED COVER (Closed)
          ════════════════════════════════════════════════ */}
          {!isOpen && (
            <div className="flex flex-col items-center text-center">

              {/* Botanical corner accent — top left */}
              <div className="pointer-events-none absolute left-3 top-4 opacity-25">
                <FloralSprig mirrored={false} />
              </div>
              {/* Botanical corner accent — top right */}
              <div className="pointer-events-none absolute right-3 top-4 opacity-25">
                <FloralSprig mirrored />
              </div>

              {/* Sub-heading */}
              <p className="mt-2 font-serif text-[10.5px] font-semibold tracking-[0.3em] text-[#8c653f] uppercase">
                The Wedding Of
              </p>

              {/* Couple Name */}
              <h3 className="mt-0.5 font-display text-[2rem] font-medium italic tracking-wide text-[#3b1d10] sm:text-[2.4rem]">
                Noopur{" "}
                <span className="font-serif text-[1.5rem] text-[#b37e28] sm:text-[1.8rem]">
                  &amp;
                </span>{" "}
                Ishan
              </h3>

              {/* Ornamental rule */}
              <div className="my-3 flex w-full items-center gap-2 px-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a165]/60" />
                <RoyalFleurIcon />
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a165]/60" />
              </div>

              {/* Auspicious invitation text */}
              <p className="mx-auto max-w-[28ch] font-serif text-[13px] italic leading-relaxed text-[#7a5035]">
                You are cordially invited to join our celebration.
                <br />
                Kindly confirm your attendance.
              </p>

              <p className="mt-1 font-serif text-[11px] tracking-[0.12em] text-[#9b7049]">
                ✦ &ensp;Udaipur, Nov 20–21, 2026&ensp; ✦
              </p>

              {/* Elegant open CTA */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group mt-5 flex items-center gap-2.5 rounded-full border border-[#b88726]/80 bg-gradient-to-br from-[#3d1d0f] via-[#4e2619] to-[#3d1d0f] px-8 py-3 font-serif text-[13px] font-semibold tracking-widest text-[#f5dfa0] shadow-[0_10px_26px_rgba(60,28,10,0.38)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(60,28,10,0.48)] active:scale-[0.98] cursor-pointer"
              >
                <EnvelopeOpenIcon />
                <span>Open RSVP &amp; Register</span>
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              STATE 2 — IMPERIAL REPLY FOLIO (Open / Form)
          ════════════════════════════════════════════════ */}
          {isOpen && !submitted && (
            <div>
              {/* Folio header bar */}
              <div className="flex items-center justify-between border-b border-[#e6cfa8]/70 pb-3.5">
                <div className="text-left">
                  <h3 className="font-serif text-[1.1rem] font-semibold tracking-wide text-[#3b1d10]">
                    Imperial Reply Folio
                  </h3>
                  <p className="font-serif text-[11.5px] italic text-[#9b7049]">
                    Noopur संग Ishan · Udaipur
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 rounded-full border border-[#d4bc9e]/60 bg-[#f9f2e8] px-3.5 py-1 font-serif text-[10.5px] font-bold tracking-widest text-[#7a4e29] uppercase transition-colors hover:bg-[#f0e0c8] cursor-pointer"
                >
                  Close
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-5 text-left">

                {/* ── Row: Name + Phone ── */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <FieldWrap label="Full Name" required>
                    <div className="relative">
                      <FieldIcon>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </FieldIcon>
                      <input
                        id="rsvp-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Write Full Name Here"
                        className="rsvp-input pl-9"
                      />
                    </div>
                  </FieldWrap>

                  {/* Mobile Number */}
                  <FieldWrap label="WhatsApp / Mobile" required>
                    <div className="relative">
                      <FieldIcon>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </FieldIcon>
                      <input
                        id="rsvp-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="rsvp-input pl-9"
                      />
                    </div>
                  </FieldWrap>
                </div>

                {/* ── Expected Arrival: single datetime-local picker ── */}
                <FieldWrap label="Expected Arrival — Date & Time" required hint="Pick your arrival date and time from the calendar">
                  <div className="relative">
                    {/* Calendar icon */}
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#a07040]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      id="rsvp-datetime"
                      type="datetime-local"
                      required
                      value={arrivalDateTime}
                      min={MIN_DATETIME}
                      max={MAX_DATETIME}
                      onChange={(e) => setArrivalDateTime(e.target.value)}
                      className="rsvp-input pl-9 pr-3 [color-scheme:light]"
                    />
                  </div>

                  {/* Quick-pick event chips */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[
                      { label: "Haldi 🌿", dt: "2026-11-20T10:30" },
                      { label: "Sagai 💍", dt: "2026-11-20T16:00" },
                      { label: "Sangeet 🎶", dt: "2026-11-20T19:00" },
                      { label: "Baraat 🥁", dt: "2026-11-21T09:30" },
                      { label: "Pheras 🔥", dt: "2026-11-21T11:00" },
                      { label: "Reception 🥂", dt: "2026-11-21T19:00" },
                    ].map((chip) => (
                      <button
                        key={chip.dt}
                        type="button"
                        onClick={() => setArrivalDateTime(chip.dt)}
                        className={`rounded-full border px-2.5 py-0.5 font-sans text-[11px] font-medium transition-all cursor-pointer ${
                          arrivalDateTime === chip.dt
                            ? "border-[#b37e28] bg-[#fbf0dc] text-[#6b3e0e] ring-1 ring-[#b37e28]/60"
                            : "border-[#e0cab0] bg-white text-[#7a5035] hover:bg-[#fdf5e8]"
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </FieldWrap>

                {/* ── Optional Blessing ── */}
                <FieldWrap label="A Warm Blessing for Noopur & Ishan">
                  <textarea
                    id="rsvp-notes"
                    rows={2}
                    value={blessing}
                    onChange={(e) => setBlessing(e.target.value)}
                    placeholder="Share your blessings, warm wishes, or a fond memory…"
                    className="rsvp-input resize-none p-2.5"
                  />
                </FieldWrap>

                {/* Error */}
                {errorMessage && (
                  <div className="rounded-xl border border-[#eaabab] bg-[#fdf3f3] px-3 py-2 text-center font-serif text-xs text-[#9c2828]">
                    {errorMessage}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#c59b27]/80 bg-gradient-to-br from-[#3d1d0f] via-[#4e2619] to-[#3d1d0f] py-3.5 font-serif text-[13.5px] font-semibold tracking-widest text-[#f5dfa0] shadow-[0_8px_22px_rgba(60,28,10,0.32)] transition-all hover:shadow-[0_10px_28px_rgba(60,28,10,0.44)] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sealing in Royal Registry…
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      CONFIRM ATTENDANCE
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              STATE 3 — SUCCESS CONFIRMATION
          ════════════════════════════════════════════════ */}
          {isOpen && submitted && (
            <div className="py-3 text-center">
              {/* Auspicious Sanskrit blessing */}
              <p className="font-serif text-[11px] font-semibold tracking-[0.26em] text-[#8c653f] uppercase">
                ॥ सदा सौभाग्यवती भव ॥
              </p>

              {/* Animated check ring */}
              <div className="my-4 flex justify-center">
                <div className="relative flex h-18 w-18 items-center justify-center rounded-full border-[2.5px] border-[#c49a2a] bg-gradient-to-br from-[#fae5b6] via-[#d4a359] to-[#8c5e18] shadow-[0_8px_24px_rgba(140,94,24,0.35)]">
                  <svg className="h-9 w-9 text-[#3d1d0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h3 className="font-display text-[1.75rem] font-medium italic text-[#3b1d10] sm:text-[2rem]">
                Thank You, {name}!
              </h3>

              <p className="mx-auto mt-2 max-w-[32ch] font-serif text-[13px] leading-relaxed text-[#6b4834]">
                Your gracious attendance has been sealed into the Royal Registry.
                We are overjoyed to welcome you to Udaipur!
              </p>

              {/* Summary ticket */}
              <div className="mx-auto mt-5 max-w-[300px] overflow-hidden rounded-2xl border border-[#d8be92] bg-gradient-to-b from-[#fdf8ee] to-[#f7eddb]">
                {/* Ticket header */}
                <div className="border-b border-[#e8d5b0] bg-gradient-to-r from-[#3d1d0f] to-[#4e2619] px-4 py-2.5 text-center">
                  <span className="font-serif text-[11px] font-semibold tracking-[0.2em] text-[#f5dfa0] uppercase">
                    Attendance Confirmed
                  </span>
                </div>

                {/* Ticket body */}
                <div className="space-y-2 px-4 py-3 text-left font-serif text-xs">
                  <TicketRow label="Guest" value={name} />
                  <TicketRow label="Mobile" value={phone} />
                  <TicketRow label="Arrival" value={formatArrivalDisplay(arrivalDateTime)} />
                  {blessing && <TicketRow label="Blessing" value={`"${blessing}"`} />}
                </div>

                {/* Dashed ticket tear line */}
                <div className="relative border-t border-dashed border-[#d4b87a]/60 mx-3">
                  <div className="absolute -left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#f3e6ea]" />
                  <div className="absolute -right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#f3e6ea]" />
                </div>
                <div className="px-4 py-2 text-center font-serif text-[10px] italic text-[#a08060]">
                  ✦ Noopur &amp; Ishan · Udaipur 2026 ✦
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-[#b37e28] bg-[#3d1d0f] px-5 py-2 font-serif text-xs font-semibold tracking-wider text-[#f5dfa0] shadow-sm transition-all hover:bg-[#522920] cursor-pointer"
                >
                  Close Folio
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-[#d9c4aa] bg-white px-4 py-2 font-serif text-xs font-medium text-[#7a4e29] transition-all hover:bg-[#faf4ec] cursor-pointer"
                >
                  Submit Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom ornamental gold bar ── */}
        <div className="h-1 w-full bg-gradient-to-r from-[#7a4908] via-[#f0c97a] via-50% to-[#7a4908]" />
      </div>

      {/* Global input styles for this component */}
      <style>{`
        .rsvp-input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1.5px solid #dcc4a2;
          background: #fffdf8;
          padding-top: 0.625rem;
          padding-bottom: 0.625rem;
          padding-right: 0.75rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.875rem;
          color: #3b1d10;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-shadow: 0 1px 3px rgba(120,80,20,0.06) inset;
        }
        .rsvp-input::placeholder { color: #c0a07a; }
        .rsvp-input:focus {
          border-color: #b37e28;
          box-shadow: 0 0 0 3px rgba(179,126,40,0.15);
        }
        input[type="datetime-local"].rsvp-input::-webkit-calendar-picker-indicator {
          opacity: 0.6;
          cursor: pointer;
          filter: invert(40%) sepia(60%) saturate(600%) hue-rotate(10deg);
        }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldWrap({
  label,
  required = false,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 flex items-baseline gap-1.5 font-serif text-[11px] font-bold tracking-[0.18em] text-[#7a4e29] uppercase">
        {label}
        {required && <span className="text-[#b33a3a]">*</span>}
      </label>
      {hint && (
        <p className="mb-1.5 font-serif text-[10.5px] italic text-[#a08060]">
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#a07040]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        {children}
      </svg>
    </span>
  );
}

function TicketRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="shrink-0 text-[#9b7049]">{label}:</span>
      <span className="text-right font-semibold text-[#3b1d10]">{value}</span>
    </div>
  );
}

// ─── Decorative SVG Icons ─────────────────────────────────────────────────────

function RoyalFleurIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M11 2C11 2 9.5 6 11 9.5C12.5 6 11 2 11 2Z"
        fill="#c9a165" opacity="0.8"
      />
      <path
        d="M11 20C11 20 9.5 16 11 12.5C12.5 16 11 20 11 20Z"
        fill="#c9a165" opacity="0.8"
      />
      <path
        d="M2 11C2 11 6 9.5 9.5 11C6 12.5 2 11 2 11Z"
        fill="#c9a165" opacity="0.8"
      />
      <path
        d="M20 11C20 11 16 9.5 12.5 11C16 12.5 20 11 20 11Z"
        fill="#c9a165" opacity="0.8"
      />
      <circle cx="11" cy="11" r="2" fill="#d4a359" />
    </svg>
  );
}

function EnvelopeOpenIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l9-5 9 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
      <polyline points="3,8 12,14 21,8" />
    </svg>
  );
}

function FloralSprig({ mirrored }: { mirrored: boolean }) {
  return (
    <svg
      width="72" height="80" viewBox="0 0 72 80" fill="none"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      {/* Main stem */}
      <path d="M36 72 C34 55 32 40 38 20" stroke="#b37e28" strokeWidth="1.3" strokeLinecap="round" />
      {/* Left petals */}
      <path d="M36 50 C28 44 20 46 18 40 C26 38 34 42 36 50Z" fill="#c9a165" opacity="0.55" />
      <path d="M36 38 C26 32 22 22 24 16 C30 20 34 30 36 38Z" fill="#b37e28" opacity="0.5" />
      {/* Right petals */}
      <path d="M36 44 C44 40 50 44 52 38 C44 35 38 40 36 44Z" fill="#d4b878" opacity="0.5" />
      <path d="M37 28 C45 24 50 14 48 8 C42 13 38 22 37 28Z" fill="#c9a165" opacity="0.45" />
      {/* Tip bud */}
      <circle cx="38" cy="18" r="3" fill="#d4a359" opacity="0.7" />
      <circle cx="38" cy="18" r="1.5" fill="#f0c97a" opacity="0.9" />
    </svg>
  );
}
