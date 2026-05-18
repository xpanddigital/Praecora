import React from 'react'
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

type SceneProps = {
  src: string
  startFrom: number
  weekNumber: 1 | 2 | 3 | 4
  weekLabel: string
  headline: string
  calloutLabel: string
  calloutSublabel: string
  /** Highlights this scene's progress dot in yellow (used for the launch scene) */
  calloutAccent?: boolean
}

/**
 * Scene with motion-graphics overlay layer for "pop":
 *   - Top progress bar showing 1/4 → 4/4 (this scene highlighted)
 *   - UI callout box in the upper right (designer annotation pointing at the action)
 *   - Bottom-left week label + headline caption
 *   - Animated checkmarks for completed weeks
 *   - Cross-fade in/out at scene boundaries
 */
export const Scene: React.FC<SceneProps> = ({
  src,
  startFrom,
  weekNumber,
  weekLabel,
  headline,
  calloutLabel,
  calloutSublabel,
  calloutAccent = false,
}) => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Video cross-fade (6 frames each side)
  const videoOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Caption fade-up
  const captionOpacity = interpolate(
    frame,
    [18, 28, durationInFrames - 12, durationInFrames - 6],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const captionTranslate = interpolate(
    frame,
    [18, 32],
    [16, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // UI callout — appears slightly later than the caption, slides in from right
  const calloutSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 14, mass: 0.7 },
    from: 0,
    to: 1,
  })
  const calloutOpacity = interpolate(
    frame,
    [24, 36, durationInFrames - 12, durationInFrames - 6],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Progress dots — fully visible throughout
  const progressOpacity = interpolate(
    frame,
    [0, 8, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d08' }}>
      {/* Source video */}
      <AbsoluteFill style={{ opacity: videoOpacity }}>
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          muted
        />
      </AbsoluteFill>

      {/* Warm tonal vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(15, 13, 8, 0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* TOP — progress bar (4 segments, current week highlighted in rust) */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 56,
          right: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity: progressOpacity,
        }}
      >
        {[1, 2, 3, 4].map((w) => {
          const isCurrent = w === weekNumber
          const isComplete = w < weekNumber
          return (
            <div
              key={w}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flex: 1,
              }}
            >
              {/* Week dot */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: isCurrent
                    ? '#b8531d'
                    : isComplete
                    ? 'rgba(184, 83, 29, 0.4)'
                    : 'rgba(250, 250, 249, 0.15)',
                  border: isCurrent
                    ? '2px solid #fafaf9'
                    : '2px solid rgba(250, 250, 249, 0.3)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#fafaf9',
                  transition: 'background-color 0.3s',
                }}
              >
                {isComplete ? '✓' : w}
              </div>
              {/* Connector line */}
              {w < 4 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor:
                      isComplete || isCurrent
                        ? '#b8531d'
                        : 'rgba(250, 250, 249, 0.2)',
                    borderRadius: 1,
                    opacity: isComplete ? 0.6 : isCurrent ? 0.4 : 1,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* UPPER-RIGHT — UI callout annotation */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          right: 56,
          opacity: calloutOpacity,
          transform: `translateX(${interpolate(calloutSpring, [0, 1], [40, 0])}px) scale(${interpolate(calloutSpring, [0, 1], [0.95, 1])})`,
          transformOrigin: 'right center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: 'rgba(15, 13, 8, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(250, 250, 249, 0.12)',
            borderRadius: 12,
            padding: '14px 18px',
            boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)',
          }}
        >
          {/* Status dot */}
          <div
            style={{
              position: 'relative',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: calloutAccent ? '#e8ff47' : '#b8531d',
              boxShadow: calloutAccent
                ? '0 0 12px rgba(232, 255, 71, 0.6)'
                : '0 0 12px rgba(184, 83, 29, 0.6)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#fafaf9',
              }}
            >
              {calloutLabel}
            </div>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                fontWeight: 400,
                color: 'rgba(250, 250, 249, 0.65)',
              }}
            >
              {calloutSublabel}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM-LEFT — week label + headline caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 96,
          left: 96,
          maxWidth: 960,
          opacity: captionOpacity,
          transform: `translateY(${captionTranslate}px)`,
        }}
      >
        {/* Rust hairline */}
        <div
          style={{
            width: 72,
            height: 3,
            backgroundColor: '#b8531d',
            marginBottom: 24,
            borderRadius: 1.5,
          }}
        />
        {/* Week label */}
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#fafaf9',
            opacity: 0.85,
            marginBottom: 12,
          }}
        >
          {weekLabel}
        </div>
        {/* Headline */}
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#fafaf9',
          }}
        >
          {headline}
        </div>
      </div>
    </AbsoluteFill>
  )
}
