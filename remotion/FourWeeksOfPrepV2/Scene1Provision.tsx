import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 1 — Account preparation begins.
 *
 * Visual: 3 LARGE alias account cards animate in (staggered), each
 * provisioning from empty → ready. Sized to fill the frame so they're
 * legible at hero playback size (~600px wide).
 */
export const Scene1Provision: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const ACCOUNTS = [
    { handle: 'studio.signals', delay: 14 },
    { handle: 'late.crate.audio', delay: 22 },
    { handle: 'noon.records', delay: 30 },
  ]

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 48,
        }}
      >
        {ACCOUNTS.map((acc, i) => {
          const cardSpring = spring({
            frame: frame - acc.delay,
            fps,
            config: { damping: 14, mass: 0.8 },
            from: 0,
            to: 1,
          })
          const cardOpacity = interpolate(frame, [acc.delay, acc.delay + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })

          const readyFrame = acc.delay + 32
          const isReady = frame >= readyFrame
          const readyTransition = interpolate(frame, [readyFrame, readyFrame + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          const provisioningPulse = isReady
            ? 0
            : 0.5 + 0.5 * Math.sin((frame - acc.delay) * 0.4)

          return (
            <div
              key={acc.handle}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [60, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.85, 1])})`,
                transformOrigin: 'center',
                width: 380,
                background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.08), rgba(250, 250, 249, 0.03))',
                border: '2px solid rgba(250, 250, 249, 0.15)',
                borderRadius: 24,
                padding: '48px 36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 24,
                boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Avatar circle — much larger */}
              <div
                style={{
                  position: 'relative',
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #b8531d 0%, #e8ff47 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 56,
                  fontWeight: 700,
                  color: '#0f0d08',
                  opacity: 0.4 + 0.6 * readyTransition,
                }}
              >
                {acc.handle[0].toUpperCase()}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: isReady ? '#10b981' : '#b8531d',
                    border: '5px solid #0f0d08',
                    opacity: isReady ? 1 : provisioningPulse,
                  }}
                />
              </div>

              {/* Handle */}
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 26,
                  color: 'rgba(250, 250, 249, 0.9)',
                  fontWeight: 500,
                }}
              >
                @{acc.handle}
              </div>

              {/* Status badge — much bigger */}
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isReady ? '#10b981' : '#b8531d',
                  padding: '10px 18px',
                  borderRadius: 8,
                  background: isReady ? 'rgba(16, 185, 129, 0.14)' : 'rgba(184, 83, 29, 0.14)',
                  border: `2px solid ${isReady ? 'rgba(16, 185, 129, 0.35)' : 'rgba(184, 83, 29, 0.35)'}`,
                }}
              >
                {isReady ? 'READY' : 'PROVISIONING'}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
