import React from 'react'
import { Composition } from 'remotion'
import { AnatomyOfDeal, ANATOMY_DURATION_FRAMES, ANATOMY_FPS } from './AnatomyOfDeal/Composition'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AnatomyOfDeal"
        component={AnatomyOfDeal}
        durationInFrames={ANATOMY_DURATION_FRAMES}
        fps={ANATOMY_FPS}
        width={1920}
        height={1080}
      />
    </>
  )
}
