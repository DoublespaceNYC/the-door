import { useLayoutEffect, useState } from 'react'

export const useElementRect = (element: HTMLElement | null) => {
  const [rect, setRect] = useState({
    width: 0,
    height: 0,
  })

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
          setRect({
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize,
          })
        } else if (entry.contentRect) {
          setRect({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          })
        }
      })
    })
    if (element) {
      resizeObserver.observe(element)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [element])

  return rect
}

export const useElementHeight = (element: HTMLElement | null) => {
  const { height } = useElementRect(element)
  return height
}

export const useElementWidth = (element: HTMLElement | null) => {
  const { width } = useElementRect(element)
  return width
}
