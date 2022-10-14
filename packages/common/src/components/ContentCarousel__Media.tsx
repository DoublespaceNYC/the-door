import { css } from '@emotion/react'
import { Record } from 'datocms-structured-text-utils'
import { rgba } from 'polished'
import { HTMLAttributes } from 'react'

import { widthInCols } from '../theme/mixins'
import MediaBlock, { IMediaBlock } from './MediaBlock'
import ScrollSlider from './ScrollSlider'

export interface IMediaCarousel extends Record {
  __typename: 'DatoCmsMediaCarousel'
  media: IMediaBlock[]
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: IMediaBlock[]
  color: string
  layout: 'Page' | 'Lightbox' | 'Calendar'
}

const MediaCarousel = ({
  data,
  color,
  layout = 'Page',
  ...props
}: Props): JSX.Element => {
  const styles = {
    slider: css`
      margin-top: 1rem;
      grid-column: 1 / -1;
      z-index: 2;
      --blockWidth: calc(${widthInCols(12)} - 2 * var(--margin));
      --gap: calc(var(--margin) + 0.5 * var(--gtr-m));
    `,
    sliderContent: css`
      display: grid;
      grid-template-columns: repeat(${data.length}, auto);
      grid-gap: var(--gap);
      padding: 0 calc(var(--margin) * 2);
    `,
    scrollArea: css`
      scroll-padding-left: calc(var(--margin) * 2);
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
        arrow: [color],
        arrowDisabled: '#00000015',
        link: [color, rgba(color, 0.75)],
      }}
      {...props}
    >
      {data.map((block, i) => (
        <MediaBlock
          layout={
            layout === 'Page' ? 'Page Carousel' : 'Lightbox Carousel'
          }
          data={block}
          highlightColor={color}
          css={styles.block}
          key={i}
        />
      ))}
    </ScrollSlider>
  )
}

export default MediaCarousel
