import { useState } from 'react'
import letters from '../config/letters'
import config from '../config/birthdayConfig'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { SceneHeader, Reveal } from './Common'

const initial = (config.from || '♥').trim().charAt(0).toUpperCase() || '♥'

export default function Letters() {
  const [idx, setIdx] = useState(0)
  const [opened, setOpened] = useState({})
  if (!letters.length) return null
  const l = letters[idx]
  const isOpen = !!opened[l.id]
  const c = content.letters
  return (
    <section className="scene" id="letters">
      <SceneHeader title={fill(c.title)} intro={fill(c.intro)} subtitle={fill(c.subtitle)} />
      {letters.length > 1 && (
        <div className="tabs" role="tablist" aria-label="Letters">
          {letters.map((x, i) => (
            <button key={x.id} role="tab" aria-selected={i === idx} className={`tab ${i === idx ? 'on' : ''}`} onClick={() => setIdx(i)}>{fill(x.title)}</button>
          ))}
        </div>
      )}
      <Reveal className={`envelope-wrap ${isOpen ? 'open' : ''}`}>
        <button className="envelope" onClick={() => setOpened((o) => ({ ...o, [l.id]: !o[l.id] }))} aria-expanded={isOpen} aria-controls={`paper-${l.id}`}>
          <span className="env-back" aria-hidden="true" />
          <span className="env-pocket" aria-hidden="true" />
          <span className="flap" aria-hidden="true" />
          <span className="seal" aria-hidden="true">{initial}</span>
          <span className="env-to" aria-hidden="true">{fill(c.to)}</span>
          <span className="env-label">{isOpen ? 'Fold the letter away' : 'Break the seal'}</span>
        </button>
        <article id={`paper-${l.id}`} className="paper" hidden={!isOpen} key={`${l.id}-${isOpen}`}>
          <h3>{fill(l.title)}</h3>
          {fill(l.body).split(/\n\s*\n/).map((p, i) => <p key={i} style={{ animationDelay: `${300 + i * 220}ms` }}>{p}</p>)}
          {(l.signoff || l.signature) && (
            <p className="letter-sign" style={{ animationDelay: `${300 + fill(l.body).split(/\n\s*\n/).length * 220}ms` }}>
              {l.signoff && <span>{fill(l.signoff)}</span>}
              {l.signature && <span className="sig">{fill(l.signature)}</span>}
            </p>
          )}
        </article>
      </Reveal>
    </section>
  )
}
