import { useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { music } from '../lib/music'

export default function MusicPlayer() {
  const [st, setSt] = useState({ playing: false, muted: false, error: false })
  useEffect(() => music.subscribe(setSt), [])
  if (!music.enabled) return null
  const status = st.error ? 'Add a music file' : st.playing ? music.title : 'Music paused'
  return (
    <div className={`music ${st.playing ? 'playing' : ''}`} role="group" aria-label="Background music">
      <button className="icon-btn" onClick={music.toggle} aria-label={st.playing ? 'Pause music' : 'Play music'}>
        {st.playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="status" aria-live="polite">{status}</span>
      <button className="icon-btn ghosty" onClick={() => music.setMuted(!st.muted)} aria-label={st.muted ? 'Unmute' : 'Mute'} aria-pressed={st.muted}>
        {st.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  )
}
