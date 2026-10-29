// ✏️ EDIT ME: all the words.
// Placeholders: {name} = nickname or name, {from} = sender, {age} = age, {ageth} = "25th", {date} = birthday date.
export default {
  nav: {
    countdown: 'Countdown', greeting: 'Hello', reasons: 'Reasons', timeline: 'Our story', gallery: 'Photos',
    videos: 'Videos', stars: 'The stars', letters: 'Letter', cake: 'Make a wish', final: 'Finale',
  },

  intro: {
    prelude: 'Tap anywhere to begin',
    soundHint: '🎧 best with the sound on',
    lines: [
      'Hey {name}…',
      'Before your phone starts buzzing and everyone wants a piece of your day,',
      'I made you a little corner of the internet that’s only yours.',
      'It has saree days, cat faces, ice cream, and far too many photos of you.',
      'Because somewhere between MVGR corridors and random meetups,',
      'you became one of my favourite people.',
      'So here’s your story — told my way.',
    ],
    tapHint: 'tap to continue',
    giftPrompt: 'A small gift from {from}. Open it whenever you’re ready.',
    skip: 'Skip intro',
  },

  // Short narrated lines that appear *before* the chapter they're named after,
  // so the whole page reads like one story. Set any to '' to hide it.
  interludes: {
    reasons: 'Before the photos and the memories, a few things I don’t say often enough…',
    timeline: 'Every one of those reasons has a story behind it. Here are some of mine.',
    gallery: 'Of course, some stories are better told in pictures. You gave me a lot of them.',
    videos: 'And a few of them simply refused to stand still.',
    stars: 'When the day is over and the sky goes dark, look up. I left something there for you.',
    letters: 'And some things are better said in a letter…',
    cake: 'Now, the most important birthday tradition of all.',
    final: 'Which brings us to the end of this little story — but only this one.',
  },

  // Shown instead of everything else until the countdown hits zero
  locked: {
    title: 'Not yet, {name} 👀',
    subtitle: 'Something is waiting for you here — but it only opens on your birthday.',
    until: 'unlocks on {date}',
    hint: 'No peeking. This page opens by itself the moment the clock hits zero.',
  },

  countdown: {
    title: 'The stars are lining up for your day',
    subtitle: 'Every second that ticks by is one second closer to celebrating you.',
    until: 'until {date}',
    done: 'It’s finally here, {name}!',
    doneSub: 'Today the whole sky is yours. Keep scrolling — there’s a whole story waiting below.',
  },

  greeting: {
    eyebrow: 'Today we celebrate',
    title: 'Happy Birthday',
    ageLine: 'Celebrating your {ageth} trip around the sun',
    body: 'Another year of you — the smile behind the specs, the laugh that takes over a room, the attitude that shows up the moment the sunglasses go on, and the way you stand by your people. This little website is a scrapbook, a thank-you note and a party all at once. Take your time. Scroll slowly. Every chapter was made with you in mind.',
    scrollHint: 'Begin the story',
  },

  reasons: {
    title: 'Things That Make You, You',
    subtitle: 'Tap each card to turn it over.',
    intro: 'If I tried to write down everything that makes you a great friend, this page would never stop scrolling. So here are just a few — the ones that come to mind first.',
    progress: '{n} of {total} discovered',
    allDone: '…and plenty more that would never fit on one page.',
  },

  timeline: {
    title: 'Our Story So Far',
    subtitle: 'A few moments worth keeping forever.',
    intro: 'From the first year we met at MVGR to the farewell lights and beyond — these are a few of the chapters I’d happily relive.',
    more: 'Read the full story',
    less: 'Show less',
  },

  gallery: {
    title: 'Moments in Light',
    subtitle: 'Tap a photo to see it up close.',
    intro: 'Saree days, specs smiles, cat faces and a few that need no explanation — the moments the camera managed to catch.',
  },

  videos: {
    title: 'Memories in Motion',
    subtitle: 'Press play on the good times.',
    intro: 'Photos freeze a moment, but videos let you live it again. Turn the volume up and press play.',
  },

  stars: {
    title: 'Written in the Stars',
    subtitle: 'Tap the glowing star to connect the next one.',
    intro: 'They say the night sky tells stories, if you know how to read it. I hid one up here just for you. Connect the stars one by one and see what it says.',
    helper: 'Connect them for me',
    done: 'Some friendships are simply meant to be. Ours is right at the top of that list.',
  },

  letters: {
    title: 'A Letter, Just for You',
    subtitle: 'Break the seal when you’re ready.',
    intro: 'I wrote this for you to read today — and to come back to whenever you need reminding of how much you matter.',
    to: 'For {name}',
  },

  cake: {
    title: 'Make a Wish',
    intro: 'No birthday is complete without candles. So take a moment — a real one — and think about what you truly want this year. Big or small, silly or serious, it all counts.',
    wishPrompt: 'Close your eyes. Think of something you truly want — and hold on to it.',
    wishPlaceholder: 'Whisper your wish here (optional — it’s never saved or sent anywhere)',
    wishButton: 'I’ve made my wish',
    blowPrompt: 'Now take a deep breath…',
    blowHint: 'Tap the flames, press the button — or blow into your microphone.',
    blowButton: 'Blow out the candles',
    micButton: 'Use my breath',
    micListening: 'Listening… blow!',
    micError: 'Couldn’t reach the microphone — tap the flames instead.',
    result: 'Your wish is on its way to the stars ✨',
    resultSub: 'May every single part of it come true — and may you never stop making wishes.',
    relight: 'Light them again',
  },

  final: {
    kicker: 'One last thing before you go…',
    message: `You make the people around you a little happier just by being there — and I don’t think you always realise it.

I hope this year is good to you. I hope it surprises you with good news when you least expect it, long laughs that make your stomach hurt, new places to see, and plenty of reasons to dress up and twirl.

I hope you chase the things that make you happy, and rest when you need to. I hope you’re proud of how far you’ve come — from MVGR to wherever you’re heading next.

And whenever you forget how special you are, come back here. It’ll still be saying the same thing.`,
    signoff: 'Happy birthday, Jaanu!',
    replay: 'Replay the story',
    photos: 'Revisit the photos',
    footer: 'Made by {from}, just for you.',
  },
}
