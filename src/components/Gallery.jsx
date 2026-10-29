import { useCallback, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import photos from '../config/photos'
import content from '../config/birthdayContent'
import { fill } from '../lib/fill'
import { Reveal, SceneHeader, SafeImage, Modal } from './Common'

const TILT = [-3, 2.2, -1.4, 2.8, -2.2, 1.6]

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const touchX = useRef(0)
  const n = photos.length
  const close = useCallback(() => setOpen(null), [])
  const go = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n])
  const onKey = useCallback((e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }, [go])
  if (!n) return null
  return (
    <section className="scene" id="gallery">
      <SceneHeader title={fill(content.gallery.title)} intro={fill(content.gallery.intro)} subtitle={fill(content.gallery.subtitle)} />
      <div className="gallery">
        {photos.map((p, i) => (
          <Reveal key={i} delay={(i % 3) * 110}>
            <button className="polaroid" style={{ '--rot': `${TILT[i % TILT.length]}deg` }} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
              <span className="pic"><SafeImage src={p.src} alt={p.alt} label={`Photo ${i + 1}`} /></span>
              <span className="pcap">{p.caption}</span>
            </button>
          </Reveal>
        ))}
      </div>
      {open !== null && (
        <Modal label="Photo viewer" onClose={close} onKey={onKey} wide>
          <div
            className="lightbox"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }}
          >
            <div className="lb-frame" key={open}>
              <SafeImage src={photos[open].src} alt={photos[open].alt} className="lb-img" label={`Photo ${open + 1}`} />
            </div>
            <p className="lb-cap">{photos[open].caption}</p>
            <p className="lb-count">{open + 1} / {n}</p>
            {n > 1 && <>
              <button className="icon-btn nav prev" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft /></button>
              <button className="icon-btn nav next" onClick={() => go(1)} aria-label="Next photo"><ChevronRight /></button>
            </>}
          </div>
        </Modal>
      )}
    </section>
  )
}
