import { darken, getContrast, lighten } from 'polished'
import { useMemo } from 'react'

const useReadableColor = (
  color: string,
  contrastingColor: string,
  contrastRatio = 4.5
) => {
  const textColor = useMemo(() => {
    if (
      contrastingColor === '' ||
      contrastingColor === 'transparent' ||
      color === '' ||
      color === 'transparent'
    ) {
      return color
    } else {
      const darkText = () => {
        for (let i = 1; i < 100; i++) {
          if (
            getContrast(contrastingColor, darken(0.01 * i, color)) >=
            contrastRatio
          ) {
            return darken(0.01 * i, color)
          }
        }
        return color
      }
      const lightText = () => {
        for (let i = 0; i < 100; i++) {
          if (
            getContrast(contrastingColor, lighten(0.01 * i, color)) >=
            contrastRatio
          ) {
            return lighten(0.01 * i, color)
          }
        }
        return color
      }
      return getContrast(contrastingColor, lightText()) >
        getContrast(contrastingColor, darkText())
        ? lightText()
        : darkText()
    }
  }, [color, contrastingColor, contrastRatio])

  return textColor
}

export default useReadableColor
