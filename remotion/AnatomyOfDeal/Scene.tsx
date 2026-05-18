import React from 'react'
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

type SceneProps = {
  src: string
  /** Frame in the source clip to start playback from (trims the source) */
  startFrom: number
  captionTime: string
  captionAction: string
  /** Optional emphasis line (rendered in italic accent) */
  captionEmphasis?: string
}

/**
 * Reusable scene wrapper:
 *  - Plays a trimmed segment of the source clip
 *  - Cross-fades video in/out at scene boundaries (smooths transitions)
 *  - Overlays a typographic caption with a staggered fade
 */
export const Scene: React.FC<SceneProps> = ({
  src,
  startFrom,
  captionTime,
  captionAction,
  captionEmphasis,
}) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  // Video cross-fade: 6 frames in (200ms), 6 frames out
  const videoOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Caption fade-up: starts at frame 18 (600ms in), holds until 6f from end
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

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d08' }}>
      {/* Source video — Veo 3.1 raw, trimmed via startFrom */}
      <AbsoluteFill style={{ opacity: videoOpacity }}>
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          // Mute Veo's auto-generated ambient audio
          muted
        />
      </AbsoluteFill>

      {/* Subtle warm overlay vignette for tonal consistency */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(15, 13, 8, 0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Caption — bottom-left, editorial */}
      <AbsoluteFill
        style={{
          opacity: captionOpacity,
          transform: `translateY(${captionTranslate}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 96,
            left: 96,
            maxWidth: 920,
          }}
        >
          {/* Rust hairline above caption — bumped for proportional scaling */}
          <div
            style={{
              width: 72,
              height: 3,
              backgroundColor: '#b8531d',
              marginBottom: 24,
              borderRadius: 1.5,
            }}
          />
          {/* Time + action stack — all sizes bumped ~28% for legibility
              at smaller hero playback frames */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#fafaf9',
                opacity: 0.85,
              }}
            >
              {captionTime}
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#fafaf9',
                letterSpacing: '-0.02em',
              }}
            >
              {captionAction}
            </div>
            {captionEmphasis && (
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: 72,
                  lineHeight: 1.05,
                  color: '#e8ff47',
                  marginTop: 8,
                }}
              >
                {captionEmphasis}
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
