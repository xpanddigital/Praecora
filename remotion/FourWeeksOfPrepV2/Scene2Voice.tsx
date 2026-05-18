import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 2 — Brand voice tuned. Content seeded.
 *
 * Visual: Larger voice profile panel on the left, fewer but bigger content
 * draft cards on the right. Sized to read clearly at hero playback width.
 */
export const Scene2Voice: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const VOICE_ATTRS = [
    { label: 'TONE', target: 0.72, delay: 10 },
    { label: 'WARMTH', target: 0.85, delay: 18 },
    { label: 'BREVITY', target: 0.62, delay: 26 },
  ]

  const CONTENT_DRAFTS = [
    { delay: 38, text: 'Saw your set at the Chronograph last—' },
    { delay: 56, text: 'Loved the arpeggio in your latest—' },
    { delay: 74, text: 'Your catalog has actual market value.' },
  ]

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
        }}
      >
        {/* LEFT: Voice profile panel — much larger */}
        <div
          style={{
            width: 540,
            background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.08), rgba(250, 250, 249, 0.03))',
            border: '2px solid rgba(250, 250, 249, 0.15)',
            borderRadius: 24,
            padding: 44,
            display: 'flex',
            flexDirection: 'column',
            gap: 36,
            boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.4)',
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
            Voice profile
          </div>

          {VOICE_ATTRS.map((attr) => {
            const value = interpolate(
              frame,
              [attr.delay, attr.delay + 24],
              [0, attr.target],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
            return (
              <div key={attr.label} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(250, 250, 249, 0.8)',
                    }}
                  >
                    {attr.label}
                  </span>
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 28,
                      fontWeight: 600,
                      color: '#b8531d',
                    }}
                  >
                    {Math.round(value * 100)}
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: 'rgba(250, 250, 249, 0.1)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${value * 100}%`,
                      background: 'linear-gradient(90deg, #b8531d, #e8ff47)',
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT: Content draft cards — bigger, fewer */}
        <div
          style={{
            width: 620,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
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
              marginBottom: 8,
            }}
          >
            Content drafts
          </div>

          {CONTENT_DRAFTS.map((draft, i) => {
            const cardSpring = spring({
              frame: frame - draft.delay,
              fps,
              config: { damping: 14, mass: 0.8 },
              from: 0,
              to: 1,
            })
            const cardOpacity = interpolate(frame, [draft.delay, draft.delay + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            const charsRevealed = Math.floor(
              interpolate(frame, [draft.delay + 6, draft.delay + 26], [0, draft.text.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            )

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `translateX(${interpolate(cardSpring, [0, 1], [60, 0])}px)`,
                  background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.08), rgba(250, 250, 249, 0.03))',
                  border: '2px solid rgba(250, 250, 249, 0.15)',
                  borderRadius: 16,
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  boxShadow: '0 16px 40px -12px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(135deg, #ec4899, #f97316)'
                        : '#3b82f6',
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 22,
                    color: 'rgba(250, 250, 249, 0.9)',
                    flex: 1,
                    lineHeight: 1.3,
                  }}
                >
                  {draft.text.slice(0, charsRevealed)}
                  {charsRevealed < draft.text.length && (
                    <span style={{ color: '#b8531d', marginLeft: 2 }}>▎</span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: charsRevealed >= draft.text.length ? '#10b981' : '#b8531d',
                    padding: '6px 12px',
                    borderRadius: 6,
                    background:
                      charsRevealed >= draft.text.length
                        ? 'rgba(16, 185, 129, 0.14)'
                        : 'rgba(184, 83, 29, 0.14)',
                    border: `2px solid ${
                      charsRevealed >= draft.text.length
                        ? 'rgba(16, 185, 129, 0.35)'
                        : 'rgba(184, 83, 29, 0.35)'
                    }`,
                  }}
                >
                  {charsRevealed >= draft.text.length ? 'QUEUED' : 'DRAFTING'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}
