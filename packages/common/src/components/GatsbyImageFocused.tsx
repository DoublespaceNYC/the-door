import { CSSInterpolation } from '@emotion/serialize'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { HTMLAttributes, useState } from 'react'

import { useElementRect } from '../hooks/useElementRect'

export interface IGatsbyImageFocused {
  isImage: true
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: IGatsbyImageData
  alt?: string
  focalPoint: {
    x: number
    y: number
  }
  aspectRatio: number
  originalAspectRatio?: number
  gatsbyImageCss?: CSSInterpolation
  loading?: 'lazy' | 'eager'
}

const GatsbyImageFocused = ({
  image,
  alt,
  focalPoint,
  aspectRatio,
  originalAspectRatio,
  gatsbyImageCss,
  loading,
  ...props
}: Props): JSX.Element => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const { width, height } = useElementRect(ref)
  const containerAR = (width && height && width / height) || 0

  const trueFP = () => {
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
      return {
        x: getFP(ratioX, focalPoint.x),
        y: getFP(ratioY, focalPoint.y),
      }
    } else {
      return focalPoint
    }
  }

  const objectPosition = () => {
    const ratioX = aspectRatio / containerAR
    const ratioY = containerAR / aspectRatio
    const getPosition = (ratio: number, fp: number) => {
      const position = (fp - 0.5) * (ratio / (ratio - 1)) + 0.5
      return ratio > 1 ? Math.max(Math.min(position, 1), 0) : 0.5
    }

    return {
      x: getPosition(ratioX, trueFP().x) * 100 + '%',
      y: getPosition(ratioY, trueFP().y) * 100 + '%',
    }
  }

  return (
    <div
      ref={node => setRef(node)}
      style={{
        objectPosition: `${objectPosition().x} ${objectPosition().y}`,
      }}
      {...props}
    >
      <GatsbyImage
        css={gatsbyImageCss}
        image={image}
        alt={alt || ''}
        style={{ objectPosition: 'inherit' }}
        objectPosition="inherit"
        loading={loading}
      />
    </div>
  )
}

export default GatsbyImageFocused
