import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Wand2, Wind, Mic, RotateCcw } from 'lucide-react'
import config from '../config/birthdayConfig'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { Reveal, SceneHeader, Confetti } from './Common'
import Fireworks from './Fireworks'

const CANDLE_COLORS = ['#e8c97a', '#ffffff', '#ffc2d9', '#b9a4ff']
const canUseMic = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia

export default function Cake() {
  const c = content.cake
  const count = Math.min(9, Math.max(1, Number(config.cakeCandles) || 5))
  const xs = useMemo(() => Array.from({ length: count }, (_, i) => (count === 1 ? 150 : 96 + (i * 108) / (count - 1))), [count])
  const [lit, setLit] = useState(() => Array(count).fill(true))
  const [stage, setStage] = useState('wish') // wish → blow → done
  const [wish, setWish] = useState('')
  const [mic, setMic] = useState('off') // off | on | error
  const micRef = useRef(null)
  const timers = useRef([])
  const remaining = lit.filter(Boolean).length

  const blowOne = useCallback((i) => setLit((l) => {
    const k = i ?? l.findIndex(Boolean)
    if (k < 0 || !l[k]) return l
    const n = [...l]; n[k] = false
    return n
  }), [])

  const stopMic = useCallback(() => {
    const m = micRef.current
    if (m) {
      cancelAnimationFrame(m.raf)
      m.stream.getTracks().forEach((t) => t.stop())
      m.ac.close().catch(() => {})
      micRef.current = null
    }
    setMic((s) => (s === 'on' ? 'off' : s))
  }, [])

  // a real breath into the mic shows up as a burst of loud, noisy input
  const startMic = async () => {
    if (micRef.current) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false } })
      const AC = window.AudioContext || window.webkitAudioContext
      const ac = new AC()
      const an = ac.createAnalyser()
      an.fftSize = 1024
      ac.createMediaStreamSource(stream).connect(an)
      const data = new Uint8Array(an.fftSize)
      const m = { stream, ac, raf: 0 }
      micRef.current = m
      setMic('on')
      let loud = 0
      const tick = () => {
        an.getByteTimeDomainData(data)
        let sum = 0
        for (let k = 0; k < data.length; k++) { const x = (data[k] - 128) / 128; sum += x * x }
        const rms = Math.sqrt(sum / data.length)
        if (rms > 0.08) { loud += 1; if (loud % 5 === 0) blowOne() } else loud = Math.max(0, loud - 2)
        m.raf = requestAnimationFrame(tick)
      }
      tick()
    } catch {
      setMic('error')
    }
  }

  const blowAll = () => lit.forEach((on, i) => on && timers.current.push(setTimeout(() => blowOne(i), i * 140)))

  const relight = () => {
    stopMic()
    timers.current.forEach(clearTimeout)
    timers.current = []
    setLit(Array(count).fill(true))
    setWish('')
    setMic('off')
    setStage('wish')
  }

  useEffect(() => {
    if (stage !== 'blow' || remaining > 0) return
    stopMic()
    const t = setTimeout(() => setStage('done'), 700)
    return () => clearTimeout(t)
  }, [stage, remaining, stopMic])

  useEffect(() => () => { stopMic(); timers.current.forEach(clearTimeout) }, [stopMic])

  const done = stage === 'done'
  return (
    <section className="scene" id="cake">
      <SceneHeader title={fill(c.title)} intro={fill(c.intro)} />
      <Reveal className={`cake-area stage-${stage}`}>
        {done && <><Fireworks active rate={700} /><Confetti count={70} /></>}
        {done && wish.trim() && <p className="wish-fly" aria-hidden="true">✦ {wish.trim()} ✦</p>}
        <svg className="cake" viewBox="0 0 300 280" role="img" aria-label={remaining ? `Birthday cake with ${remaining} lit candles` : 'Cake with the candles blown out'}>
          <defs>
            <linearGradient id="tierTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9e8" /><stop offset="1" stopColor="#f3a6c6" /></linearGradient>
            <linearGradient id="tierBot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9ccff" /><stop offset="1" stopColor="#a88ef0" /></linearGradient>
            <radialGradient id="halo"><stop offset="0" stopColor="#ffd36e" stopOpacity=".55" /><stop offset="1" stopColor="#ffd36e" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="150" cy="258" rx="138" ry="15" fill="#e8c97a" opacity=".9" />
          <ellipse cx="150" cy="254" rx="126" ry="10" fill="#f6e2a8" opacity=".6" />
          <rect x="35" y="176" width="230" height="78" rx="14" fill="url(#tierBot)" />
          <rect x="65" y="110" width="170" height="72" rx="14" fill="url(#tierTop)" />
          <path d="M65 124q21 20 42 0t42 0 42 0 44 0v-14H65z" fill="#fff7ee" />
          <path d="M35 190q29 22 57 0t58 0 57 0 58 0v-14H35z" fill="#fff7ee" />
          {[95, 122, 150, 178, 205].map((x) => <circle key={x} cx={x} cy={154} r="4" fill="#e8c97a" />)}
          {[60, 90, 120, 150, 180, 210, 240].map((x, i) => <circle key={x} cx={x} cy={222} r="3.5" fill={i % 2 ? '#fff7ee' : '#ffc2d9'} />)}
          {xs.map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="72" width="8" height="40" rx="3" fill={CANDLE_COLORS[i % CANDLE_COLORS.length]} />
              <path d={`M${x - 4} 82l8-5M${x - 4} 94l8-5M${x - 4} 106l8-5`} stroke="rgba(0,0,0,.12)" strokeWidth="2" />
              <line x1={x} y1="72" x2={x} y2="66" stroke="#5a4a3a" strokeWidth="1.5" />
              {lit[i] ? (
                <g
                  className={`flame ${stage === 'blow' ? 'tappable' : ''}`}
                  style={{ animationDelay: `${i * 0.13}s` }}
                  onClick={stage === 'blow' ? () => blowOne(i) : undefined}
                >
                  <circle cx={x} cy="54" r="20" fill="url(#halo)" />
                  <path d={`M${x} 40c8 8 6 17 0 21-6-4-8-13 0-21z`} fill="#ffb347" />
                  <path d={`M${x} 49c4 4 3 8 0 10-3-2-4-6 0-10z`} fill="#fff6cf" />
                </g>
              ) : (
                <path className="smoke" d={`M${x} 64q-6-10 0-18t0-16`} stroke="#cfc8ee" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              )}
            </g>
          ))}
        </svg>

        <div className="cake-ui" aria-live="polite">
          {stage === 'wish' && (
            <>
              <p className="lead">{fill(c.wishPrompt)}</p>
              <label className="sr-only" htmlFor="wish-input">Your wish</label>
              <textarea id="wish-input" className="wish-input" rows={2} maxLength={140} value={wish} onChange={(e) => setWish(e.target.value)} placeholder={fill(c.wishPlaceholder)} />
              <button className="btn primary" onClick={() => setStage('blow')}><Wand2 size={18} /> {fill(c.wishButton)}</button>
            </>
          )}
          {stage === 'blow' && (
            <>
              <h3 className="result">{fill(c.blowPrompt)}</h3>
              <p className="hint">{fill(c.blowHint)}</p>
              <div className="btn-row tight">
                <button className="btn primary" onClick={blowAll}><Wind size={18} /> {fill(c.blowButton)}</button>
                {canUseMic && mic !== 'error' && (
                  <button className={`btn ghost ${mic === 'on' ? 'listening' : ''}`} onClick={mic === 'on' ? stopMic : startMic} aria-pressed={mic === 'on'}>
                    <Mic size={18} /> {mic === 'on' ? fill(c.micListening) : fill(c.micButton)}
                  </button>
                )}
              </div>
              {mic === 'error' && <p className="hint warn">{fill(c.micError)}</p>}
            </>
          )}
          {done && (
            <>
              <h3 className="result big">{fill(c.result)}</h3>
              <p className="lead">{fill(c.resultSub)}</p>
              <button className="btn ghost" onClick={relight}><RotateCcw size={16} /> {fill(c.relight)}</button>
            </>
          )}
        </div>
      </Reveal>
    </section>
  )
}
