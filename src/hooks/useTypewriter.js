import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Types `text` out one character at a time. Returns [typed, done, finishNow].
export default function useTypewriter(text, { speed = 42, enabled = true } = {}) {
  const [n, setN] = useState(0)
  const timer = useRef(null)
  useEffect(() => {
    clearInterval(timer.current)
    setN(0)
    if (!enabled) return
    if (prefersReducedMotion()) { setN(text.length); return }
    let i = 0
    timer.current = setInterval(() => {
      i += 1
      setN(i)
      if (i >= text.length) clearInterval(timer.current)
    }, speed)
    return () => clearInterval(timer.current)
  }, [text, speed, enabled])
  const finish = useCallback(() => { clearInterval(timer.current); setN(text.length) }, [text])
  return [text.slice(0, n), n >= text.length, finish]
}
