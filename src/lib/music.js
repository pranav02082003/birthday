// One shared audio element so the intro can start music inside the tap gesture
// and any component (player, videos) can control it.
import config from '../config/birthdayConfig'

const src = config.music?.src || ''
const targetVolume = config.music?.volume ?? 0.55
let audio = null
let fadeId = null
let ducked = false
const state = { playing: false, muted: false, error: false }
const subs = new Set()
const emit = () => subs.forEach((f) => f({ ...state }))

function el() {
  if (!src || typeof Audio === 'undefined') return null
  if (!audio) {
    audio = new Audio(src)
    audio.loop = true
    audio.preload = 'none'
    audio.addEventListener('play', () => { state.playing = true; state.error = false; emit() })
    audio.addEventListener('pause', () => { state.playing = false; emit() })
    audio.addEventListener('error', () => { state.error = true; state.playing = false; emit() })
  }
  return audio
}

// volume is read-only on iOS; the fade is then simply a no-op
function fadeTo(v, ms, done) {
  const a = el()
  if (!a) return
  clearInterval(fadeId)
  const start = a.volume, t0 = performance.now()
  fadeId = setInterval(() => {
    const k = Math.min(1, (performance.now() - t0) / ms)
    try { a.volume = start + (v - start) * k } catch { /* ignore */ }
    if (k >= 1) { clearInterval(fadeId); done?.() }
  }, 40)
}

export const music = {
  enabled: !!src,
  title: config.music?.title || '',
  subscribe(f) { subs.add(f); f({ ...state }); return () => subs.delete(f) },
  async play() {
    const a = el()
    if (!a) return
    if (!a.paused) { fadeTo(targetVolume, 600); return }
    try { a.volume = 0 } catch { /* ignore */ }
    try { await a.play(); fadeTo(targetVolume, 2000) } catch { state.error = true; emit() }
  },
  pause() {
    const a = el()
    if (!a || a.paused) return
    fadeTo(0, 500, () => a.pause())
  },
  toggle() { audio && !audio.paused && state.playing ? music.pause() : music.play() },
  setMuted(m) { const a = el(); if (!a) return; a.muted = m; state.muted = m; emit() },
  duck() { if (audio && !audio.paused) { ducked = true; music.pause() } },
  unduck() { if (ducked) { ducked = false; music.play() } },
}
