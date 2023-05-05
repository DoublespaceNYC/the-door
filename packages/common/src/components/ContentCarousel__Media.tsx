import { css } from '@emotion/react'
import { useTheme } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { darken } from 'polished'
import { HTMLAttributes } from 'react'

import { widthInCols } from '../theme/mixins'
import ImageBlock, { IImageBlock } from './ImageBlock'
import { ITheme } from './Layout'
import ScrollSlider from './ScrollSlider'
import VideoBlock, { IVideoBlock } from './VideoBlock'

export interface IMediaCarousel extends Record {
  __typename: 'DatoCmsMediaCarousel'
  media: (IImageBlock | IVideoBlock)[]
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: (IImageBlock | IVideoBlock)[]
  highlightColor?: string
  layout: 'Page' | 'Lightbox' | 'Calendar'
}

const MediaCarousel = ({
  data,
  highlightColor,
  layout = 'Page',
  ...props
}: Props): JSX.Element => {
  const theme = useTheme() as ITheme
  const highlight = highlightColor || theme.secondary
  const styles = {
    slider: css`
      margin-top: 1rem;
      grid-column: 1 / -1;
      z-index: 2;
      --blockWidth: calc(${widthInCols(12)} - 2 * var(--margin));
      --gap: calc(var(--margin) + 0.5 * var(--gtr-m));
      ${layout === 'Calendar' &&
      css`
        --blockWidth: calc(${widthInCols(12)});
        --gap: var(--gtr-m);
      `}
    `,
    sliderContent: css`
      display: grid;
      grid-template-columns: repeat(${data.length}, auto);
      grid-gap: var(--gap);
      padding: 0 calc(var(--margin) * 2);
      ${layout === 'Calendar' &&
      css`
        padding: 0 calc(var(--margin));
      `}
    `,
    scrollArea: css`
      scroll-padding-left: calc(var(--margin) * 2);
      ${layout === 'Calendar' &&
      css`
        scroll-padding-left: calc(var(--margin));
      `}
    `,
    scrollWidth: css`
      width: calc(var(--blockWidth) + var(--gap));
    `,
    block: css`
      width: var(--blockWidth);
    `,
  }
  return (
    <ScrollSlider
      css={styles.slider}
      contentCss={styles.sliderContent}
      scrollAreaCss={styles.scrollArea}
      scrollWidthCss={styles.scrollWidth}
      navStyle="overlay"
      snap
      colors={{
        arrow: [highlight],
        arrowDisabled: '#00000015',
        link: [highlight, darken(0.1, highlight)],
      }}
      {...props}
    >
      {data.map((block, i) => {
        switch (block.__typename) {
          case 'DatoCmsImageBlock':
            return (
              <ImageBlock
                layout={layout}
                data={block}
                highlightColor={highlightColor}
                css={styles.block}
                key={i}
              />
            )
          case 'DatoCmsVideoBlock':
            return (
              <VideoBlock
                layout={layout}
                data={block}
                highlightColor={highlightColor}
                css={styles.block}
                key={i}
              />
            )
        }
      })}
    </ScrollSlider>
  )
}

export default MediaCarousel
