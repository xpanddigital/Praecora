import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 3 — Quality checks. Inbox ready.
 *
 * Visual: A unified inbox mockup with multiple rows. Each row passes a quality
 * check (rust dot → green ✓) in sequence. Finally a big "READY" badge stamps
 * in at the bottom right.
 */
export const Scene3Inbox: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const ROWS = [
    { channel: 'ig', sender: '@studio.signals', preview: 'reply routing', check: 18 },
    { channel: 'em', sender: 'manager@maple-cuts.co', preview: 'deliverability', check: 26 },
    { channel: 'ig', sender: '@late.crate.audio', preview: 'reply classifier', check: 34 },
    { channel: 'em', sender: 'a&r@nightshore.io', preview: 'follow-up sequence', check: 42 },
    { channel: 'ig', sender: '@noon.records', preview: 'AI reply suggester', check: 50 },
    { channel: 'em', sender: 'team@steeple-music.com', preview: 'send rate limits', check: 58 },
  ]

  // Inbox panel entrance
  const panelSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
    from: 0,
    to: 1,
  })

  // READY stamp
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
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 800,
          background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.06), rgba(250, 250, 249, 0.02))',
          border: '1px solid rgba(250, 250, 249, 0.12)',
          borderRadius: 16,
          padding: 32,
          opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(panelSpring, [0, 1], [0.96, 1])})`,
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(250, 250, 249, 0.5)',
            }}
          >
            Inbox QA — 6 checks
          </div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: 'rgba(250, 250, 249, 0.4)',
            }}
          >
            run #4
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                  gap: 14,
                  padding: '14px 16px',
                  background: 'rgba(15, 13, 8, 0.5)',
                  borderRadius: 10,
                  border: '1px solid rgba(250, 250, 249, 0.06)',
                }}
              >
                {/* Status circle */}
                <div
                  style={{
                    position: 'relative',
                    width: 28,
                    height: 28,
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
                      width="14"
                      height="14"
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
                    width: 28,
                    height: 28,
                    borderRadius: 6,
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
                    fontSize: 13,
                    color: 'rgba(250, 250, 249, 0.85)',
                    width: 240,
                  }}
                >
                  {row.sender}
                </div>

                {/* Check description */}
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 13,
                    color: 'rgba(250, 250, 249, 0.5)',
                    flex: 1,
                  }}
                >
                  {row.preview}
                </div>

                {/* Status text */}
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 10,
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

        {/* READY stamp — appears after all checks pass */}
        <div
          style={{
            position: 'absolute',
            bottom: -28,
            right: 32,
            opacity: readyOpacity,
            transform: `scale(${interpolate(readySpring, [0, 1], [0.6, 1])}) rotate(${interpolate(readySpring, [0, 1], [-8, -4])}deg)`,
            transformOrigin: 'center',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: '3px solid rgba(250, 250, 249, 0.4)',
            borderRadius: 12,
            boxShadow: '0 12px 32px -8px rgba(16, 185, 129, 0.5), 0 0 0 4px rgba(15, 13, 8, 1)',
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 22,
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
