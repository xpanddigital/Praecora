import React from 'react'
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from 'remotion'
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans'
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond'
import { Scene } from './Scene'
import { Outro } from './Outro'

// Load brand fonts so Remotion has them ready at render time
loadDMSans('normal', { weights: ['400', '500', '600', '700'] })
loadCormorant('italic', { weights: ['500', '600'] })

// Composition timing (30fps):
//   Scene 1 (SEND)   : 0.0 - 4.0s   (120 frames)
//   Scene 2 (REPLY)  : 4.0 - 8.0s   (120 frames)
//   Scene 3 (CALL)   : 8.0 - 12.0s  (120 frames)
//   Scene 4 (CLOSE)  : 12.0 - 16.0s (120 frames)
//   OUTRO            : 16.0 - 19.2s (96 frames)
//   Total: 19.2 seconds (576 frames)
//
// Extended from 17s → 19.2s so the new voiceover (3-3.5s per scene) has
// breathing room. Each scene is now 4s, allowing 12-frame VO_DELAY plus
// the full VO duration to play before the scene cross-fades out.

export const ANATOMY_FPS = 30
export const ANATOMY_DURATION_FRAMES = 576

const SCENE_FRAMES = 120
const OUTRO_FRAMES = 96
const VO_DELAY = 12 // 0.4s into each scene before VO starts
const FADE_IN_FRAMES = 24
const FADE_OUT_FRAMES = 24
const MUSIC_VOLUME = 0.16

/**
 * Music volume envelope — fades in/out so the track doesn't hard-cut.
 */
const musicVolume = (frame: number) => {
  if (frame < FADE_IN_FRAMES) {
    return interpolate(frame, [0, FADE_IN_FRAMES], [0, MUSIC_VOLUME])
  }
  if (frame > ANATOMY_DURATION_FRAMES - FADE_OUT_FRAMES) {
    return interpolate(
      frame,
      [ANATOMY_DURATION_FRAMES - FADE_OUT_FRAMES, ANATOMY_DURATION_FRAMES],
      [MUSIC_VOLUME, 0]
    )
  }
  return MUSIC_VOLUME
}

export const AnatomyOfDeal: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d08' }}>
      {/* Background music — shared ambient track, fades in/out */}
      <Audio src={staticFile('audio/bg-music.mp3')} volume={musicVolume} />

      {/* Scene 1 — THE SEND */}
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene1_send_v1.mp4')}
          startFrom={20}
          captionTime="6:14 AM"
          captionAction="Praecora drafts the opener."
        />
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/aod/vo-send.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* Scene 2 — THE REPLY */}
      <Sequence from={SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene2_reply_v1.mp4')}
          startFrom={40}
          captionTime="9:02 AM"
          captionAction="The artist replies."
        />
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/aod/vo-reply.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* Scene 3 — THE CALL */}
      <Sequence from={SCENE_FRAMES * 2} durationInFrames={SCENE_FRAMES}>
        <Scene
          src={staticFile('videos/raw/scene3_call_v1.mp4')}
          startFrom={20}
          captionTime="Tuesday, 2 PM"
          captionAction="The call gets booked."
        />
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/aod/vo-call.mp3')} volume={1} />
        </Sequence>
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
        <Sequence from={VO_DELAY}>
          <Audio src={staticFile('audio/aod/vo-close.mp3')} volume={1} />
        </Sequence>
      </Sequence>

      {/* Outro — slightly extended for VO to fully play */}
      <Sequence from={SCENE_FRAMES * 4} durationInFrames={OUTRO_FRAMES}>
        <Outro />
        <Audio src={staticFile('audio/aod/vo-outro.mp3')} volume={1} />
      </Sequence>
    </AbsoluteFill>
  )
}
