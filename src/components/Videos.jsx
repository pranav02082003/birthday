import { useCallback, useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import videos from '../config/videos'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { music } from '../lib/music'
import { Reveal, SceneHeader, SafeImage, Modal } from './Common'

function Player({ v }) {
  const ref = useRef(null)
  const [err, setErr] = useState(false)
  // background music steps aside while a video plays, and comes back after
  useEffect(() => {
    const el = ref.current
    music.duck()
    return () => { el?.pause(); music.unduck() }
  }, [])
  if (err) return <div className="fallback vid-err"><span>This video file wasn’t found. Add it to public/media/videos/.</span></div>
  return <video ref={ref} className="vid" src={v.src} poster={v.poster} controls autoPlay playsInline onError={() => setErr(true)} />
}

export default function Videos() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  if (!videos.length) return null
  return (
    <section className="scene" id="videos">
      <SceneHeader title={fill(content.videos.title)} intro={fill(content.videos.intro)} subtitle={fill(content.videos.subtitle)} />
      <div className="video-grid">
        {videos.map((v, i) => (
          <Reveal key={i} delay={i * 120}>
            <button className="vcard" onClick={() => setOpen(i)} aria-label={`Play video: ${v.title}`}>
              <div className="thumb">
                <SafeImage src={v.poster} alt="" label="Video thumbnail" />
                <span className="play"><Play size={24} fill="currentColor" /></span>
              </div>
              <h3>{v.title}</h3><p>{v.caption}</p>
            </button>
          </Reveal>
        ))}
      </div>
      {open !== null && (
        <Modal label={videos[open].title} onClose={close} wide>
          <Player key={open} v={videos[open]} />
          <p className="lb-cap">{videos[open].title}</p>
        </Modal>
      )}
    </section>
  )
}
