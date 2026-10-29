// ✏️ EDIT ME: core settings
export default {
  recipientName: 'Jahnavi',         // their full name
  nickname: 'Jaanu',                // optional; used everywhere instead of the name if set
  from: 'Pranav',                   // who this is from — used in signatures and the wax seal
  age: null,                        // optional number, e.g. 25 → "your 25th trip around the sun"
  birthday: '2026-11-01T00:00:00',  // local time, format YYYY-MM-DDTHH:mm:ss
  cakeCandles: 5,                   // 1–9 candles on the cake
  music: { src: '', title: 'Our little soundtrack', volume: 0.55 }, // add an mp3 to public/media/music/ and set src, e.g. '/media/music/birthday-song.mp3'
  theme: {                          // colors (applied as CSS variables)
    navy: '#0b0b2b', purple: '#2a1458', lavender: '#b9a4ff',
    blush: '#ffc2d9', gold: '#e8c97a', text: '#f4efff',
  },
  effects: { sparkleCursor: true, fireworks: true },
  scenes: {                         // set false to hide a scene
    intro: true, countdown: true, greeting: true, reasons: true, timeline: true, gallery: true,
    videos: true, stars: true, letters: true, cake: true, final: true,
  },
}
