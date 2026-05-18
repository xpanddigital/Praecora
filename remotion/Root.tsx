import React from 'react'
import { Composition } from 'remotion'
import { AnatomyOfDeal, ANATOMY_DURATION_FRAMES, ANATOMY_FPS } from './AnatomyOfDeal/Composition'
import { FourWeeksOfPrep, FWP_DURATION_FRAMES, FWP_FPS } from './FourWeeksOfPrep/Composition'

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
      <Composition
        id="FourWeeksOfPrep"
        component={FourWeeksOfPrep}
        durationInFrames={FWP_DURATION_FRAMES}
        fps={FWP_FPS}
        width={1920}
        height={1080}
      />
    </>
  )
}
