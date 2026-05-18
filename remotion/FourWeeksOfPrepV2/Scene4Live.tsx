import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * WEEK 4 — Outreach goes live.
 *
 * Visual: MASSIVE SEND button center-stage. Clicks at frame 24, then
 * outreach radiates outward as flying message cards. Reply notifications
 * arrive from the edges with prominent REPLY badges.
 */
export const Scene4Live: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const CLICK_FRAME = 24

  const clickPulse = spring({
    frame: frame - CLICK_FRAME,
    fps,
    config: { damping: 10, mass: 0.4 },
    from: 0,
    to: 1,
  })
  const buttonScale = frame < CLICK_FRAME ? 1 : interpolate(clickPulse, [0, 0.3, 1], [1, 0.92, 1])

  const OUTGOING = [
    { angle: -90, delay: 28 },
    { angle: -45, delay: 32 },
    { angle: 0, delay: 30 },
    { angle: 45, delay: 34 },
    { angle: 90, delay: 28 },
    { angle: 135, delay: 33 },
    { angle: 180, delay: 31 },
    { angle: -135, delay: 35 },
  ]

  const INCOMING = [
    { fromAngle: -135, delay: 68, text: 'Yeah, open to chat —' },
    { fromAngle: 30, delay: 82, text: 'Tell me more —' },
    { fromAngle: 180, delay: 96, text: 'Tuesday 2pm works —' },
  ]

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
        paddingTop: 80,
      }}
    >
      {/* MASSIVE SEND button */}
      <div
        style={{
          position: 'relative',
          opacity: buttonOpacity,
          transform: `scale(${interpolate(buttonSpring, [0, 1], [0.7, buttonScale])})`,
        }}
      >
        {/* Outer ring shockwave */}
        {frame > CLICK_FRAME && (
          <>
            <div
              style={{
                position: 'absolute',
                inset: -30,
                borderRadius: '50%',
                border: '4px solid #e8ff47',
                opacity: interpolate(frame, [CLICK_FRAME, CLICK_FRAME + 32], [0.8, 0], {
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${interpolate(frame, [CLICK_FRAME, CLICK_FRAME + 32], [1, 2], {
                  extrapolateRight: 'clamp',
                })})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: -60,
                borderRadius: '50%',
                border: '3px solid #b8531d',
                opacity: interpolate(frame, [CLICK_FRAME + 6, CLICK_FRAME + 40], [0.6, 0], {
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${interpolate(frame, [CLICK_FRAME + 6, CLICK_FRAME + 40], [1, 2.2], {
                  extrapolateRight: 'clamp',
                })})`,
              }}
            />
          </>
        )}

        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: '50%',
            background:
              frame >= CLICK_FRAME
                ? 'linear-gradient(135deg, #e8ff47, #b8531d)'
                : 'linear-gradient(135deg, #b8531d, #7a2a0f)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            boxShadow:
              frame >= CLICK_FRAME
                ? '0 32px 96px -16px rgba(232, 255, 71, 0.6), 0 0 0 6px rgba(232, 255, 71, 0.15)'
                : '0 32px 96px -16px rgba(184, 83, 29, 0.6)',
          }}
        >
          {/* Paper plane — larger */}
          <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
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
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#0f0d08',
            }}
          >
            {frame >= CLICK_FRAME ? 'SENDING' : 'SEND'}
          </div>
        </div>
      </div>

      {/* Outgoing flying message cards — bigger */}
      {OUTGOING.map((msg, i) => {
        const t = interpolate(frame, [msg.delay, msg.delay + 50], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        if (t <= 0) return null

        const angleRad = (msg.angle * Math.PI) / 180
        const distance = 560 * t
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
                width: 180,
                height: 48,
                background: 'linear-gradient(90deg, rgba(184, 83, 29, 0.9), rgba(232, 255, 71, 0.9))',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 18,
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#0f0d08',
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 5,
                  background: 'rgba(15, 13, 8, 0.6)',
                  borderRadius: 2.5,
                  marginRight: 18,
                }}
              />
            </div>
          </div>
        )
      })}

      {/* Incoming reply notifications — bigger */}
      {INCOMING.map((reply, i) => {
        const t = interpolate(frame, [reply.delay, reply.delay + 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const stayUntil = reply.delay + 40
        const exitT = interpolate(frame, [stayUntil, stayUntil + 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        if (t <= 0) return null

        const angleRad = (reply.fromAngle * Math.PI) / 180
        const fromX = Math.cos(angleRad) * 700
        const fromY = Math.sin(angleRad) * 700
        const targetX = Math.cos(angleRad) * 380
        const targetY = Math.sin(angleRad) * 260
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
                padding: '16px 22px',
                borderRadius: 16,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 22,
                fontWeight: 500,
                boxShadow:
                  '0 16px 40px -12px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(232, 255, 71, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                whiteSpace: 'nowrap',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 12px rgba(16, 185, 129, 0.7)',
                }}
              />
              <span>{reply.text}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
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
