import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useElementRect } from '../hooks/useElementRect'

export interface IGatsbyImageFocused {
  gatsbyImageData: IGatsbyImageData
  sizes: {
    aspectRatio: number
  }
  focalPoint: {
    x: number
    y: number
  }
  alt?: string
}

type Props = {
  image: IGatsbyImageData
  alt?: string
  focalPoint: {
    x: number
    y: number
  }
  aspectRatio: number
  originalAspectRatio?: number
  gatsbyImageCss?: CSSInterpolation
  css?: CSSInterpolation
}
const GatsbyImageFocused = ({
  image,
  alt,
  focalPoint,
  aspectRatio,
  originalAspectRatio,
  gatsbyImageCss,
  ...props
}: Props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const rect = useElementRect(ref)
  const containerAR = rect.width / rect.height

  const trueFP = useMemo(() => {
    if (originalAspectRatio) {
      const ratioX = aspectRatio / originalAspectRatio
      const ratioY = originalAspectRatio / aspectRatio
      const getFP = (ratio: number, fp: number) => {
        return ratio < 1
          ? fp < ratio / 2
            ? (fp - 1 + ratio) / ratio
            : fp > ratio / 2
            ? fp / ratio
            : 0.5
          : fp
      }
      console.log(focalPoint.x < 0.5 && focalPoint.x / ratioX)
      return {
        x: getFP(ratioX, focalPoint.x),
        y: getFP(ratioY, focalPoint.y),
      }
    } else {
      return focalPoint
    }
  }, [originalAspectRatio, aspectRatio, focalPoint])

  const objectPosition = useMemo(() => {
    const ratioX = aspectRatio / containerAR
    const ratioY = containerAR / aspectRatio
    const getPosition = (ratio: number, fp: number) => {
      const position = (fp - 0.5) * (ratio / (ratio - 1)) + 0.5
      return ratio > 1 ? Math.max(Math.min(position, 1), 0) : 0.5
    }

    return {
      x: getPosition(ratioX, trueFP.x) * 100 + '%',
      y: getPosition(ratioY, trueFP.y) * 100 + '%',
    }
  }, [containerAR, aspectRatio])

  useEffect(() => {
    const img = ref?.querySelector('img[data-main-image]') as
      | HTMLImageElement
      | undefined
    if (img) {
      img.style.objectPosition = `${objectPosition.x} ${objectPosition.y}`
    }
  }, [objectPosition])

  return (
    <div ref={node => setRef(node)} {...props}>
      <GatsbyImage css={gatsbyImageCss} image={image} alt={alt || ''} />
    </div>
  )
}

export default GatsbyImageFocused
