import { useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import content from '../config/birthdayContent'
import { fill, displayName, hasAge } from '../lib/fill'
import { Reveal } from './Common'

const BALLOON_COLORS = ['var(--blush)', 'var(--lavender)', 'var(--gold)', '#ff9cc4', '#9be7ff']

function Balloons() {
  const list = useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    left: i % 2 ? 82 + ((i * 7) % 14) : 2 + ((i * 5) % 14), // keep them to the sides
    d: i * 1.7, du: 13 + (i % 4) * 3, s: 0.7 + (i % 3) * 0.2, c: BALLOON_COLORS[i % BALLOON_COLORS.length],
  })), [])
  return (
    <div className="balloons" aria-hidden="true">
      {list.map((b, i) => (
        <i key={i} className="balloon" style={{ left: `${b.left}%`, '--d': `${b.d}s`, '--du': `${b.du}s`, '--s': b.s, '--bc': b.c }} />
      ))}
    </div>
  )
}

export default function Greeting() {
  const g = content.greeting
  const title = fill(g.title)
  return (
    <section className="scene greeting" id="greeting" aria-labelledby="greet-title">
      <Balloons />
      <Reveal><p className="eyebrow">{fill(g.eyebrow)}</p></Reveal>
      <Reveal as="h1" className="greet" id="greet-title" aria-label={`${title}, ${displayName}`}>
        {[...title].map((ch, i) => <span key={i} className="ch" style={{ '--i': i }} aria-hidden="true">{ch === ' ' ? ' ' : ch}</span>)}
      </Reveal>
      <Reveal delay={700}><p className="name-script" aria-hidden="true">{displayName}</p></Reveal>
      {hasAge && g.ageLine && <Reveal delay={1000}><p className="age-badge">{fill(g.ageLine)}</p></Reveal>}
      <Reveal delay={1200}><p className="lead">{fill(g.body)}</p></Reveal>
      <Reveal delay={1500}>
        <a className="scroll-hint" href="#story-start"><span>{g.scrollHint}</span><ChevronDown size={18} /></a>
      </Reveal>
      <span id="story-start" />
    </section>
  )
}
