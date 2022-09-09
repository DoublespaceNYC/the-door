import { css } from '@emotion/react'
import { Block } from 'datocms-structured-text-utils'
import { rgba } from 'polished'
import { HTMLAttributes } from 'react'

import ContentCarouselLinkThumbnail, {
  ICarouselLink,
} from './ContentCarouselLinkThumbnail'
import ScrollSlider from './ScrollSlider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  links: ICarouselLink[]
  color: string
  orientation: 'left' | 'right'
}

const ContentCarouselLinks = ({
  links,
  color,
  orientation,
  ...props
}: Props) => {
  const styles = {
    slider: css`
      grid-column: 1 / -1;
      z-index: 2;
    `,
    scrollArea: css`
      ${orientation === 'right' &&
      css`
        ${links.length === 2 &&
        css`
          justify-content: flex-end;
        `}
        ${links.length === 1 &&
        css`
          justify-content: center;
        `}
      `}
    `,
    sliderContent: css`
      display: grid;
      grid-gap: var(--gtr-m);
      grid-template-columns: repeat(${links.length}, auto);
      padding: 0 var(--margin) 1rem;
    `,
    thumbnail: css`
      width: calc(4 * var(--col-w) + 3 * var(--gtr-m));
    `,
  }
  return (
    <ScrollSlider
      css={styles.slider}
      scrollAreaCss={styles.scrollArea}
      contentCss={styles.sliderContent}
      navStyle="above"
      colors={{
        arrow: [color],
        arrowDisabled: '#00000015',
        link: [color, rgba(color, 0.75)],
      }}
      {...props}
    >
      {links.map((link, i) => (
        <ContentCarouselLinkThumbnail
          key={i}
          link={link}
          highlightColor={color}
          css={styles.thumbnail}
        />
      ))}
    </ScrollSlider>
  )
}

export default ContentCarouselLinks
