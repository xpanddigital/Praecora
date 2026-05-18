import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Outro card: warm ivory bg, animated Praecora wordmark + tagline.
 * 3 seconds (90 frames).
 *
 * Timing:
 *   0-15f  : Background ivory wash fades in from black
 *   10-30f : Wordmark scales + fades in (spring)
 *   25-45f : Rust hairline draws in from center
 *   35-55f : Tagline fades up
 *   85-90f : Quick fade to black (handoff to loop or end)
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Background ivory fade-in
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  })

  // Wordmark spring entrance
  const wordmarkScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, mass: 0.8 },
    from: 0.92,
    to: 1,
  })
  const wordmarkOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Rust hairline draw-in
  const hairlineWidth = interpolate(frame, [25, 45], [0, 280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Tagline fade-up
  const taglineOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const taglineTranslate = interpolate(frame, [35, 55], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Final fade out (smooths loop / end)
  const finalFade = interpolate(frame, [85, 90], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ opacity: finalFade }}>
      {/* Black base (so the ivory bg can fade IN over it) */}
      <AbsoluteFill style={{ backgroundColor: '#0f0d08' }} />

      {/* Warm ivory bg with subtle gradient */}
      <AbsoluteFill
        style={{
          opacity: bgOpacity,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #ffffff 0%, #faf8f3 60%, #f0ece3 100%)',
        }}
      />

      {/* Composition */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `scale(${wordmarkScale})`,
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: 168,
            letterSpacing: '-0.04em',
            color: '#0f0d08',
            lineHeight: 1,
          }}
        >
          Praecora
        </div>

        {/* Rust hairline */}
        <div
          style={{
            width: hairlineWidth,
            height: 2,
            backgroundColor: '#b8531d',
            marginTop: 40,
            marginBottom: 36,
            borderRadius: 1,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslate}px)`,
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 46,
            color: '#0f0d08',
            letterSpacing: '-0.01em',
          }}
        >
          Outreach that doesn&apos;t feel like outreach.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
