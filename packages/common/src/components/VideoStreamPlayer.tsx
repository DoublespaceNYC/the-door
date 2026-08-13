import Hls from 'hls.js'
import { VideoHTMLAttributes, useCallback, useState } from 'react'
import { useEffect, useRef } from 'react'

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src?: string
  thumbnail?: string
  playing?: boolean
  autoPlay?: boolean
  maxLoops?: number
}

export const VideoStreamPlayer = ({
  src,
  thumbnail,
  playing,
  autoPlay,
  loop,
  maxLoops = 3,
  ...props
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [iterations, setIterations] = useState(1)
  const hasReachedLimit = iterations > maxLoops
  useEffect(() => {
    let hls: Hls
    if (videoRef.current && src) {
      const video = videoRef.current

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Some browsers (safari and ie edge) support HLS natively
        video.src = src
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(video)
      } else {
        console.error("This is a legacy browser that doesn't support MSE")
      }
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [videoRef, src])

  // Prevents returning an empty promise
  const hasPaused = useRef(false)

  // To hide annoying play button when in lower power mode we have to
  // manually try to autoplay the video and catch the NotAllowedError
  const triggerAutoPlay = useCallback(() => {
    if (!hasReachedLimit && autoPlay) {
      videoRef.current
        ?.play()
        .then()
        .catch(err => {
          console.log(err)
        })
    }
  }, [autoPlay, hasReachedLimit])

  useEffect(() => {
    // Check to see if video is ready and playing before trying to pause
    const isPlaying =
      videoRef.current &&
      videoRef.current.currentTime > 0 &&
      !videoRef.current.paused
    switch (playing) {
      case true:
        if (hasPaused.current === true && !hasReachedLimit && !isPlaying) {
          videoRef.current?.play()
        }
        break
      case false:
        if (isPlaying) {
          videoRef.current?.pause()
          hasPaused.current = true
        }
        break
    }
  }, [playing, hasReachedLimit])

  const handleLoop = useCallback(() => {
    const currentVideo = videoRef.current
    if (!currentVideo) return
    if (loop && !hasReachedLimit) {
      currentVideo.currentTime = 0
      currentVideo.play()
      setIterations(prev => prev + 1)
    }
  }, [loop, hasReachedLimit])
  useEffect(() => {
    const currentVideo = videoRef.current
    currentVideo?.addEventListener('ended', handleLoop)
    return () => {
      currentVideo?.removeEventListener('ended', handleLoop)
    }
  }, [handleLoop])

  const autoPlayProps = autoPlay
    ? {
        autoPlay: true,
        muted: true,
        playsInline: true,
      }
    : {}

  return (
    <video
      ref={videoRef}
      poster={thumbnail}
      // iOS does not load data without autoplay, so preload metadata to fire event
      preload={autoPlay ? 'metadata' : undefined}
      onLoadedMetadata={triggerAutoPlay}
      {...autoPlayProps}
      {...props}
    >
      {/* In the future, add subtitle support */}
      {/* <track default /> */}
    </video>
  )
}
