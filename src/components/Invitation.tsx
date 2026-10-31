"use client";

import { useEffect, useRef } from "react";
import { copy } from "@/lib/copy";
import { useInvitationStore } from "@/store/useInvitationStore";
import { AddToCalendar } from "./AddToCalendar";
import { Countdown } from "./Countdown";
import { PushpaVrishti } from "./PushpaVrishti";
import { RoyalRSVP } from "./RoyalRSVP";
import { ScratchHeart } from "./ScratchHeart";
import { setWeddingMusicPlaying } from "@/lib/weddingAudio";
import { Tx } from "./Tx";

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=SKK+Blu+Hotel+Udaipur";

const program = [
  {
    title: "Turmeric Tales",
    details: [{ label: "Haldi Ceremony", when: "Nov 20th, 2026, 10:30 AM" }],
  },
  {
    title: "The Ring Affair with a Groove",
    details: [
      { label: "Sagai", when: "Nov 20th, 2026, 4:00 PM" },
      { label: "Sangeet", when: "Nov 20th, 2026, 7:00 PM" },
    ],
  },
  {
    title: "Dhol & Dhoom",
    details: [{ label: "Baraat procession", when: "Nov 21st, 2026, 9:30 AM" }],
  },
  {
    title: "Once upon a Vow",
    details: [{ label: "Varmala & Pheras", when: "Nov 21st, 2026, 11:00 AM" }],
  },
  {
    title: "The Reception Dinner",
    details: [{ when: "Nov 21st, 2026, 7:00 PM" }],
  },
];

export function Invitation() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const soundOn = useInvitationStore((state) => state.soundOn);
  const toggleSound = useInvitationStore((state) => state.toggleSound);

  // Gate starts music on tap; mute / unmute here keeps the same shared player.
  useEffect(() => {
    setWeddingMusicPlaying(soundOn);
  }, [soundOn]);

  return (
    <div className="invite-stage animate-invite-enter">
      <div className="invite-card">
        <div ref={scrollerRef} className="h-full overflow-auto">
          <header className="relative flex h-full flex-col text-center text-[#f7f1ea]">
            <picture className="absolute inset-0 block h-full w-full">
              <source
                media="(min-width: 1100px)"
                srcSet="/images/wedding-udaipur-desktop.png"
              />
              <source
                media="(min-width: 700px) and (orientation: landscape)"
                srcSet="/images/wedding-udaipur-desktop.png"
              />
              <source
                media="(min-width: 700px)"
                srcSet="/images/wedding-udaipur-tablet.png"
              />
              <img
                src="/images/wedding-udaipur-phone.PNG"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </picture>
            <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/15 to-[#141018]/70" />
            
            {/* Wedding Couple and Parents Section with Indian Wedding Text Animations */}
            <div className="relative z-1 flex min-h-0 flex-1 flex-col items-center justify-center px-5 pt-[clamp(2.6rem,6cqh,4rem)] pb-1 [text-shadow:0_2px_16px_rgba(0,0,0,.45)]">
              {/* Auspicious Sacred Invocation */}
              <p className="animate-royal-fade-in-1 mb-1 font-serif text-[clamp(0.72rem,2cqh,0.95rem)] tracking-[0.24em] text-[#fae5b6] uppercase opacity-95">
                ॥ श्री गणेशाय नमः ॥
              </p>

              {/* Welcome text */}
              <p className="animate-royal-fade-in-2 mx-auto max-w-[min(16rem,92%)] text-[clamp(1.05rem,3.2cqh,1.8rem)] leading-snug">
                <Tx item={copy.welcome} script />
              </p>

              {/* Royal Rule with subtle expansion */}
              <div className="animate-royal-expand w-full">
                <Rule light />
              </div>

              {/* Bride: Noopur with Indian Wedding Gold Luster & fixed descender padding */}
              <h1 className="animate-royal-fade-in-3 max-w-full font-display text-[clamp(2.1rem,7.5cqh,4.4rem)] font-medium italic leading-[1.25] tracking-wide overflow-visible py-0.5">
                <span className="wedding-gold-shimmer">Noopur</span>
              </h1>

              {/* Bride's parents */}
              <p className="animate-royal-fade-in-4 mx-auto mt-1 max-w-[24ch] text-[clamp(0.74rem,1.9cqh,1.02rem)] leading-snug tracking-wider text-[#f7f1ea]/90">
                <Tx item={copy.noopurParents} />
              </p>

              {/* Ampersand with warm golden bloom */}
              <p className="animate-royal-ampersand my-1 font-display text-[clamp(1.2rem,3.2cqh,2.4rem)] italic leading-none text-[#fae5b6]">
                <span className="inline-block transform-gpu">&amp;</span>
              </p>

              {/* Groom: Ishan with Indian Wedding Gold Luster */}
              <h1 className="animate-royal-fade-in-5 max-w-full font-display text-[clamp(2.1rem,7.5cqh,4.4rem)] font-medium italic leading-[1.25] tracking-wide overflow-visible py-0.5">
                <span className="wedding-gold-shimmer">Ishan</span>
              </h1>

              {/* Groom's parents */}
              <p className="animate-royal-fade-in-6 mx-auto mt-1 max-w-[22ch] text-[clamp(0.74rem,1.9cqh,1.02rem)] leading-snug tracking-wider text-[#f7f1ea]/90">
                <Tx item={copy.ishanParents} />
              </p>
            </div>

            <button
              type="button"
              className="relative z-1 mb-3 flex shrink-0 flex-col items-center gap-0.5 border-0 bg-transparent text-xs tracking-[0.28em] text-[#efe6dc] [text-shadow:0_2px_10px_rgba(0,0,0,.45)]"
              onClick={() => {
                const scroller = scrollerRef.current;
                scroller?.scrollTo({
                  top: scroller.clientHeight * 0.92,
                  behavior: "smooth",
                });
              }}
            >
              <Tx item={copy.scroll} />
              <svg
                viewBox="0 0 24 24"
                className="h-5.5 w-5.5 animate-[bob_1.4s_ease-in-out_infinite]"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
          </header>

          <section className="bg-[#f6eef2] px-6 py-8 text-center text-[#4a3140] sm:px-8">
            <p className="mx-auto max-w-[34ch] text-[clamp(1.05rem,2.4cqh,1.25rem)] leading-relaxed">
              <Tx item={copy.blessing} />
            </p>
            {/* Interactive Flower Petals Blessing */}
            <PushpaVrishti />
          </section>

          <Panel>
            <Heading item={copy.scratch} />
            <Rule />
            <ScratchHeart />
          </Panel>

          <Panel alt>
            <Rule />
            <figure className="mx-auto mb-4 w-full max-w-85 overflow-hidden rounded-lg bg-[#ddd] shadow-[0_10px_30px_rgba(90,40,50,.12)]">
              <img
                src="/images/bouquet.png"
                alt="Bridal bouquet under a garden arch"
                className="block h-[clamp(140px,24cqh,220px)] w-full animate-[drift_14s_ease-in-out_infinite_alternate] object-cover"
              />
              <div className="relative h-1 bg-[#efe4e6]">
                <i className="absolute inset-y-0 left-0 w-[42%] bg-[#c23b45] before:absolute before:-right-1.25 before:-top-1 before:h-2.5 before:w-2.5 before:rounded-full before:bg-[#c23b45]" />
              </div>
            </figure>
            <Heading item={copy.countdown} />
            <Rule />
            <Countdown />
            {/* Save to Calendar Integration */}
            <AddToCalendar />
          </Panel>

          <Panel>
            <Icon name="clock" />
            <p className="mx-auto max-w-[22ch] text-[clamp(1.35rem,4.6cqi,1.7rem)] leading-snug text-[#8d3d4e]">
              <Tx item={copy.presence} />
            </p>
            <Rule />
            <ol className="mx-auto mt-2 w-full max-w-85 list-none p-0 text-left">
              {program.map((item, index) => (
                <Event
                  key={item.title}
                  title={item.title}
                  details={item.details}
                  last={index === program.length - 1}
                />
              ))}
            </ol>
          </Panel>

          <Panel alt>
            <Icon name="pin" />
            <Heading item={copy.venue} />
            <Rule />
            <h3 className="mb-1 text-[clamp(1.35rem,5cqi,1.7rem)] font-semibold text-[#7c2433]">
              <Tx item={copy.venueName} />
            </h3>
            <p className="mb-2 text-[clamp(1rem,3.4cqi,1.1rem)] leading-snug text-[#5c4450]">
              <Tx item={copy.venuePlace} />
            </p>
            <Palace />
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-3 block w-full max-w-70 rounded-lg bg-[#8d2c3c] px-4 py-3 font-sans text-[15px] text-white no-underline hover:bg-[#742433]"
            >
              <Tx item={copy.maps} />
            </a>
          </Panel>

          {/* Imperial RSVP Section */}
          <Panel>
            <Heading item={copy.rsvp} />
            <Rule />
            <RoyalRSVP />
          </Panel>

          <footer className="bg-[#f7eef1] px-6 pt-2 pb-12 text-center sm:px-8">
            <p className="mx-auto max-w-[16ch] text-[clamp(1.7rem,6.5cqi,2.15rem)] leading-tight text-[#8d3d4e]">
              <Tx item={copy.closing} script />
            </p>
          </footer>
        </div>

        <button
          type="button"
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute" : "Unmute"}
          onClick={toggleSound}
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-8 grid h-12 w-12 place-items-center rounded-2xl border-0 bg-[#f7eef1] text-[#6d3040] shadow-[0_4px_16px_rgba(80,40,50,.12)] sm:h-14 sm:w-14 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          {soundOn ? <Speaker /> : <Muted />}
        </button>
      </div>
    </div>
  );
}

function Heading({ item }: { item: string }) {
  return (
    <h2 className="mx-auto max-w-full px-2 text-[clamp(1.65rem,6.5cqi,2.35rem)] leading-[1.15] text-[#8d3d4e]">
      <Tx item={item} script />
    </h2>
  );
}

function Panel({
  children,
  alt = false,
}: {
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      className={`${alt ? "bg-[#f3e6ea]" : "bg-[#f7eef1]"} px-5 py-8 text-center sm:px-7`}
    >
      {children}
    </section>
  );
}

function Rule({ light = false }: { light?: boolean }) {
  const color = light ? "text-[#f3d7c2]" : "text-[#c98b96]";
  return (
    <div className={`my-2 flex items-center justify-center gap-2.5 ${color}`}>
      <span className="h-px w-18 bg-current opacity-70" />
      <i className="text-[11px] not-italic">♥</i>
      <span className="h-px w-18 bg-current opacity-70" />
    </div>
  );
}

function Event({
  title,
  details,
  last = false,
}: {
  title: string;
  details: { label?: string; when: string }[];
  last?: boolean;
}) {
  return (
    <li
      className={`relative pb-5 pl-5.5 ${last ? "border-l border-transparent pb-0" : "border-l border-[#e3c5cb]"} before:absolute before:-left-1.25 before:top-1.5 before:h-2.25 before:w-2.25 before:rounded-full before:bg-[#a33b4c]`}
    >
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="m-0 text-[clamp(1.25rem,4.8cqi,1.6rem)] leading-snug font-semibold text-[#7c2433]">
          {title}
        </h3>
      </div>
      {details.map((detail) => (
        <div key={`${detail.label ?? "when"}-${detail.when}`} className="mt-1">
          {detail.label ? (
            <p className="text-[clamp(1.08rem,3.8cqi,1.28rem)] text-[#5c4450]">
              {detail.label}
            </p>
          ) : null}
          <time className="block text-[clamp(1rem,3.5cqi,1.18rem)] text-[#7d6570]">
            {detail.when}
          </time>
        </div>
      ))}
    </li>
  );
}

function Icon({ name }: { name: "clock" | "pin" }) {
  const common = { fill: "none", stroke: "#8d3d4e", strokeWidth: 1.6 };
  return (
    <svg
      viewBox="0 0 24 24"
      className="mx-auto mb-1.5 h-7 w-7"
      aria-hidden="true"
    >
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="M12 8v5l3 2" {...common} />
        </>
      )}
      {name === "pin" && (
        <>
          <path
            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"
            {...common}
          />
          <circle cx="12" cy="10" r="2.2" {...common} />
        </>
      )}
    </svg>
  );
}

function Palace() {
  return (
    <svg
      viewBox="0 0 360 90"
      className="mx-auto my-1 h-21 w-full max-w-[320px]"
      aria-hidden="true"
    >
      <g fill="none" stroke="#c9a3a8" strokeWidth="1.4">
        <path d="M20 78h320" />
        <path d="M40 78V58h24v20M70 78V50h18v28M94 78V58h24v20" />
        <path d="M150 78V46c0-18 14-32 30-32s30 14 30 32v32" />
        <path d="M168 78V58h24v20" />
        <circle cx="180" cy="22" r="5" />
        <path d="M248 78V52c0-14 10-24 22-24s22 10 22 24v26" />
        <path d="M300 78V58h28v20" />
        <path d="M128 78V62h16v16M214 78V62h16v16" />
      </g>
    </svg>
  );
}

function Speaker() {
  return (
    <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" aria-hidden="true">
      <path d="M4 10h3l4-3v10l-4-3H4z" fill="currentColor" />
      <path
        d="M15 9.5a3.5 3.5 0 0 1 0 5M17 7.5a6 6 0 0 1 0 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function Muted() {
  return (
    <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" aria-hidden="true">
      <path d="M4 10h3l4-3v10l-4-3H4z" fill="currentColor" />
      <path
        d="M16 9l5 6M21 9l-5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
