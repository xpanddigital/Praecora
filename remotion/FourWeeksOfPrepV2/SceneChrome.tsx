import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

type Props = {
  weekNumber: 1 | 2 | 3 | 4
  weekLabel: string
  headline: string
  calloutLabel: string
  calloutSublabel: string
  /** Highlights this scene's callout dot in yellow (used for the LIVE scene) */
  calloutAccent?: boolean
  children?: React.ReactNode
}

/**
 * Shared chrome around each motion-graphics scene:
 *   - Top: 4-step progress bar (current week highlighted in rust)
 *   - Right-side: glassy UI callout box describing this week's action
 *   - Bottom-left: rust hairline + WEEK label + 72pt caption
 *   - Subtle scene fade-in/fade-out at boundaries
 *
 * The {children} slot is where the per-week animation lives.
 */
export const SceneChrome: React.FC<Props> = ({
  weekNumber,
  weekLabel,
  headline,
  calloutLabel,
  calloutSublabel,
  calloutAccent = false,
  children,
}) => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Scene fade in/out at boundaries
  const sceneOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Caption fade-up
  const captionOpacity = interpolate(
    frame,
    [22, 32, durationInFrames - 12, durationInFrames - 6],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const captionTranslate = interpolate(frame, [22, 36], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Callout spring entrance
  const calloutSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.7 },
    from: 0,
    to: 1,
  })
  const calloutOpacity = interpolate(
    frame,
    [30, 44, durationInFrames - 12, durationInFrames - 6],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Progress bar fade-in
  const progressOpacity = interpolate(
    frame,
    [0, 10, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      {/* Subtle grid texture background — very low opacity */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(250, 250, 249, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 250, 249, 0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '-1px -1px',
          pointerEvents: 'none',
        }}
      />

      {/* Animated scene content (per-week) */}
      <AbsoluteFill>{children}</AbsoluteFill>

      {/* TOP — 4-step progress bar */}
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
          zIndex: 20,
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: isCurrent
                    ? '#b8531d'
                    : isComplete
                    ? 'rgba(184, 83, 29, 0.4)'
                    : 'rgba(250, 250, 249, 0.12)',
                  border: isCurrent
                    ? '2px solid #fafaf9'
                    : '2px solid rgba(250, 250, 249, 0.25)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#fafaf9',
                }}
              >
                {isComplete ? '✓' : w}
              </div>
              {w < 4 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor:
                      isComplete || isCurrent
                        ? '#b8531d'
                        : 'rgba(250, 250, 249, 0.18)',
                    borderRadius: 1,
                    opacity: isComplete ? 0.6 : isCurrent ? 0.4 : 1,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* UPPER-RIGHT — UI callout */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          right: 56,
          opacity: calloutOpacity,
          transform: `translateX(${interpolate(calloutSpring, [0, 1], [40, 0])}px) scale(${interpolate(calloutSpring, [0, 1], [0.95, 1])})`,
          transformOrigin: 'right center',
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: 'rgba(15, 13, 8, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(250, 250, 249, 0.12)',
            borderRadius: 12,
            padding: '14px 18px',
            boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
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

      {/* BOTTOM-LEFT — week label + headline */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 80,
          maxWidth: 960,
          opacity: captionOpacity,
          transform: `translateY(${captionTranslate}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 72,
            height: 3,
            backgroundColor: '#b8531d',
            marginBottom: 24,
            borderRadius: 1.5,
          }}
        />
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
