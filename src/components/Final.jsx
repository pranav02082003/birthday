import { RotateCcw, Images } from 'lucide-react'
import content from '../config/birthdayContent'
import { fill, displayName } from '../lib/fill'
import useInView from '../hooks/useInView'
import { Reveal } from './Common'
import Fireworks from './Fireworks'

export default function Final({ onReplay, canGallery }) {
  const f = content.final
  const [ref, inView] = useInView(0.25)
  const paras = fill(f.message).split(/\n\s*\n/)
  const d = (k) => 200 + k * 260
  return (
    <section className="scene final" id="final" ref={ref} aria-labelledby="final-title">
      <Fireworks active={inView} rate={1300} />
      <Reveal><p className="eyebrow" id="final-title">{fill(f.kicker)}</p></Reveal>
      <div className="final-msg">
        {paras.map((p, i) => <Reveal key={i} delay={d(i)}><p>{p}</p></Reveal>)}
      </div>
      <Reveal delay={d(paras.length)} className="final-sign">
        <p className="sign-off">{fill(f.signoff)}</p>
        <p className="sig">{fill('{from}')}</p>
      </Reveal>
      <Reveal delay={d(paras.length + 1)}><p className="final-name">Happy Birthday, {displayName}</p></Reveal>
      <Reveal delay={200} className="btn-row">
        <button className="btn primary" onClick={onReplay}><RotateCcw size={18} /> {fill(f.replay)}</button>
        {canGallery && (
          <button className="btn ghost" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
            <Images size={18} /> {fill(f.photos)}
          </button>
        )}
      </Reveal>
      <p className="footer">{fill(f.footer)}</p>
    </section>
  )
}
