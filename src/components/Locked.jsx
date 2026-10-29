import content from '../config/birthdayContent'
import { fill } from '../lib/fill'

const UNITS = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]

// Shown instead of the whole site until the birthday arrives
export default function Locked({ t }) {
  const c = content.locked
  return (
    <section className="locked" aria-labelledby="locked-title">
      <span className="pulse-star" aria-hidden="true">✦</span>
      <h1 id="locked-title">{fill(c.title)}</h1>
      <p className="lead">{fill(c.subtitle)}</p>
      <div className="count-grid" role="timer" aria-label="Time until your birthday">
        {UNITS.map(([k, l]) => (
          <div className="count-box" key={k}>
            <b key={t[k]} className="tick">{String(t[k]).padStart(2, '0')}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <p className="count-until">{fill(c.until)}</p>
      <p className="locked-hint">🔒 {fill(c.hint)}</p>
    </section>
  )
}
