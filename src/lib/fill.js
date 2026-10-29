import config from '../config/birthdayConfig'

export const displayName = config.nickname || config.recipientName

const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
const age = Number(config.age) > 0 ? Number(config.age) : null
export const hasAge = age !== null

const date = new Date(config.birthday)
const vars = {
  name: displayName,
  fullName: config.recipientName,
  from: config.from || '',
  age: age ?? '',
  ageth: age ? ordinal(age) : '',
  date: Number.isFinite(date.getTime()) ? date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : '',
}

// Replace {placeholders} in content strings; `extra` adds one-off values like {n}
export const fill = (s = '', extra = {}) =>
  String(s).replace(/\{(\w+)\}/g, (m, k) => (k in extra ? extra[k] : k in vars ? vars[k] : m))
