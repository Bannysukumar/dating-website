import { useCallback, useRef } from "react";

function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.3,
) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function useSounds() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
    }
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playMatchFound = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Ascending chime
    playTone(ctx, 523.25, now, 0.3, "sine", 0.25);       // C5
    playTone(ctx, 659.25, now + 0.15, 0.3, "sine", 0.25); // E5
    playTone(ctx, 783.99, now + 0.30, 0.5, "sine", 0.3);  // G5
    playTone(ctx, 1046.5, now + 0.50, 0.6, "sine", 0.2);  // C6
  }, [getCtx]);

  const playMessageReceived = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    playTone(ctx, 880, now, 0.08, "sine", 0.15);
    playTone(ctx, 1100, now + 0.09, 0.12, "sine", 0.12);
  }, [getCtx]);

  const playDisconnect = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    playTone(ctx, 440, now, 0.2, "sine", 0.2);
    playTone(ctx, 330, now + 0.2, 0.4, "sine", 0.15);
  }, [getCtx]);

  return { playMatchFound, playMessageReceived, playDisconnect };
}
