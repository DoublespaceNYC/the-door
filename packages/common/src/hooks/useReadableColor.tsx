import { darken, getContrast, lighten } from 'polished'
import { useMemo } from 'react'

const useReadableColor = (
  color: string,
  bgColor: string,
  contrastRatio = 4.5
) => {
  const textColor = useMemo(() => {
    if (
      bgColor === '' ||
      bgColor === 'transparent' ||
      color === '' ||
      color === 'transparent'
    ) {
      return color
    } else {
      const darkText = () => {
        for (let i = 1; i < 100; i++) {
          if (getContrast(bgColor, darken(0.01 * i, color)) >= contrastRatio) {
            return darken(0.01 * i, color)
          }
        }
        return color
      }
      const lightText = () => {
        for (let i = 0; i < 100; i++) {
          if (getContrast(bgColor, lighten(0.01 * i, color)) >= contrastRatio) {
            return lighten(0.01 * i, color)
          }
        }
        return color
      }
      return getContrast(bgColor, lightText()) >
        getContrast(bgColor, darkText())
        ? lightText()
        : darkText()
    }
  }, [color, bgColor, contrastRatio])

  return textColor
}

export default useReadableColor
