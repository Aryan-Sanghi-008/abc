"use client";

import { useEffect, useRef } from "react";
import { copy } from "@/lib/copy";
import { useInvitationStore } from "@/store/useInvitationStore";
import { Countdown } from "./Countdown";
import { Envelope } from "./Envelope";
import { ScratchHeart } from "./ScratchHeart";
import { Tx } from "./Tx";

const MAPS = "https://www.google.com/maps/search/?api=1&query=Udaipur+Rajasthan";

export function Invitation() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sealed = useInvitationStore((state) => state.sealed);
  const opening = useInvitationStore((state) => state.opening);
  const soundOn = useInvitationStore((state) => state.soundOn);
  const sent = useInvitationStore((state) => state.sent);
  const beginOpen = useInvitationStore((state) => state.beginOpen);
  const finishOpen = useInvitationStore((state) => state.finishOpen);
  const toggleSound = useInvitationStore((state) => state.toggleSound);
  const markSent = useInvitationStore((state) => state.markSent);

  useEffect(() => {
    if (!soundOn) return;
    const ctx = new AudioContext();
    const notes = [392, 494, 587, 659, 587, 494, 440, 392];
    let step = 0;
    const id = window.setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const time = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.value = notes[step % notes.length];
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.08, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 1.2);
      step += 1;
    }, 680);
    return () => {
      window.clearInterval(id);
      void ctx.close();
    };
  }, [soundOn]);

  return (
    <div className="flex min-h-dvh justify-center bg-[#243028] md:py-6">
      <div className="relative h-dvh w-full max-w-107.5 overflow-hidden bg-[#f7eef1] shadow-[0_24px_80px_rgba(0,0,0,.35)] md:h-[min(920px,calc(100dvh-48px))] md:rounded-[28px]">
        <div ref={scrollerRef} className={`h-full ${sealed ? "overflow-hidden" : "overflow-auto"}`}>
          <header className="relative flex min-h-dvh items-center justify-center text-center text-[#f7f1ea] md:min-h-[min(920px,calc(100dvh-48px))]">
            <img src="/images/hero-palace.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/15 to-[#141018]/70" />
            <div className="relative z-1 px-7 pb-[12vh] pt-[18vh] [text-shadow:0_2px_16px_rgba(0,0,0,.35)]">
              <p className="mx-auto max-w-70 text-[28px] leading-snug">
                <Tx item={copy.welcome} script />
              </p>
              <Rule light />
              <h1 className="font-script text-[78px] font-normal leading-none">Ishan</h1>
              <p className="mt-1.5 text-base leading-snug tracking-wide">
                <Tx item={copy.degree} />
              </p>
              <p className="my-1.5 font-script text-4xl">&amp;</p>
              <h1 className="font-script text-[78px] font-normal leading-none">Noopur</h1>
              <p className="mt-1.5 text-base leading-snug tracking-wide">
                <Tx item={copy.degree} />
              </p>
            </div>
            <button
              type="button"
              className="absolute bottom-7 left-1/2 z-1 flex -translate-x-1/2 flex-col items-center gap-0.5 border-0 bg-transparent text-xs tracking-[0.28em] text-[#efe6dc]"
              onClick={() => scrollerRef.current?.scrollTo({ top: window.innerHeight * 0.82, behavior: "smooth" })}
            >
              <Tx item={copy.scroll} />
              <svg viewBox="0 0 24 24" className="h-5.5 w-5.5 animate-[bob_1.4s_ease-in-out_infinite]" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="absolute bottom-22 right-4 z-1 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-[#d4af70]/80 bg-black/25 font-script text-[22px] leading-none text-[#e7d2a4]">
              <span>I</span>
              <span className="text-[11px]">&amp;</span>
              <span>N</span>
            </div>
          </header>

          <section className="relative mt-[-18vh] bg-linear-to-b from-transparent from-0% via-[#1a1520] via-22% to-[#f6eef2] to-78% px-8 pb-7 pt-[22vh] text-center text-[#f4ece6]">
            <p className="mx-auto max-w-[320px] text-lg leading-relaxed">
              <Tx item={copy.blessing} />
            </p>
            <p className="mt-6 text-[#8d3d4e]">
              <Tx item={copy.blessed} script className="text-[26px]" />
            </p>
          </section>

          <Panel>
            <Heading item={copy.scratch} />
            <Rule />
            <ScratchHeart />
          </Panel>

          <Panel alt>
            <Rule />
            <figure className="mx-auto mb-4 w-full max-w-85 overflow-hidden rounded-lg bg-[#ddd] shadow-[0_10px_30px_rgba(90,40,50,.12)]">
              <img src="/images/bouquet.png" alt="Bridal bouquet under a garden arch" className="block h-47.5 w-full animate-[drift_14s_ease-in-out_infinite_alternate] object-cover" />
              <div className="relative h-1 bg-[#efe4e6]">
                <i className="absolute inset-y-0 left-0 w-[42%] bg-[#c23b45] before:absolute before:-right-1.25 before:-top-1 before:h-2.5 before:w-2.5 before:rounded-full before:bg-[#c23b45]" />
              </div>
            </figure>
            <Heading item={copy.countdown} />
            <Rule />
            <Countdown />
          </Panel>

          <Panel>
            <Icon name="clock" />
            <Heading item={copy.timeline} />
            <ol className="mx-auto mt-2 max-w-[320px] list-none p-0 text-left">
              <Event title={copy.arrival} when="Nov 21, 2026, 10:00 AM" note={copy.welcomeYou} />
              <Event title={copy.ceremony} when="Nov 21, 2026, 10:30 AM" note={copy.presence} />
              <Event title={copy.reception} when="Nov 24, 2026, 7:30 PM" note={copy.receptionNote} last />
            </ol>
          </Panel>

          <Panel alt>
            <Icon name="pin" />
            <Heading item={copy.venue} />
            <Rule />
            <h3 className="mb-1 text-[26px] font-semibold text-[#7c2433]">Udaipur</h3>
            <p className="mb-2 text-[17px] leading-snug text-[#5c4450]">Rajasthan</p>
            <Palace />
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mx-auto mt-3 block w-full max-w-70 rounded-lg bg-[#8d2c3c] px-4 py-3 font-sans text-[15px] text-white no-underline hover:bg-[#742433]">
              <Tx item={copy.maps} />
            </a>
          </Panel>

          <Panel>
            <Icon name="shirt" />
            <Heading item={copy.dress} />
            <Rule />
            <h3 className="mt-4 text-[22px] font-semibold text-[#7c2433]"><Tx item={copy.women} /></h3>
            <p className="text-[17px] text-[#5c4450]"><Tx item={copy.womenNote} /></p>
            <h3 className="mt-4 text-[22px] font-semibold text-[#7c2433]"><Tx item={copy.men} /></h3>
            <p className="text-[17px] text-[#5c4450]"><Tx item={copy.menNote} /></p>
          </Panel>

          <Panel alt>
            <Icon name="spark" />
            <Heading item={copy.prewedding} />
            <Rule />
            <EventBlock title="Mahendi" when="Nov 19, 2026, 9:30 PM" note={copy.bride} />
            <EventBlock title="Haldi" when="Nov 20, 2026, 8:30 PM" note={copy.groom} />
            <EventBlock title="Sangeet" when="Nov 20, 2026, 9:00 PM" note={copy.palace} />
          </Panel>

          <Panel>
            <Icon name="car" />
            <Heading item={copy.transport} />
            <Rule />
            <p className="text-[17px] leading-snug text-[#5c4450]"><Tx item={copy.shuttle} /></p>
          </Panel>

          <Panel alt>
            <Icon name="hotel" />
            <Heading item={copy.stay} />
            <Rule />
            <p className="text-[17px] leading-snug text-[#5c4450]"><Tx item={copy.rates} /></p>
          </Panel>

          <Panel>
            <Icon name="gift" />
            <Heading item={copy.gifts} />
            <Rule />
            <p className="text-[17px] leading-snug text-[#5c4450]"><Tx item={copy.giftNote} /></p>
          </Panel>

          <Panel alt>
            <Icon name="mail" />
            <Heading item={copy.message} />
            <Rule />
            <form
              className="mx-auto max-w-[320px] text-left"
              onSubmit={(event) => {
                event.preventDefault();
                markSent();
                event.currentTarget.reset();
              }}
            >
              <Field label={copy.name} placeholder={copy.namePh} name="name" required />
              <Field label={copy.email} placeholder="you@example.com" name="email" type="email" required />
              <label className="mb-3 block text-base text-[#7c2433]">
                <Tx item={copy.attending} />
                <select name="attending" required className="mt-1 w-full border-0 border-b border-[#e0cfd4] bg-transparent px-0.5 py-2 outline-none focus:border-[#7c2433]">
                  <option value="">{copy.select}</option>
                  <option value="yes">{copy.yes}</option>
                  <option value="no">{copy.no}</option>
                </select>
              </label>
              <Field label={copy.yourMessage} placeholder={copy.wishes} name="message" multiline />
              <button type="submit" className="mx-auto mt-3 block w-full max-w-70 rounded-lg border-0 bg-[#8d2c3c] px-4 py-3 font-sans text-[15px] text-white hover:bg-[#742433]">
                <Tx item={copy.send} />
              </button>
              {sent ? <p className="mt-3 text-center text-[#7c2433]"><Tx item={copy.thanks} /></p> : null}
            </form>
          </Panel>

          <footer className="bg-[#f7eef1] px-6 pb-24 pt-2.5 text-center">
            <Wave />
            <p><Tx item={copy.celebrate} script className="text-4xl text-[#8d3d4e]" /></p>
            <p className="mt-2 font-script text-[32px] text-[#7c2433]">Ishan &amp; Noopur</p>
            <Wave flip />
            <p className="font-sans text-[13px] leading-normal text-[#9a7c84]">
              <strong className="block font-script text-[22px] font-normal text-[#8d3d4e]">Ishan &amp; Noopur</strong>
              <Tx item={copy.brand} />
            </p>
          </footer>
        </div>

        {sealed ? <Envelope opening={opening} onOpen={beginOpen} onFinished={finishOpen} /> : null}

        <button
          type="button"
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute" : "Unmute"}
          onClick={toggleSound}
          className="absolute right-2.5 top-2.5 z-8 grid h-11 w-11 place-items-center rounded-xl border-0 bg-white text-[#6d3040] shadow-[0_4px_16px_rgba(80,40,50,.12)]"
        >
          {soundOn ? <Speaker /> : <Muted />}
        </button>
      </div>
    </div>
  );
}

function Heading({ item }: { item: string }) {
  return (
    <h2 className="mx-auto max-w-[18ch] text-[clamp(32px,8.4vw,40px)] leading-tight text-[#8d3d4e]">
      <Tx item={item} script />
    </h2>
  );
}

function Panel({ children, alt = false }: { children: React.ReactNode; alt?: boolean }) {
  return <section className={`${alt ? "bg-[#f3e6ea]" : "bg-[#f7eef1]"} px-7 py-8 text-center`}>{children}</section>;
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
  when,
  note,
  last = false,
}: {
  title: string;
  when: string;
  note: string;
  last?: boolean;
}) {
  return (
    <li className={`relative pb-5 pl-5.5 ${last ? "border-l border-transparent pb-0" : "border-l border-[#e3c5cb]"} before:absolute before:-left-1.25 before:top-1.5 before:h-2.25 before:w-2.25 before:rounded-full before:bg-[#a33b4c]`}>
      <h3 className="m-0 text-xl font-semibold text-[#7c2433]"><Tx item={title} /></h3>
      <time className="block text-[15px] text-[#7d6570]">{when}</time>
      <p className="mt-1 text-[17px] text-[#5c4450]"><Tx item={note} /></p>
    </li>
  );
}

function EventBlock({ title, when, note }: { title: string; when: string; note: string }) {
  return (
    <article className="mb-4">
      <h3 className="mb-0 text-[22px] font-semibold text-[#7c2433]">{title}</h3>
      <time className="block text-[15px] text-[#7d6570]">{when}</time>
      <p className="mt-0.5 text-[17px] text-[#5c4450]"><Tx item={note} /></p>
    </article>
  );
}

function Field({
  label,
  placeholder,
  name,
  type = "text",
  required = false,
  multiline = false,
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const field = "mt-1 w-full border-0 border-b border-[#e0cfd4] bg-transparent px-0.5 py-2 outline-none focus:border-[#7c2433]";
  return (
    <label className="mb-3 block text-base text-[#7c2433]">
      <Tx item={label} />
      {multiline ? (
        <textarea name={name} rows={3} placeholder={placeholder} className={field} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={field} />
      )}
    </label>
  );
}

function Icon({ name }: { name: "clock" | "pin" | "shirt" | "spark" | "car" | "hotel" | "gift" | "mail" }) {
  const common = { fill: "none", stroke: "#8d3d4e", strokeWidth: 1.6 };
  return (
    <svg viewBox="0 0 24 24" className="mx-auto mb-1.5 h-7 w-7" aria-hidden="true">
      {name === "clock" && (<><circle cx="12" cy="12" r="8" {...common} /><path d="M12 8v5l3 2" {...common} /></>)}
      {name === "pin" && (<><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" {...common} /><circle cx="12" cy="10" r="2.2" {...common} /></>)}
      {name === "shirt" && <path d="M8 6l4 2 4-2 4 3-2 3v10H6V12L4 9z" {...common} />}
      {name === "spark" && <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" {...common} />}
      {name === "car" && (<><path d="M4 14l2-5h12l2 5M5 14h14v4H5z" {...common} /><circle cx="7.5" cy="18" r="1.3" {...common} /><circle cx="16.5" cy="18" r="1.3" {...common} /></>)}
      {name === "hotel" && <path d="M4 20V8h7v12M11 20V4h9v16M7 11h2M7 14h2M14 8h2M14 11h2M14 14h2" {...common} />}
      {name === "gift" && (<><rect x="4" y="10" width="16" height="10" rx="1" {...common} /><path d="M4 10h16M12 10v10M12 10c-2 0-4-1.2-4-3s2-2 4 3c2-5 4-3 4-3s0 3-4 3z" {...common} /></>)}
      {name === "mail" && (<><rect x="3" y="6" width="18" height="12" rx="1.5" {...common} /><path d="M4 7l8 7 8-7" {...common} /></>)}
    </svg>
  );
}

function Palace() {
  return (
    <svg viewBox="0 0 360 90" className="mx-auto my-1 h-21 w-full max-w-[320px]" aria-hidden="true">
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

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`mx-auto my-2.5 h-7 w-70 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 28%22 fill=%22none%22 stroke=%22%23d7aeb6%22 stroke-width=%221%22><path d=%22M0 18c30-16 50 8 80 0s50-16 80 0 50 16 80 0 50-16 80 0%22/></svg>')] bg-contain bg-center bg-no-repeat ${flip ? "-scale-y-100" : ""}`}
      aria-hidden="true"
    />
  );
}

function Speaker() {
  return (
    <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" aria-hidden="true">
      <path d="M4 10h3l4-3v10l-4-3H4z" fill="currentColor" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5M17 7.5a6 6 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Muted() {
  return (
    <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" aria-hidden="true">
      <path d="M4 10h3l4-3v10l-4-3H4z" fill="currentColor" />
      <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
