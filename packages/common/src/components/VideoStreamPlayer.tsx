import Hls from 'hls.js'
import { VideoHTMLAttributes } from 'react'
import { useEffect, useRef } from 'react'

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  thumbnail?: string
  playing?: boolean
}

const VideoStreamPlayer = ({
  src,
  thumbnail,
  playing,
  ...props
}: VideoProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let hls: Hls
    if (videoRef.current) {
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

  useEffect(() => {
    // Check to see if video is ready and playing before trying to pause
    const isPlaying =
      videoRef.current &&
      videoRef.current.currentTime > 0 &&
      !videoRef.current.paused
    switch (playing) {
      case true:
        if (hasPaused.current === true && !isPlaying) {
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
  }, [playing])

  return (
    <video
      ref={videoRef}
      poster={thumbnail}
      {...props}
    >
      {/* In the future, add subtitle support */}
      {/* <track default /> */}
    </video>
  )
}

export default VideoStreamPlayer
