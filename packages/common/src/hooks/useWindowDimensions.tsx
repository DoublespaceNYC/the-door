import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

export const useWindowDimensions = () => {
  const isBrowser = typeof window !== `undefined`

  const [windowDimensions, setWindowDimensions] = useState<{
    width: undefined | number
    height: undefined | number
  }>({
    width: undefined,
    height: undefined,
  })

  const handleResize = useCallback(() => {
    isBrowser &&
      window.requestAnimationFrame(() => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      })
  }, [isBrowser])
  useEffect(handleResize, [handleResize])

  const handleThrottledResize = debounce(handleResize, 100)

  useEffect(() => {
    window.addEventListener('resize', handleThrottledResize, {
      passive: true,
    })
    return () => {
      window.removeEventListener('resize', handleThrottledResize)
    }
  }, [handleThrottledResize])

  return windowDimensions
}

export const useWindowWidth = () => {
  const { width } = useWindowDimensions()
  return width
}

export const useWindowHeight = () => {
  const { height } = useWindowDimensions()
  return height
}
