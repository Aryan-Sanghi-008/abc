/** Shared wedding music — lives outside React so GateOpening can start it on tap. */

let audio: HTMLAudioElement | null = null;

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio("/audio/train-hey-soul-sister.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audio.preload = "auto";
  }
  return audio;
}

export function playWeddingMusic() {
  const a = getAudio();
  if (!a) return;
  void a.play().catch(() => {});
}

export function pauseWeddingMusic() {
  audio?.pause();
}

export function setWeddingMusicPlaying(on: boolean) {
  if (on) playWeddingMusic();
  else pauseWeddingMusic();
}
