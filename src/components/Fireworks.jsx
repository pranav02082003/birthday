import { useEffect, useRef } from 'react'
import config from '../config/birthdayConfig'
import { prefersReducedMotion } from '../lib/motion'

const COLORS = ['#e8c97a', '#ffc2d9', '#b9a4ff', '#ffffff', '#ffd36e', '#9be7ff']
const G = 0.05

// Canvas fireworks that fill their positioned parent; runs only while `active`
export default function Fireworks({ active = true, rate = 900 }) {
  const ref = useRef(null)
  const off = config.effects?.fireworks === false
  useEffect(() => {
    if (!active || off || prefersReducedMotion()) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, nextAt = 0, rockets = [], sparks = []
    const resize = () => {
      const r = cv.getBoundingClientRect()
      w = r.width; h = r.height
      cv.width = w * dpr; cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const pick = () => COLORS[(Math.random() * COLORS.length) | 0]
    const launch = () => {
      const top = h * (0.12 + Math.random() * 0.3)
      rockets.push({ x: w * (0.15 + Math.random() * 0.7), y: h, vx: (Math.random() - 0.5) * 1.2, vy: -Math.sqrt(2 * G * (h - top)), c: pick() })
    }
    const burst = (r) => {
      const n = 46 + ((Math.random() * 34) | 0)
      const sp = 1.8 + Math.random() * 2.4
      const ring = Math.random() < 0.3
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2
        const v = sp * (ring ? 1 : 0.4 + Math.random() * 0.6)
        sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: 0.011 + Math.random() * 0.012, c: Math.random() < 0.2 ? '#fff' : r.c })
      }
    }
    const tick = (t) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.22)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      if (t > nextAt) { launch(); nextAt = t + rate * (0.6 + Math.random() * 0.8) }
      rockets = rockets.filter((r) => {
        r.x += r.vx; r.y += r.vy; r.vy += G
        ctx.fillStyle = r.c
        ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 7); ctx.fill()
        if (r.vy >= -0.4) { burst(r); return false }
        return true
      })
      sparks = sparks.filter((p) => {
        p.x += p.vx; p.y += p.vy; p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.035; p.life -= p.decay
        if (p.life <= 0) return false
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.c
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 7); ctx.fill()
        ctx.globalAlpha = 1
        return true
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); ctx.clearRect(0, 0, w, h) }
  }, [active, rate, off])
  if (off) return null
  return <canvas ref={ref} className="fireworks" aria-hidden="true" />
}
