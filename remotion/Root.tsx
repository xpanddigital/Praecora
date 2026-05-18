import React from 'react'
import { Composition } from 'remotion'
import { AnatomyOfDeal, ANATOMY_DURATION_FRAMES, ANATOMY_FPS } from './AnatomyOfDeal/Composition'
import { FourWeeksOfPrepV2, FWP_V2_DURATION_FRAMES, FWP_V2_FPS } from './FourWeeksOfPrepV2/Composition'

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
        component={FourWeeksOfPrepV2}
        durationInFrames={FWP_V2_DURATION_FRAMES}
        fps={FWP_V2_FPS}
        width={1920}
        height={1080}
      />
    </>
  )
}
