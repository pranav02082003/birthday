import { Fragment, useEffect, useMemo, useState } from 'react'
import config from './config/birthdayConfig'
import content from './config/birthdayContent'
import photos from './config/photos'
import { displayName, fill } from './lib/fill'
import { Starfield, Interlude } from './components/Common'
import SparkleTrail from './components/SparkleTrail'
import ChapterNav from './components/ChapterNav'
import MusicPlayer from './components/MusicPlayer'
import Intro from './components/Intro'
import Countdown from './components/Countdown'
import Greeting from './components/Greeting'
import Reasons from './components/Reasons'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Videos from './components/Videos'
import Constellation from './components/Constellation'
import Letters from './components/Letters'
import Cake from './components/Cake'
import Final from './components/Final'
import Locked from './components/Locked'
import useCountdown from './hooks/useCountdown'

// Add ?preview to the URL to skip the lock while testing
const preview = new URLSearchParams(window.location.search).has('preview')

const SCENES = {
  countdown: Countdown, greeting: Greeting, reasons: Reasons, timeline: Timeline, gallery: Gallery,
  videos: Videos, stars: Constellation, letters: Letters, cake: Cake, final: Final,
}
const ORDER = Object.keys(SCENES)

export default function App() {
  const s = config.scenes
  const [started, setStarted] = useState(!s.intro)
  const [replays, setReplays] = useState(0)
  const enabled = useMemo(() => ORDER.filter((k) => s[k]), [s])
  const chapters = useMemo(() => enabled.map((id) => ({ id, label: content.nav?.[id] || id })), [enabled])

  useEffect(() => {
    const root = document.documentElement.style
    Object.entries(config.theme).forEach(([k, v]) => root.setProperty(`--${k}`, v))
    document.title = `Happy Birthday, ${displayName} ✦`
  }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [started])

  const replay = () => {
    if (s.intro) { setReplays((r) => r + 1); setStarted(false) } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const props = { final: { canGallery: s.gallery && photos.length > 0, onReplay: replay } }

  const t = useCountdown(config.birthday)
  if (t && !t.done && !preview) {
    return (
      <>
        <Starfield />
        <Locked t={t} />
      </>
    )
  }

  return (
    <>
      <Starfield />
      {config.effects?.sparkleCursor !== false && <SparkleTrail />}
      <MusicPlayer />
      {!started ? <Intro replay={replays > 0} onEnter={() => setStarted(true)} /> : (
        <>
          <ChapterNav items={chapters} />
          <main className="story">
            {enabled.map((id) => {
              const Scene = SCENES[id]
              return (
                <Fragment key={id}>
                  <Interlude text={fill(content.interludes?.[id] || '')} />
                  <Scene {...props[id]} />
                </Fragment>
              )
            })}
          </main>
        </>
      )}
    </>
  )
}
