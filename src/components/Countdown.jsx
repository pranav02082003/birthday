import config from '../config/birthdayConfig'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import useCountdown from '../hooks/useCountdown'
import useInView from '../hooks/useInView'
import { Reveal, SceneHeader, Confetti } from './Common'
import Fireworks from './Fireworks'

const UNITS = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]

export default function Countdown() {
  const t = useCountdown(config.birthday)
  const [ref, inView] = useInView(0.3)
  const c = content.countdown
  if (!t) return null // invalid/missing date: scene hides gracefully
  return (
    <section className="scene" id="countdown" ref={ref} aria-labelledby="cd-title">
      {t.done ? (
        <div className="celebrate">
          <Fireworks active={inView} />
          <Confetti count={40} />
          <Reveal><h2 id="cd-title">{fill(c.done)}</h2><p className="lead">{fill(c.doneSub)}</p></Reveal>
        </div>
      ) : (
        <>
          <SceneHeader title={fill(c.title)} subtitle={fill(c.subtitle)} plain />
          <Reveal className="count-grid" role="timer" aria-label="Time until your birthday">
            {UNITS.map(([k, l]) => (
              <div className="count-box" key={k}>
                <b key={t[k]} className="tick">{String(t[k]).padStart(2, '0')}</b>
                <span>{l}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={200}><p className="count-until">{fill(c.until)}</p></Reveal>
        </>
      )}
    </section>
  )
}
