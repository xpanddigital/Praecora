import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 2 — Brand voice tuned. Content seeded.
 *
 * Visual: A "voice profile" panel on the left with attribute sliders animating
 * to target positions, while a queue of 4 content draft cards appears on the
 * right with type-on text.
 */
export const Scene2Voice: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const VOICE_ATTRS = [
    { label: 'TONE', target: 0.72, delay: 8 },
    { label: 'WARMTH', target: 0.85, delay: 14 },
    { label: 'BREVITY', target: 0.62, delay: 20 },
    { label: 'AUTHORITY', target: 0.78, delay: 26 },
  ]

  const CONTENT_DRAFTS = [
    { delay: 36, text: 'Saw your set at the Chronograph last—' },
    { delay: 48, text: 'Loved the way you held that arpeggio—' },
    { delay: 60, text: 'Your catalog has actual market value—' },
    { delay: 72, text: 'Open to a 15-min conversation?' },
  ]

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 56,
        }}
      >
        {/* LEFT: Voice profile panel */}
        <div
          style={{
            width: 380,
            background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.06), rgba(250, 250, 249, 0.02))',
            border: '1px solid rgba(250, 250, 249, 0.12)',
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
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
              <div key={attr.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(250, 250, 249, 0.7)',
                  }}
                >
                  <span>{attr.label}</span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', color: '#b8531d' }}>
                    {Math.round(value * 100)}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: 'rgba(250, 250, 249, 0.08)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${value * 100}%`,
                      background: 'linear-gradient(90deg, #b8531d, #e8ff47)',
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT: Content draft cards */}
        <div
          style={{
            width: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
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
              marginBottom: 4,
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

            // Type-on text reveals one character at a time
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
                  transform: `translateX(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                  background: 'linear-gradient(180deg, rgba(250, 250, 249, 0.06), rgba(250, 250, 249, 0.02))',
                  border: '1px solid rgba(250, 250, 249, 0.12)',
                  borderRadius: 10,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                {/* Channel icon */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
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
                    fontSize: 15,
                    color: 'rgba(250, 250, 249, 0.85)',
                    flex: 1,
                  }}
                >
                  {draft.text.slice(0, charsRevealed)}
                  {charsRevealed < draft.text.length && (
                    <span style={{ color: '#b8531d', marginLeft: 1 }}>▎</span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: charsRevealed >= draft.text.length ? '#10b981' : '#b8531d',
                    padding: '3px 7px',
                    borderRadius: 3,
                    background:
                      charsRevealed >= draft.text.length
                        ? 'rgba(16, 185, 129, 0.12)'
                        : 'rgba(184, 83, 29, 0.12)',
                    border: `1px solid ${
                      charsRevealed >= draft.text.length
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(184, 83, 29, 0.3)'
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
