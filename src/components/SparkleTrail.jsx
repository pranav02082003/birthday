import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const COLORS = ['#e8c97a', '#ffc2d9', '#b9a4ff', '#ffffff']

// Little twinkling stars that follow the mouse (desktop only)
export default function SparkleTrail() {
  const ref = useRef(null)
  useEffect(() => {
    if (!window.matchMedia?.('(pointer: fine)').matches || prefersReducedMotion()) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, parts = [], lx = 0, ly = 0
    const resize = () => { w = window.innerWidth; h = window.innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize()
    const star = (x, y, s) => {
      ctx.beginPath()
      ctx.moveTo(x, y - s)
      ctx.quadraticCurveTo(x, y, x + s, y)
      ctx.quadraticCurveTo(x, y, x, y + s)
      ctx.quadraticCurveTo(x, y, x - s, y)
      ctx.quadraticCurveTo(x, y, x, y - s)
      ctx.fill()
    }
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      parts = parts.filter((p) => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.022
        if (p.life <= 0) return false
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.c
        star(p.x, p.y, p.s * (0.6 + p.life * 0.4))
        return true
      })
      ctx.globalAlpha = 1
      raf = parts.length ? requestAnimationFrame(tick) : 0
    }
    const move = (e) => {
      const dx = e.clientX - lx, dy = e.clientY - ly
      if (dx * dx + dy * dy < 90) return
      lx = e.clientX; ly = e.clientY
      parts.push({ x: lx, y: ly, vx: (Math.random() - 0.5) * 0.8, vy: 0.3 + Math.random() * 0.6, life: 1, s: 3 + Math.random() * 4, c: COLORS[(Math.random() * COLORS.length) | 0] })
      if (parts.length > 70) parts.shift()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={ref} className="sparkles" aria-hidden="true" />
}
