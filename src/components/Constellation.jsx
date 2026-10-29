import { useEffect, useMemo, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import content from '../config/birthdayContent'
import { fill, displayName } from '../lib/fill'
import { Reveal, SceneHeader } from './Common'

const W = 400, H = 330
// The letter J, in tap order: the top bar left→right, then the stem (branching from
// the bar's middle star) down into the hook. `from` = which star a line comes from (default: the previous one).
const SHAPE = [
  [140, 42], [185, 37], [230, 35], [275, 37], [320, 42],
  [231, 85, 2], [232, 130], [231, 175],
  [222, 212], [198, 237], [166, 243], [136, 231], [118, 205],
]
const N = SHAPE.length
const shapePoints = () => SHAPE.map(([x, y, from], i) => ({ x, y, from: from ?? i - 1 }))

export default function Constellation() {
  const c = content.stars
  const pts = useMemo(shapePoints, [])
  const dust = useMemo(() => Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.4 + Math.random() * 1.1, d: Math.random() * 4 })), [])
  const [count, setCount] = useState(0)
  const auto = useRef(null)
  const done = count >= N

  const tap = (i) => { if (i === count) setCount((n) => n + 1) }
  const connectAll = () => {
    clearInterval(auto.current)
    auto.current = setInterval(() => setCount((n) => { if (n + 1 >= N) clearInterval(auto.current); return Math.min(N, n + 1) }), 170)
  }
  useEffect(() => () => clearInterval(auto.current), [])

  return (
    <section className="scene" id="stars">
      <SceneHeader title={fill(c.title)} intro={fill(c.intro)} subtitle={done ? null : fill(c.subtitle)} />
      <Reveal className={`constellation ${done ? 'done' : ''}`}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={done ? `The letter J drawn in stars above the name ${displayName}` : `Constellation: ${count} of ${N} stars connected`}>
          <defs>
            <radialGradient id="heartFill"><stop offset="0" stopColor="#ffc2d9" stopOpacity=".35" /><stop offset="1" stopColor="#b9a4ff" stopOpacity="0" /></radialGradient>
            <filter id="glowF"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {dust.map((d, i) => <circle key={i} className="dust" cx={d.x} cy={d.y} r={d.r} style={{ animationDelay: `${d.d}s` }} />)}
          {done && <ellipse className="heart-fill" cx={W / 2} cy={140} rx={170} ry={130} fill="url(#heartFill)" />}
          <g filter="url(#glowF)">
            {pts.slice(1, Math.max(1, count)).map((p, i) => (
              <line key={i} className="cline" x1={pts[p.from].x} y1={pts[p.from].y} x2={p.x} y2={p.y} pathLength="1" />
            ))}
          </g>
          {pts.map((p, i) => {
            const state = i < count ? 'lit' : i === count ? 'next' : ''
            return (
              <g
                key={i}
                className={`cstar ${state}`}
                onClick={() => tap(i)}
                role={i === count ? 'button' : undefined}
                tabIndex={i === count ? 0 : -1}
                aria-label={i === count ? `Connect star ${i + 1}` : undefined}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(i) } }}
              >
                <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                <circle className="halo" cx={p.x} cy={p.y} r="9" />
                <circle className="core" cx={p.x} cy={p.y} r="3.4" />
              </g>
            )
          })}
          {done && <text className="cname" x={W / 2} y={305} textAnchor="middle" style={{ fontSize: Math.min(44, 440 / Math.max(6, displayName.length)) }}>{displayName}</text>}
        </svg>
        <div className="const-ui" aria-live="polite">
          {done
            ? <p className="const-msg">{fill(c.done)}</p>
            : <button className="btn ghost" onClick={connectAll}><Sparkles size={16} /> {fill(c.helper)}</button>}
        </div>
      </Reveal>
    </section>
  )
}
