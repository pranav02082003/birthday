import { useEffect, useRef, useState } from 'react'

// Top reading-progress bar + side dots that jump between chapters
export default function ChapterNav({ items }) {
  const [present, setPresent] = useState([])
  const [active, setActive] = useState(null)
  const bar = useRef(null)
  useEffect(() => {
    const found = items.map((it) => ({ ...it, el: document.getElementById(it.id) })).filter((x) => x.el)
    setPresent(found.map(({ id, label }) => ({ id, label })))
    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
      found.forEach((x) => io.observe(x.el))
    }
    let raf = 0
    const update = () => {
      raf = 0
      const d = document.documentElement
      const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight)
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { io?.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [items])
  return (
    <>
      <div className="progress" aria-hidden="true"><i ref={bar} /></div>
      {present.length > 1 && (
        <nav className="chapters" aria-label="Chapters">
          <ol>
            {present.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className={active === c.id ? 'on' : ''} aria-current={active === c.id ? 'true' : undefined}>
                  <span className="lbl">{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  )
}
