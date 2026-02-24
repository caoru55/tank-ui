export function speak(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return
  }

  const synth = window.speechSynthesis
  synth.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'ja-JP'
  utter.rate = 1.1
  utter.pitch = 1.1
  utter.volume = 1
  synth.speak(utter)
}