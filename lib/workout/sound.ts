"use client";

// Synthesize a short beep via Web Audio. Must be CALLED from a user
// gesture at least once (the Start button) so the AudioContext can
// transition out of "suspended" on iOS and other locked-autoplay browsers.

let ctx: AudioContext | null = null;

type AudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const w = window as AudioWindow;
  const Ctor = window.AudioContext ?? w.webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

/**
 * Call once inside a user gesture (e.g., Start button click). Subsequent
 * `beep()` calls will work even if no further gesture occurs.
 */
export function primeAudio() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") {
    c.resume().catch(() => {});
  }
}

/**
 * Short tone, ~150ms, ~880Hz. No-op if the AudioContext can't run.
 */
export function beep() {
  const c = getCtx();
  if (!c || c.state !== "running") return;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.frequency.value = 880;
  osc.type = "sine";

  // Quick attack + decay to avoid clicks.
  const now = c.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(c.destination);

  osc.start(now);
  osc.stop(now + 0.16);
}
