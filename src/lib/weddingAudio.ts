/** Shared wedding music — lives outside React so GateOpening can start it on tap. */

let audio: HTMLAudioElement | null = null;

function ensureAudio() {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio("/audio/train-hey-soul-sister.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    audio.volume = 0.2;
  }
  return audio;
}

/** Call on gate mount so the file is buffered before the user taps. */
export function prepareWeddingMusic() {
  const a = ensureAudio();
  if (!a) return;
  try {
    a.load();
  } catch {
    // ignore
  }
}

/**
 * Must be called directly from a user click/tap gesture on mobile.
 * Returns the play promise so callers can keep it in the gesture stack.
 */
export function playWeddingMusic() {
  const a = ensureAudio();
  if (!a) return Promise.resolve();

  a.muted = false;
  a.volume = 0.2;

  const attempt = a.play();
  if (!attempt) return Promise.resolve();

  return attempt.catch(() => {
    // Mobile: element may still be buffering. One more try after a tiny tick
    // still inside the gesture on most Android browsers; iOS needs preload.
    return new Promise<void>((resolve) => {
      const retry = () => {
        void a.play().catch(() => {}).finally(resolve);
      };
      if (a.readyState >= 2) {
        retry();
      } else {
        a.addEventListener("canplay", retry, { once: true });
        try {
          a.load();
        } catch {
          resolve();
        }
        // Don't hang forever if canplay never fires
        window.setTimeout(() => {
          a.removeEventListener("canplay", retry);
          resolve();
        }, 2000);
      }
    });
  });
}

export function pauseWeddingMusic() {
  audio?.pause();
}

export function setWeddingMusicPlaying(on: boolean) {
  if (on) void playWeddingMusic();
  else pauseWeddingMusic();
}

export function isWeddingMusicPlaying() {
  return !!audio && !audio.paused;
}
