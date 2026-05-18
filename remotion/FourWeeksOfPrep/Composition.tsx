import React from 'react'
import { AbsoluteFill, Sequence, staticFile } from 'remotion'
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans'
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond'
import { Scene } from './Scene'
import { Outro } from './Outro'

loadDMSans('normal', { weights: ['400', '500', '600', '700'] })
loadCormorant('italic', { weights: ['500', '600'] })

// Composition timing (30fps):
//   Scene 1 (WEEK 1)   : 0.0 - 3.5s   (105 frames)
//   Scene 2 (WEEK 2)   : 3.5 - 7.0s   (105 frames)
//   Scene 3 (WEEK 3)   : 7.0 - 10.5s  (105 frames)
//   Scene 4 (WEEK 4)   : 10.5 - 14.0s (105 frames)
//   OUTRO              : 14.0 - 17.0s (90 frames)
//   Total: 17 seconds (510 frames)

export const FWP_FPS = 30
export const FWP_DURATION_FRAMES = 510

const SCENE_FRAMES = 105
const OUTRO_FRAMES = 90

export const FourWeeksOfPrep: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d08' }}>
      {/* WEEK 1 — Account preparation begins */}
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/4wp/NEW-w1-laptop-init.mp4')}
          startFrom={20}
          weekNumber={1}
          weekLabel="WEEK 1"
          headline="Account preparation begins."
          calloutLabel="DEDICATED PRESENCE"
          calloutSublabel="Provisioning"
        />
      </Sequence>

      {/* WEEK 2 — Brand voice tuned. Content seeded. */}
      <Sequence from={SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/4wp/NEW-w2-screen-typing-whiteboard.mp4')}
          startFrom={20}
          weekNumber={2}
          weekLabel="WEEK 2"
          headline="Brand voice tuned. Content seeded."
          calloutLabel="AI VOICE"
          calloutSublabel="Tuning"
        />
      </Sequence>

      {/* WEEK 3 — Quality checks. Inbox ready. */}
      <Sequence from={SCENE_FRAMES * 2} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/4wp/NEW-w3-inbox-qa.mp4')}
          startFrom={20}
          weekNumber={3}
          weekLabel="WEEK 3"
          headline="Quality checks. Inbox ready."
          calloutLabel="INBOX READY"
          calloutSublabel="QA pass complete"
        />
      </Sequence>

      {/* WEEK 4 — Outreach goes live */}
      <Sequence from={SCENE_FRAMES * 3} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/4wp/NEW-w4-launch-notification.mp4')}
          startFrom={20}
          weekNumber={4}
          weekLabel="WEEK 4"
          headline="Outreach goes live."
          calloutLabel="LIVE"
          calloutSublabel="Sending"
          calloutAccent
        />
      </Sequence>

      {/* OUTRO */}
      <Sequence from={SCENE_FRAMES * 4} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  )
}
