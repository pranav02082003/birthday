import { useState } from 'react'
import reasons from '../config/reasons'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { Reveal, SceneHeader } from './Common'

export default function Reasons() {
  const [flipped, setFlipped] = useState(() => new Set())
  const c = content.reasons
  if (!reasons.length) return null
  const toggle = (i) => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })
  const all = flipped.size === reasons.length
  return (
    <section className="scene" id="reasons">
      <SceneHeader title={fill(c.title)} intro={fill(c.intro)} subtitle={fill(c.subtitle)} />
      <div className="reasons">
        {reasons.map((r, i) => {
          const on = flipped.has(i)
          return (
            <Reveal key={i} className="rwrap" delay={(i % 3) * 110}>
              <button className={`rcard ${on ? 'flipped' : ''}`} onClick={() => toggle(i)} aria-pressed={on} aria-label={on ? `${r.title}: ${r.text}` : `Reveal: ${r.title}`}>
                <span className="rface rfront" aria-hidden={on}>
                  <span className="remoji">{r.icon}</span>
                  <span className="rtitle">{r.title}</span>
                  <span className="rtap">tap to flip</span>
                </span>
                <span className="rface rback" aria-hidden={!on}>
                  <span className="rtext">{fill(r.text)}</span>
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>
      <p className={`reasons-progress ${all ? 'all' : ''}`} aria-live="polite">
        {all ? fill(c.allDone) : fill(c.progress, { n: flipped.size, total: reasons.length })}
      </p>
    </section>
  )
}
