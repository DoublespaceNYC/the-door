import Hls from 'hls.js'
import { HTMLAttributes } from 'react'
import { useEffect, useRef } from 'react'

interface VideoProps extends HTMLAttributes<HTMLVideoElement> {
  src: string
  thumbnail?: string
}

const VideoStreamPlayer = ({
  src,
  thumbnail,
  ...props
}: VideoProps) => {
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
        console.error(
          "This is a legacy browser that doesn't support MSE"
        )
      }
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [videoRef, src])

  return (
    <video ref={videoRef} poster={thumbnail} {...props}>
      {/* In the future, add subtitle support */}
      {/* <track default /> */}
    </video>
  )
}

export default VideoStreamPlayer
