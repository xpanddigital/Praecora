import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 1 — Account preparation begins.
 *
 * Visual: 5 alias account cards animate in (staggered), each provisioning
 * from empty → ready. Connecting lines draw between them showing the
 * unified-presence concept. Status text types on at top.
 */
export const Scene1Provision: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const ACCOUNTS = [
    { handle: 'studio.signals', delay: 12 },
    { handle: 'late.crate.audio', delay: 18 },
    { handle: 'noon.records', delay: 24 },
    { handle: 'mira.session', delay: 30 },
    { handle: 'archive.acoustic', delay: 36 },
  ]

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Card group container */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          position: 'relative',
        }}
      >
        {ACCOUNTS.map((acc, i) => {
          // Card entrance spring
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

          // Each card transitions from "provisioning" (rust pulse) → "ready" (green dot)
          // ~30 frames after entrance
          const readyFrame = acc.delay + 30
          const isReady = frame >= readyFrame
          const readyTransition = interpolate(frame, [readyFrame, readyFrame + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })

          // Provisioning pulse opacity (while not yet ready)
          const provisioningPulse = isReady
            ? 0
            : 0.5 + 0.5 * Math.sin((frame - acc.delay) * 0.4)

          return (
            <div
              key={acc.handle}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.85, 1])})`,
                transformOrigin: 'center',
                width: 180,
                background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.06), rgba(250, 250, 249, 0.02))',
                border: '1px solid rgba(250, 250, 249, 0.12)',
                borderRadius: 16,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                position: 'relative',
              }}
            >
              {/* Avatar circle */}
              <div
                style={{
                  position: 'relative',
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #b8531d 0%, #e8ff47 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#0f0d08',
                  opacity: 0.4 + 0.6 * readyTransition,
                  transition: 'opacity 0.3s',
                }}
              >
                {acc.handle[0].toUpperCase()}
                {/* Status dot */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: isReady ? '#10b981' : '#b8531d',
                    border: '3px solid #0f0d08',
                    opacity: isReady ? 1 : provisioningPulse,
                  }}
                />
              </div>

              {/* Handle */}
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  color: 'rgba(250, 250, 249, 0.85)',
                  fontWeight: 500,
                }}
              >
                @{acc.handle}
              </div>

              {/* Status badge */}
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isReady ? '#10b981' : '#b8531d',
                  padding: '4px 8px',
                  borderRadius: 4,
                  background: isReady ? 'rgba(16, 185, 129, 0.12)' : 'rgba(184, 83, 29, 0.12)',
                  border: `1px solid ${isReady ? 'rgba(16, 185, 129, 0.3)' : 'rgba(184, 83, 29, 0.3)'}`,
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
