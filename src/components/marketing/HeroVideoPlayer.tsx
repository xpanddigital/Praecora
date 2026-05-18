'use client'

import { useRef, useState } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'

/**
 * Hero video player with click-to-play teaser pattern.
 *
 * Default state: a 3-second looping teaser MP4 plays muted with a
 * play button overlay — same UX as a high-quality animated GIF but
 * ~10× lighter than an equivalent GIF.
 *
 * On user click: the full Anatomy of a Deal narrative loads and plays
 * with sound enabled. A small mute toggle is available during playback.
 */
export function HeroVideoPlayer({
  teaserSrc,
  fullSrc,
  posterSrc,
  caption = 'Watch — Anatomy of a deal',
}: {
  teaserSrc: string
  fullSrc: string
  posterSrc?: string
  caption?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const fullVideoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    // Wait one tick so the full video renders, then play it
    requestAnimationFrame(() => {
      const v = fullVideoRef.current
      if (v) {
        v.muted = false
        v.play().catch(() => {
          // Browser blocked unmuted autoplay — fall back to muted playback
          v.muted = true
          setIsMuted(true)
          v.play().catch(() => {})
        })
      }
    })
  }

  const toggleMute = () => {
    const v = fullVideoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  return (
    <div className="marketing-mock-panel relative overflow-hidden">
      {/* Teaser — visible until user clicks play */}
      {!isPlaying && (
        <>
          <video
            className="block h-auto w-full"
            src={teaserSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          {/* Play overlay */}
          <button
            type="button"
            onClick={handlePlay}
            className="group absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/10"
            aria-label="Play Anatomy of a Deal — full 17-second narrative"
          >
            {/* Soft gradient at bottom for caption legibility */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent"
            />

            {/* Play button (glassy, sized for both desktop + mobile) */}
            <span
              aria-hidden="true"
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24"
            >
              {/* Subtle pulse ring */}
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40 opacity-40" />
              <Play
                className="relative ml-1 h-7 w-7 fill-[#0f0d08] text-[#0f0d08] md:h-9 md:w-9"
                strokeWidth={1.5}
              />
            </span>

            {/* Caption */}
            <span className="absolute bottom-6 left-6 flex items-center gap-2 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white drop-shadow-md md:bottom-8 md:left-8 md:text-sm">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#e8ff47]"
              />
              {caption}
              <span className="opacity-60">— 17 sec</span>
            </span>
          </button>
        </>
      )}

      {/* Full video — mounted only after click */}
      {isPlaying && (
        <>
          <video
            ref={fullVideoRef}
            className="block h-auto w-full"
            src={fullSrc}
            poster={posterSrc}
            controls
            playsInline
            preload="auto"
          />

          {/* Optional: a brand-styled mute toggle that floats over playback */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:opacity-100"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </>
      )}
    </div>
  )
}
