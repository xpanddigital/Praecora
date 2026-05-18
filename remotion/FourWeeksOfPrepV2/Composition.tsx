import React from 'react'
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from 'remotion'
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans'
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond'
import { loadFont as loadJetBrains } from '@remotion/google-fonts/JetBrainsMono'
import { SceneChrome } from './SceneChrome'
import { Scene1Provision } from './Scene1Provision'
import { Scene2Voice } from './Scene2Voice'
import { Scene3Inbox } from './Scene3Inbox'
import { Scene4Live } from './Scene4Live'
import { Outro } from '../AnatomyOfDeal/Outro'

loadDMSans('normal', { weights: ['400', '500', '600', '700'] })
loadCormorant('italic', { weights: ['500', '600'] })
loadJetBrains('normal', { weights: ['400', '500', '600'] })

// Composition timing (30fps):
//   Scene 1 : 0.0 - 4.0s  (120 frames)  WEEK 1 — Account preparation begins
//   Scene 2 : 4.0 - 8.0s  (120 frames)  WEEK 2 — Brand voice tuned. Content seeded.
//   Scene 3 : 8.0 - 12.0s (120 frames)  WEEK 3 — Quality checks. Inbox ready.
//   Scene 4 : 12.0 - 16.0s (120 frames) WEEK 4 — Outreach goes live.
//   OUTRO   : 16.0 - 19.2s (96 frames)  Extended slightly for outro VO breathing room
//   Total: 19.2s (576 frames)

export const FWP_V2_FPS = 30
export const FWP_V2_DURATION_FRAMES = 576

const SCENE_FRAMES = 120
const OUTRO_FRAMES = 96
const VO_DELAY = 12 // ~0.4s into each scene before voiceover starts
const FADE_IN_FRAMES = 24 // 0.8s music fade-in
const FADE_OUT_FRAMES = 24 // 0.8s music fade-out
const MUSIC_VOLUME = 0.16 // background music level — quiet enough not to fight VO

/**
 * Music volume envelope — fades in over the first 24f, holds at
 * MUSIC_VOLUME, fades out over the last 24f. Avoids hard cuts.
 */
const musicVolume = (frame: number) => {
  if (frame < FADE_IN_FRAMES) {
    return interpolate(frame, [0, FADE_IN_FRAMES], [0, MUSIC_VOLUME])
  }
  if (frame > FWP_V2_DURATION_FRAMES - FADE_OUT_FRAMES) {
    return interpolate(
      frame,
      [FWP_V2_DURATION_FRAMES - FADE_OUT_FRAMES, FWP_V2_DURATION_FRAMES],
      [MUSIC_VOLUME, 0]
    )
  }
  return MUSIC_VOLUME
}

export const FourWeeksOfPrepV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d08' }}>
      {/* Background music — fades in/out, quiet enough to sit under VO */}
      <Audio src={staticFile('audio/bg-music.mp3')} volume={musicVolume} />

      {/* Subtle warm vignette throughout the video */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(15, 13, 8, 0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* WEEK 1 */}
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <SceneChrome
          weekNumber={1}
          weekLabel="WEEK 1"
          headline="Account preparation begins."
          calloutLabel="DEDICATED PRESENCE"
          calloutSublabel="Provisioning"
        >
          <Scene1Provision />
        </SceneChrome>
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/vo-week1.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* WEEK 2 */}
      <Sequence from={SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
        <SceneChrome
          weekNumber={2}
          weekLabel="WEEK 2"
          headline="Brand voice tuned. Content seeded."
          calloutLabel="AI VOICE"
          calloutSublabel="Tuning"
        >
          <Scene2Voice />
        </SceneChrome>
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/vo-week2.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* WEEK 3 */}
      <Sequence from={SCENE_FRAMES * 2} durationInFrames={SCENE_FRAMES}>
        <SceneChrome
          weekNumber={3}
          weekLabel="WEEK 3"
          headline="Quality checks. Inbox ready."
          calloutLabel="INBOX READY"
          calloutSublabel="QA pass complete"
        >
          <Scene3Inbox />
        </SceneChrome>
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/vo-week3.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* WEEK 4 */}
      <Sequence from={SCENE_FRAMES * 3} durationInFrames={SCENE_FRAMES}>
        <SceneChrome
          weekNumber={4}
          weekLabel="WEEK 4"
          headline="Outreach goes live."
          calloutLabel="LIVE"
          calloutSublabel="Sending"
          calloutAccent
        >
          <Scene4Live />
        </SceneChrome>
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/vo-week4.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* OUTRO */}
      <Sequence from={SCENE_FRAMES * 4} durationInFrames={OUTRO_FRAMES}>
        <Outro />
        {/* Outro VO plays immediately — no delay, matches the wordmark reveal */}
        <Audio src={staticFile('audio/vo-outro.mp3')} volume={1} />
      </Sequence>
    </AbsoluteFill>
  )
}
