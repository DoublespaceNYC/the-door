import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export const useElementRect = (element: HTMLElement | null) => {
  const [rect, setRect] = useState<{
    width: number | undefined
    height: number | undefined
  }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const resizeObserver = new ResizeObserver(
      debounce(entries => {
        entries.forEach((entry: ResizeObserverEntry) => {
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
      }, 100)
    )
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
