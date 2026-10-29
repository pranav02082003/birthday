import { useEffect, useState } from 'react'
const calc = (target) => {
  const diff = target - Date.now()
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  const s = Math.floor(diff / 1000)
  return { done: false, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 }
}
export default function useCountdown(dateStr) {
  const target = new Date(dateStr).getTime()
  const valid = Number.isFinite(target)
  const [t, setT] = useState(() => (valid ? calc(target) : null))
  useEffect(() => {
    if (!valid) { setT(null); return }
    setT(calc(target))
    const id = setInterval(() => setT(calc(target)), 1000)
    return () => clearInterval(id)
  }, [target, valid])
  return t // null when the date is missing/invalid
}
