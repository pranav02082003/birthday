# 🎂 Birthday Surprise

A dreamy, cinematic birthday website (React + Vite). Frontend only — no backend, no API keys.

**The story:** tap to begin (music starts) → typed intro lines → a gift box that bursts open →
countdown → greeting → *Reasons* flip cards → timeline (with expandable stories) → polaroid gallery → videos →
*Written in the Stars* (tap stars to draw a "J" constellation) → sealed letter → a cake you can blow out
(even with your real breath into the mic) → finale with fireworks. Short narrated lines bridge each chapter.

## Run it locally
1. Install **Node.js 18+ (LTS)** from https://nodejs.org if `node -v` fails.
2. Open a terminal in the `birthday-surprise` folder.
3. `npm install`
4. `npm run dev` and open the URL it prints (usually http://localhost:5173).

The site works immediately with placeholder content; missing photos/videos show soft fallbacks.

## Personalize (everything lives in `src/config/`)
| File | What it controls |
| --- | --- |
| `birthdayConfig.js` | Name, nickname, **from** (your name), age, birthday date, number of candles, music, colors, effects, which scenes show |
| `birthdayContent.js` | Every piece of text: intro lines, chapter intros, the narrated `interludes` between chapters, cake prompts, final message |
| `reasons.js` | The flip cards — little reasons you love them |
| `memories.js` | Timeline entries (`photo` and a longer `details` story are optional) |
| `photos.js` | Gallery photos + handwritten-style captions |
| `videos.js` | Videos and their posters |
| `letters.js` | One or more letters (with a handwritten signature) |

Placeholders you can use in any text: `{name}`, `{from}`, `{age}`, `{ageth}` (e.g. "25th"), `{date}`.

**Tip:** the most impactful thing you can do is make the *reasons*, *memories* and *letter* specific. Inside jokes beat poetry.

### Media
- Photos → `public/media/photos/`, then list them in `photos.js` (`src: '/media/photos/my-photo.jpg'`).
- Videos → `public/media/videos/` (H.264 MP4, keep them small), posters → `public/media/posters/`.
- Music → `public/media/music/birthday-song.mp3` (or change the path). It starts when they tap "begin",
  fades in gently, and pauses automatically while a video plays. Use music you have rights to. `src: ''` hides the player.

### Countdown
Set `birthday` in `birthdayConfig.js` (local time). After that moment the countdown turns into a fireworks celebration.
An invalid or empty date hides it.

### Effects & scenes
`effects: { sparkleCursor, fireworks }` toggles the cursor trail and fireworks. Hide any scene with `scenes: { stars: false, ... }`.
Animations are automatically toned down for people who have "reduce motion" turned on.

The microphone is only used if they press **Use my breath** on the cake; audio is analyzed locally and never recorded or sent anywhere.
The typed wish is never saved either.

## Build and deploy
```
npm run build
npm run preview
```
**Vercel:** push to GitHub → https://vercel.com → *Add New Project* → import → Deploy.
**Netlify:** `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop.

The mic feature needs HTTPS (both hosts above provide it) or localhost.

Everything in `public/` (photos, videos, music) becomes publicly reachable by anyone with the link after deployment — only upload what you're happy to share.
