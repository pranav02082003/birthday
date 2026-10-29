import { useEffect, useMemo, useRef, useState } from 'react'
import { X, ImageIcon } from 'lucide-react'
import useReveal from '../hooks/useReveal'

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div', style, ...rest }) {
  const [ref, shown] = useReveal()
  return <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>{children}</Tag>
}

// `plain` skips the "Chapter N" kicker (numbered automatically with a CSS counter)
export function SceneHeader({ title, subtitle, intro, plain = false }) {
  return (
    <Reveal className={`scene-head ${plain ? 'plain' : ''}`}>
      {!plain && <p className="chapter" aria-hidden="true" />}
      <h2>{title}</h2>
      <span className="rule" aria-hidden="true"><i>✦</i></span>
      {intro && <p className="scene-intro">{intro}</p>}
      {subtitle && <p className="sub">{subtitle}</p>}
    </Reveal>
  )
}

// A narrated bridge line between chapters; words drift in one by one
export function Interlude({ text }) {
  if (!text) return null
  const words = text.split(' ')
  return (
    <Reveal className="interlude" as="p">
      <span className="il-star" aria-hidden="true">✦</span>
      {words.map((w, i) => <span key={i} className="il-w" style={{ '--i': i }}>{w} </span>)}
    </Reveal>
  )
}

// Image with a graceful gradient fallback if the file is missing
export function SafeImage({ src, alt, className = '', label }) {
  const [failed, setFailed] = useState(!src)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setFailed(!src); setLoaded(false) }, [src])
  if (failed) {
    return (
      <div className={`fallback ${className}`} role="img" aria-label={alt || 'Photo placeholder'}>
        <span><ImageIcon size={22} aria-hidden="true" />{label || 'Your photo here'}</span>
      </div>
    )
  }
  return <img className={`${className} ${loaded ? 'loaded' : ''}`} src={src} alt={alt || ''} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
}

export function Starfield() {
  const stars = useMemo(() => Array.from({ length: 110 }, () => ({
    l: Math.random() * 100, t: Math.random() * 100, s: 0.8 + Math.random() * 2, d: Math.random() * 6, du: 3 + Math.random() * 4,
  })), [])
  const orbs = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ l: (i * 9 + 4) % 100, d: i * 1.9, du: 16 + (i % 4) * 4, s: 3 + (i % 3) * 3 })), [])
  return (
    <div className="sky" aria-hidden="true">
      <div className="glow g1" /><div className="glow g2" /><div className="glow g3" />
      {stars.map((s, i) => <i key={i} className="star" style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${s.du}s` }} />)}
      {orbs.map((o, i) => <i key={i} className="orb" style={{ left: `${o.l}%`, width: o.s, height: o.s, animationDelay: `${o.d}s`, animationDuration: `${o.du}s` }} />)}
      <i className="shoot s1" /><i className="shoot s2" /><i className="shoot s3" />
    </div>
  )
}

export function Confetti({ count = 48, fall = '560px' }) {
  const bits = useMemo(() => Array.from({ length: count }, (_, i) => ({
    l: Math.random() * 100, d: Math.random() * 0.9, du: 2.4 + Math.random() * 2.2, r: Math.random() * 360, c: i % 5, w: 5 + Math.random() * 6, round: i % 3 === 0,
  })), [count])
  return (
    <div className="confetti" aria-hidden="true" style={{ '--fall': fall }}>
      {bits.map((b, i) => <i key={i} className={`c${b.c} ${b.round ? 'round' : ''}`} style={{ left: `${b.l}%`, animationDelay: `${b.d}s`, animationDuration: `${b.du}s`, width: b.w, height: b.round ? b.w : b.w * 1.6, '--r': `${b.r}deg` }} />)}
    </div>
  )
}

// Accessible modal: Escape closes, focus moves in and is restored, body scroll locked
export function Modal({ label, onClose, onKey, children, wide = false }) {
  const box = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current?.focus()
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      else onKey?.(e)
      if (e.key === 'Tab' && box.current) {
        const f = box.current.querySelectorAll('button, [href], video, [tabindex]:not([tabindex="-1"])')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = prevOverflow; prev?.focus?.() }
  }, [onClose, onKey])
  return (
    <div className="modal-back" onClick={onClose}>
      <div className={`modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} ref={box} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {children}
      </div>
    </div>
  )
}
