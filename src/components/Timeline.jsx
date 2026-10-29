import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import memories from '../config/memories'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { Reveal, SceneHeader, SafeImage } from './Common'

export default function Timeline() {
  const list = useRef(null)
  const [openIdx, setOpenIdx] = useState(() => new Set())
  const c = content.timeline
  // the glowing line "draws" itself as you scroll through the memories
  useEffect(() => {
    const el = list.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.7 - r.top) / Math.max(1, r.height)
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  if (!memories.length) return null
  const toggle = (i) => setOpenIdx((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })
  return (
    <section className="scene" id="timeline">
      <SceneHeader title={fill(c.title)} intro={fill(c.intro)} subtitle={fill(c.subtitle)} />
      <ol className="timeline" ref={list}>
        {memories.map((m, i) => {
          const open = openIdx.has(i)
          return (
            <Reveal as="li" key={i} className={`tl-item ${i % 2 ? 'right' : 'left'}`}>
              <span className="dot" aria-hidden="true" />
              <div className="tl-card">
                {m.photo && <SafeImage src={m.photo} alt={m.alt || m.title} className="tl-photo" label="Memory photo" />}
                <small>{m.date}</small>
                <h3>{fill(m.title)}</h3>
                <p>{fill(m.description)}</p>
                {m.details && (
                  <>
                    <div className={`tl-more ${open ? 'open' : ''}`} id={`tl-more-${i}`}>
                      <div><p>{fill(m.details)}</p></div>
                    </div>
                    <button className="tl-toggle" onClick={() => toggle(i)} aria-expanded={open} aria-controls={`tl-more-${i}`}>
                      {open ? fill(c.less) : fill(c.more)} <ChevronDown size={15} />
                    </button>
                  </>
                )}
              </div>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}
