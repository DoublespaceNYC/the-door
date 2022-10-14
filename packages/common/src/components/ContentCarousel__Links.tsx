import { css } from '@emotion/react'
import { rgba } from 'polished'
import { HTMLAttributes } from 'react'

import { mq } from '../theme/mixins'
import ContentCarouselLinkThumbnail, {
  ICarouselLink,
} from './ContentCarousel__Links__Block'
import ScrollSlider from './ScrollSlider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  links: ICarouselLink[]
  color: string
  orientation: 'left' | 'right'
}

const LinksCarousel = ({
  links,
  color,
  orientation,
  ...props
}: Props): JSX.Element => {
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
        ${mq().ms} {
          justify-content: flex-start;
        }
      `}
    `,
    sliderContent: css`
      display: grid;
      grid-gap: var(--gtr-m);
      grid-template-columns: repeat(${links.length}, auto);
      padding: 0 var(--margin);
    `,
    thumbnail: css`
      width: calc(4 * var(--col-w) + 3 * var(--gtr-m));
      ${mq().m} {
        width: calc(6 * var(--col-w) + 5 * var(--gtr-m));
      }
      ${mq().s} {
        width: calc(9 * var(--col-w) + 8 * var(--gtr-m));
      }
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

export default LinksCarousel
