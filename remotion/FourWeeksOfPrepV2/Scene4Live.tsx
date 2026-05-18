import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 4 — Outreach goes live.
 *
 * Visual: A big SEND button center-stage. Gets clicked (scale pulse).
 * Messages radiate outward across the frame as small flying cards.
 * Reply notifications begin arriving from the edges.
 */
export const Scene4Live: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Click moment at frame 24
  const CLICK_FRAME = 24

  // Button click pulse
  const clickPulse = spring({
    frame: frame - CLICK_FRAME,
    fps,
    config: { damping: 10, mass: 0.4 },
    from: 0,
    to: 1,
  })
  const buttonScale = frame < CLICK_FRAME ? 1 : interpolate(clickPulse, [0, 0.3, 1], [1, 0.92, 1])

  // Outgoing messages — 8 small cards flying outward in a starburst pattern
  const OUTGOING = [
    { angle: -90, delay: 28 }, // up
    { angle: -45, delay: 32 },
    { angle: 0, delay: 30 }, // right
    { angle: 45, delay: 34 },
    { angle: 90, delay: 28 }, // down
    { angle: 135, delay: 33 },
    { angle: 180, delay: 31 }, // left
    { angle: -135, delay: 35 },
  ]

  // Incoming replies — 3 cards arriving from outside the frame
  const INCOMING = [
    { fromAngle: -135, delay: 70, text: 'Yeah, open to chat —', isReply: true },
    { fromAngle: 30, delay: 82, text: 'Tell me more —', isReply: true },
    { fromAngle: 180, delay: 94, text: 'Tuesday 2pm works —', isReply: true },
  ]

  // Big button entrance
  const buttonOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const buttonSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6 },
    from: 0,
    to: 1,
  })

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Big SEND button */}
      <div
        style={{
          position: 'relative',
          opacity: buttonOpacity,
          transform: `scale(${interpolate(buttonSpring, [0, 1], [0.7, buttonScale])})`,
        }}
      >
        {/* Outer ring pulse (after click) */}
        {frame > CLICK_FRAME && (
          <div
            style={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              border: '3px solid #e8ff47',
              opacity: interpolate(frame, [CLICK_FRAME, CLICK_FRAME + 30], [0.8, 0], {
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [CLICK_FRAME, CLICK_FRAME + 30], [1, 1.8], {
                extrapolateRight: 'clamp',
              })})`,
            }}
          />
        )}

        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            background:
              frame >= CLICK_FRAME
                ? 'linear-gradient(135deg, #e8ff47, #b8531d)'
                : 'linear-gradient(135deg, #b8531d, #7a2a0f)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow:
              frame >= CLICK_FRAME
                ? '0 24px 64px -16px rgba(232, 255, 71, 0.5), 0 0 0 4px rgba(232, 255, 71, 0.15)'
                : '0 24px 64px -16px rgba(184, 83, 29, 0.5)',
            transition: 'background 0.3s',
          }}
        >
          {/* Paper plane icon */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d="M54 10L10 32L26 38L40 24L34 42L54 10Z"
              fill="#0f0d08"
              stroke="#0f0d08"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#0f0d08',
            }}
          >
            {frame >= CLICK_FRAME ? 'SENDING' : 'SEND'}
          </div>
        </div>
      </div>

      {/* Outgoing flying message cards */}
      {OUTGOING.map((msg, i) => {
        const t = interpolate(frame, [msg.delay, msg.delay + 50], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        if (t <= 0) return null

        const angleRad = (msg.angle * Math.PI) / 180
        const distance = 400 * t
        const x = Math.cos(angleRad) * distance
        const y = Math.sin(angleRad) * distance
        const opacity = interpolate(t, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${msg.angle}deg) scale(${0.5 + 0.5 * t})`,
              opacity,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: 110,
                height: 32,
                background: 'linear-gradient(90deg, rgba(184, 83, 29, 0.85), rgba(232, 255, 71, 0.85))',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#0f0d08',
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 3,
                  background: 'rgba(15, 13, 8, 0.6)',
                  borderRadius: 1.5,
                  marginRight: 12,
                }}
              />
            </div>
          </div>
        )
      })}

      {/* Incoming reply notifications */}
      {INCOMING.map((reply, i) => {
        const t = interpolate(frame, [reply.delay, reply.delay + 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const stayUntil = reply.delay + 50
        const exitT = interpolate(frame, [stayUntil, stayUntil + 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        if (t <= 0) return null

        const angleRad = (reply.fromAngle * Math.PI) / 180
        const fromX = Math.cos(angleRad) * 600
        const fromY = Math.sin(angleRad) * 600
        const targetX = Math.cos(angleRad) * 280
        const targetY = Math.sin(angleRad) * 200
        const x = interpolate(t, [0, 1], [fromX, targetX])
        const y = interpolate(t, [0, 1], [fromY, targetY])
        const opacity = (1 - exitT) * interpolate(t, [0, 0.3], [0, 1])

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                background: '#fafaf9',
                color: '#0f0d08',
                padding: '10px 14px',
                borderRadius: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                fontWeight: 500,
                boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(232, 255, 71, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                }}
              />
              <span>{reply.text}</span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#10b981',
                  marginLeft: 4,
                }}
              >
                REPLY
              </span>
            </div>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
