import React from 'react'
import { AbsoluteFill, Sequence, staticFile } from 'remotion'
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans'
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond'
import { Scene } from './Scene'
import { Outro } from './Outro'

// Load brand fonts so Remotion has them ready at render time
loadDMSans('normal', { weights: ['400', '500', '600', '700'] })
loadCormorant('italic', { weights: ['500', '600'] })

// Composition timing (30fps):
//   Scene 1 (SEND)   : 0.0 - 3.5s   (105 frames)
//   Scene 2 (REPLY)  : 3.5 - 7.0s   (105 frames)
//   Scene 3 (CALL)   : 7.0 - 10.5s  (105 frames)
//   Scene 4 (CLOSE)  : 10.5 - 14.0s (105 frames)
//   OUTRO            : 14.0 - 17.0s (90 frames)
//   Total: 17 seconds (510 frames)

export const ANATOMY_FPS = 30
export const ANATOMY_DURATION_FRAMES = 510

const SCENE_FRAMES = 105 // 3.5s per scene
const OUTRO_FRAMES = 90 // 3s outro

export const AnatomyOfDeal: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d08' }}>
      {/* Scene 1 — THE SEND */}
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene1_send_v1.mp4')}
          startFrom={20}
          captionTime="6:14 AM"
          captionAction="Praecora drafts the opener."
        />
      </Sequence>

      {/* Scene 2 — THE REPLY */}
      <Sequence from={SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene2_reply_v1.mp4')}
          startFrom={40}
          captionTime="9:02 AM"
          captionAction="The artist replies."
        />
      </Sequence>

      {/* Scene 3 — THE CALL */}
      <Sequence from={SCENE_FRAMES * 2} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene3_call_v1.mp4')}
          startFrom={20}
          captionTime="Tuesday, 2 PM"
          captionAction="The call gets booked."
        />
      </Sequence>

      {/* Scene 4 — THE CLOSE */}
      <Sequence from={SCENE_FRAMES * 3} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene4_close_v1.mp4')}
          startFrom={20}
          captionTime="Friday"
          captionAction="Deal signed."
          captionEmphasis="$5K commission landed."
        />
      </Sequence>

      {/* Outro */}
      <Sequence from={SCENE_FRAMES * 4} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  )
}
