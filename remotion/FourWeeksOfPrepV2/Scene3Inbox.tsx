import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 3 — Quality checks. Inbox ready.
 *
 * Visual: A LARGE unified inbox panel filling most of the safe content area.
 * 4 rows (was 6) but each row much taller. Each row's status circle
 * transitions rust → green ✓ in sequence. Big READY stamp at the end.
 */
export const Scene3Inbox: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const ROWS = [
    { channel: 'ig', sender: '@studio.signals', preview: 'Reply routing', check: 20 },
    { channel: 'em', sender: 'manager@maple-cuts.co', preview: 'Deliverability', check: 32 },
    { channel: 'ig', sender: '@late.crate.audio', preview: 'AI classifier', check: 44 },
    { channel: 'em', sender: 'a&r@nightshore.io', preview: 'Send rate limits', check: 56 },
  ]

  const panelSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
    from: 0,
    to: 1,
  })

  const readyFrame = 78
  const readySpring = spring({
    frame: frame - readyFrame,
    fps,
    config: { damping: 10, mass: 0.6 },
    from: 0,
    to: 1,
  })
  const readyOpacity = interpolate(frame, [readyFrame, readyFrame + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

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
          position: 'relative',
          width: 1280,
          background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.08), rgba(250, 250, 249, 0.03))',
          border: '2px solid rgba(250, 250, 249, 0.15)',
          borderRadius: 24,
          padding: 44,
          opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(panelSpring, [0, 1], [0.96, 1])})`,
          boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(250, 250, 249, 0.6)',
            }}
          >
            Inbox QA — 4 checks
          </div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 20,
              color: 'rgba(250, 250, 249, 0.4)',
            }}
          >
            run #4
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ROWS.map((row, i) => {
            const isChecked = frame >= row.check
            const checkTransition = interpolate(frame, [row.check, row.check + 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            const pulse = isChecked ? 0 : 0.4 + 0.5 * Math.sin(frame * 0.4)

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  padding: '22px 28px',
                  background: 'rgba(15, 13, 8, 0.6)',
                  borderRadius: 14,
                  border: '1px solid rgba(250, 250, 249, 0.08)',
                }}
              >
                {/* Status circle — larger */}
                <div
                  style={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: isChecked ? '#10b981' : '#b8531d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isChecked ? 1 : pulse,
                    transform: `scale(${interpolate(checkTransition, [0, 1], [0.9, 1])})`,
                    flexShrink: 0,
                  }}
                >
                  {isChecked && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ opacity: checkTransition }}
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="#fafaf9"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Channel badge */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background:
                      row.channel === 'ig'
                        ? 'linear-gradient(135deg, #ec4899, #f97316)'
                        : '#3b82f6',
                    flexShrink: 0,
                  }}
                />

                {/* Sender */}
                <div
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 22,
                    color: 'rgba(250, 250, 249, 0.9)',
                    width: 380,
                  }}
                >
                  {row.sender}
                </div>

                {/* Check description */}
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 22,
                    color: 'rgba(250, 250, 249, 0.55)',
                    flex: 1,
                  }}
                >
                  {row.preview}
                </div>

                {/* Status text */}
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isChecked ? '#10b981' : '#b8531d',
                  }}
                >
                  {isChecked ? 'PASS' : 'CHECKING'}
                </div>
              </div>
            )
          })}
        </div>

        {/* READY stamp — larger */}
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            right: 44,
            opacity: readyOpacity,
            transform: `scale(${interpolate(readySpring, [0, 1], [0.6, 1])}) rotate(${interpolate(readySpring, [0, 1], [-8, -4])}deg)`,
            transformOrigin: 'center',
            padding: '22px 44px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: '4px solid rgba(250, 250, 249, 0.4)',
            borderRadius: 16,
            boxShadow: '0 16px 48px -12px rgba(16, 185, 129, 0.6), 0 0 0 6px rgba(15, 13, 8, 1)',
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#fafaf9',
            }}
          >
            READY
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
