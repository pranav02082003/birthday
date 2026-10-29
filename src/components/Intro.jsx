import { useEffect, useMemo, useRef, useState } from 'react'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { music } from '../lib/music'
import { prefersReducedMotion } from '../lib/motion'
import useTypewriter from '../hooks/useTypewriter'
import { Confetti } from './Common'

// prelude (tap to begin, starts music) → typed lines → gift box → story
export default function Intro({ onEnter, replay = false }) {
  const c = content.intro
  const lines = useMemo(() => (c.lines || []).map((l) => fill(l)), [c.lines])
  const [stage, setStage] = useState(replay ? (lines.length ? 'lines' : 'gift') : 'prelude')
  const [i, setI] = useState(0)
  const [opening, setOpening] = useState(false)
  const enterTimer = useRef(null)
  const [typed, done, finish] = useTypewriter(lines[i] || '', { enabled: stage === 'lines' })

  const next = () => (i < lines.length - 1 ? setI(i + 1) : setStage('gift'))

  // after a line finishes typing, hold it long enough to read, then move on
  useEffect(() => {
    if (stage !== 'lines' || !done) return
    const t = setTimeout(next, 1400 + (lines[i]?.length || 0) * 22)
    return () => clearTimeout(t)
  }, [stage, done, i]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(enterTimer.current), [])

  const begin = () => {
    music.play() // inside the tap, so browsers allow audio
    setStage(lines.length ? 'lines' : 'gift')
  }
  const openGift = () => {
    if (opening) return
    setOpening(true)
    enterTimer.current = setTimeout(onEnter, prefersReducedMotion() ? 200 : 2000)
  }

  return (
    <section className={`intro stage-${stage}`} aria-label="Introduction">
      <button className="skip" onClick={onEnter}>{c.skip}</button>

      {stage === 'prelude' && (
        <button className="prelude" onClick={begin}>
          <span className="pulse-star" aria-hidden="true">✦</span>
          <span className="prelude-text">{c.prelude}</span>
          {music.enabled && <small>{c.soundHint}</small>}
        </button>
      )}

      {stage === 'lines' && (
        <button className="intro-stage" onClick={() => (done ? next() : finish())} aria-label="Continue">
          <span className="sr-only" aria-live="polite">{lines[i]}</span>
          <span key={i} className={`intro-line ${i === lines.length - 1 ? 'last' : ''}`} aria-hidden="true">
            {typed}<span className="caret" />
          </span>
          <span className="intro-dots" aria-hidden="true">
            {lines.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}
          </span>
          <span className="tap-hint" aria-hidden="true">{c.tapHint}</span>
        </button>
      )}

      {stage === 'gift' && (
        <div className="gift-stage">
          <p className="gift-prompt">{fill(c.giftPrompt)}</p>
          <button className={`gift ${opening ? 'open' : ''}`} onClick={openGift} aria-label="Open your gift">
            <span className="gift-glow" />
            <span className="gift-box" />
            <span className="gift-lid"><span className="bow l" /><span className="bow r" /></span>
          </button>
          {opening && <><Confetti count={90} fall="110vh" /><div className="flash" aria-hidden="true" /></>}
        </div>
      )}
    </section>
  )
}
