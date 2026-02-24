type BeepType = 'success' | 'exception' | 'error'

const playSingle = (
  ctx: AudioContext,
  frequency: number,
  startAt: number,
  duration: number,
  gainStart: number = 0.15,
): void => {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = frequency

  gain.gain.setValueAtTime(gainStart, startAt)
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration)

  osc.start(startAt)
  osc.stop(startAt + duration)
}

export function playBeep(type: BeepType): void {
  if (typeof window === 'undefined') return

  const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtx) return

  const ctx = new AudioCtx()
  const now = ctx.currentTime

  if (type === 'success') {
    playSingle(ctx, 880, now, 0.08)
  } else if (type === 'exception') {
    playSingle(ctx, 660, now, 0.08)
    playSingle(ctx, 660, now + 0.14, 0.08)
  } else {
    playSingle(ctx, 220, now, 0.35, 0.2)
  }

  window.setTimeout(() => {
    void ctx.close().catch(() => undefined)
  }, 500)
}